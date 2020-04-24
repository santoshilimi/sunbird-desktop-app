import { OnboardingService } from './../../services';
import { combineLatest, Subject, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash-es';
import { takeUntil, map, debounceTime, delay, tap, catchError } from 'rxjs/operators';

import {
  ResourceService, ConfigService, ToasterService, INoResultMessage,
  ILoaderMessage, UtilService, NavigationHelperService
} from '@sunbird/shared';
import { Location } from '@angular/common';
import { SearchService, OrgDetailsService, FrameworkService } from '@sunbird/core';
import { ContentManagerService, ConnectionService } from '../../services';
import { IInteractEventEdata, IImpressionEventInput, TelemetryService } from '@sunbird/telemetry';
import { DialCodeService } from '../../../../../../src/app/modules/dial-code-search/services/dial-code/dial-code.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  showLoader = true;
  noResultMessage: INoResultMessage;
  filterType: string;
  queryParams: any;
  unsubscribe$ = new Subject<void>();
  initFilters = false;
  loaderMessage: ILoaderMessage;
  showFilters = false;
  hashTagId: string;
  dataDrivenFilters: any = {};
  facets = ['board', 'medium', 'gradeLevel', 'subject', 'contentType'];
  params: any = {};
  searchKey = '';

  downloadedContents: any[] = [];
  downloadedContentsCount = 0;
  onlineContents = [];
  onlineContentsCount = 0;

  isContentNotAvailable = false;
  readonly MAX_CARDS_TO_SHOW: number = 10;
  visits = [];
  isConnected = false;

  backButtonInteractEdata: IInteractEventEdata;
  filterByButtonInteractEdata: IInteractEventEdata;
  onlineLibraryLinkInteractEdata: IInteractEventEdata;
  myDownloadsLinkInteractEdata: IInteractEventEdata;
  viewMoreButtonInteractEdata: IInteractEventEdata;
  telemetryImpression: IImpressionEventInput;
  contentDownloadStatus = {};
  constructor(
    public contentManagerService: ContentManagerService,
    public router: Router,
    public searchService: SearchService,
    public activatedRoute: ActivatedRoute,
    public resourceService: ResourceService,
    public toasterService: ToasterService,
    public configService: ConfigService,
    public utilService: UtilService,
    public location: Location,
    public orgDetailsService: OrgDetailsService,
    public frameworkService: FrameworkService,
    public navigationHelperService: NavigationHelperService,
    public telemetryService: TelemetryService,
    private connectionService: ConnectionService,
    private dialCodeService: DialCodeService,
    private userService: OnboardingService
  ) {
    this.filterType = this.configService.appConfig.explore.filterType;

  }

  ngOnInit() {
    this.orgDetailsService.getOrgDetails(this.activatedRoute.snapshot.params.slug)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((orgDetails: any) => {
        this.hashTagId = orgDetails.hashTagId;
        this.initFilters = true;
      }, error => {
        this.router.navigate(['']);
      });

    this.connectionService.monitor()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isConnected => {
        this.isConnected = isConnected;
      });
      this.contentManagerService.contentDownloadStatus$.subscribe( contentDownloadStatus => {
        this.contentDownloadStatus = contentDownloadStatus;
      });
    this.setTelemetryData();
    this.utilService.emitHideHeaderTabsEvent(true);
    this.fetchContentOnParamChange();
    this.setNoResultMessage();
  }


  fetchContentOnParamChange() {
    combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
      .pipe(debounceTime(5),
        delay(10),
        map(result => ({ params: { dialCode: result[0].dialCode }, queryParams: result[1] })),
        takeUntil(this.unsubscribe$)
      ).subscribe(({ params, queryParams }) => {
        this.params = params;
        this.showLoader = true;
        this.queryParams = { ...queryParams };
        this.fetchContents();
        this.setNoResultMessage();

        if (this.params.dialCode) {
          this.searchKey = this.params.dialCode;
        } else {
          this.searchKey = queryParams.key || queryParams.gradeLevel || (queryParams.medium ?
            `${queryParams.medium}&nbsp;${this.resourceService.frmelmnts.lbl.profile.Medium}` : '');
        }
      });
  }

  fetchContents() {

    let onlineRequest: any = {};
    let offlineRequest: any = {};

    if (this.params.dialCode) {
      onlineRequest = this.constructDialCodeSearchRequest(true);
      offlineRequest = this.constructDialCodeSearchRequest(false);
    } else {
      onlineRequest = _.cloneDeep(this.constructSearchRequest());
      onlineRequest.params.online = true;

      offlineRequest = _.cloneDeep(this.constructSearchRequest());
      offlineRequest.params.online = false;
    }

    combineLatest(this.searchContent(onlineRequest, true), this.searchContent(offlineRequest, false))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        ([onlineRes, offlineRes]: any) => {
          this.showLoader = false;

          if (this.params.dialCode) {
            const { constantData, metaData, dynamicFields } = this.configService.appConfig.GetPage;
            const getDataForCard = (contents) => this.utilService.getDataForCard(contents, constantData, dynamicFields, metaData);

            if (onlineRes) {
              let contents = _.get(onlineRes, 'result.response.sections[0].contents');
              contents = getDataForCard(contents);
              _.forEach(contents, content => {
                if (this.contentDownloadStatus[content.identifier]) {
                    content['downloadStatus'] = this.contentDownloadStatus[content.identifier];
                }
              });
              this.onlineContents = this.utilService.addHoverData(contents, true);
              this.onlineContentsCount = this.onlineContents.length;
              }
            if (offlineRes) {
              let contents = _.get(offlineRes, 'result.response.sections[0].contents');
              contents = getDataForCard(contents);
              _.forEach(contents, content => {
                if (this.contentDownloadStatus[content.identifier]) {
                    content['downloadStatus'] = this.contentDownloadStatus[content.identifier];
                }
             });
              this.downloadedContents = this.utilService.addHoverData(contents, false);
              this.downloadedContentsCount = this.downloadedContents.length;
            }
          } else {
            const { constantData, metaData, dynamicFields } = this.configService.appConfig.LibrarySearch;
            const getDataForCard = (contents) => this.utilService.getDataForCard(contents, constantData, dynamicFields, metaData);

            this.downloadedContents = offlineRes.result.count ? _.chunk(getDataForCard(offlineRes.result.content),
              this.MAX_CARDS_TO_SHOW)[0] : [];
            this.downloadedContentsCount = offlineRes.result.count;
            _.forEach(this.downloadedContents, content => {
              if (this.contentDownloadStatus[content.identifier]) {
                  content['downloadStatus'] = this.contentDownloadStatus[content.identifier];
              }
           });
            this.downloadedContents = this.utilService.addHoverData(this.downloadedContents, false);
            this.downloadedContents = _.uniqBy(this.downloadedContents, 'identifier');
            if (onlineRes) {
              this.onlineContents = onlineRes.result.count ?
                _.chunk(getDataForCard(onlineRes.result.content), this.MAX_CARDS_TO_SHOW)[0] : [];
              this.onlineContentsCount = onlineRes.result.count;
              _.forEach(this.onlineContentsCount, content => {
                if (this.contentDownloadStatus[content.identifier]) {
                    content['downloadStatus'] = this.contentDownloadStatus[content.identifier];
                }
             });
              this.onlineContentsCount = onlineRes.result.count;
              this.onlineContents = this.utilService.addHoverData(this.onlineContents, true);
            }

            this.isContentNotAvailable = Boolean(!this.downloadedContents.length && !this.onlineContents.length);
          }
        }, err => {
          this.showLoader = false;
          this.onlineContents = [];
          this.downloadedContents = [];
          this.onlineContentsCount = 0;
          this.downloadedContentsCount = 0;
          this.toasterService.error(this.resourceService.messages.fmsg.m0051);
        });
  }

  constructSearchRequest(isFacetsRequired?) {
    let filters = _.pickBy(this.dataDrivenFilters, (value: Array<string> | string) => value && value.length);
    filters = _.omit(filters, ['key', 'sort_by', 'sortType', 'appliedFilters']);
    const softConstraintData: any = {
      filters: {
        channel: this.hashTagId
      },
      softConstraints: _.get(this.activatedRoute.snapshot, 'data.softConstraints'),
      mode: 'soft'
    };
    if (this.dataDrivenFilters.board) {
      softConstraintData.board = this.dataDrivenFilters.board;
    }
    const manipulatedData = this.utilService.manipulateSoftConstraint(_.get(this.dataDrivenFilters, 'appliedFilters'),
      softConstraintData);
    const option: any = {
      filters: _.get(this.dataDrivenFilters, 'appliedFilters') ? filters : manipulatedData.filters,
      mode: _.get(manipulatedData, 'mode'),
      params: _.cloneDeep(this.configService.appConfig.ExplorePage.contentApiQueryParams),
      query: this.queryParams.key,
    };

    option.filters['contentType'] = filters.contentType || this.configService.appConfig.CommonSearch.contentType;
    if (manipulatedData.filters) {
      option['softConstraints'] = _.get(manipulatedData, 'softConstraints');
    }

    if (isFacetsRequired) {
      option['facets'] = this.facets;
     }

    this.frameworkService.channelData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((channelData) => {
        if (!channelData.err) {
          option.params.framework = _.get(channelData, 'channelData.defaultFramework');
        }
      });

    return option;
  }

  constructDialCodeSearchRequest(isOnline) {
    const option: any = {
      filters: {
        dialcodes: this.params.dialCode
      },
      params: _.cloneDeep(this.configService.appConfig.ExplorePage.contentApiQueryParams),
    };
    option.params.online = isOnline;

    return option;
  }

  addMode(option) {
    const contentType = _.get(option, 'filters.contentType');
      option.filters = _.omit(this.userService.userSelectedFilters, ['gradeLevel', 'medium']);
      option.filters.contentType = contentType;
    return option;
  }

  searchContent(request, isOnlineRequest: boolean) {

    if (this.params.dialCode) {
      return this.searchDialContents(request, isOnlineRequest);
    } else {
      if (!this.isConnected && isOnlineRequest) {
        return of(undefined);
      }
      request = !this.params.dialCode ? this.addMode(request) : request;
      return this.searchService.contentSearch(request, !Boolean(this.params.dialCode)).pipe(
        tap(data => {
        }), catchError(error => {
          return of(undefined);
        }));
    }

  }

  searchDialContents(request, online: boolean) {
    if (!this.isConnected && online) {
      return of(undefined);
    }
    const userData =  _.pick(this.userService.userSelectedFilters, 'board');
    return this.searchService.dialContentSearch(request, userData).pipe(
      tap(data => {
      }), catchError(error => {
        return of(undefined);
      }));

  }

  goBack() {
    this.navigationHelperService.goBack();
  }

  gotoViewMore(isOnlineContents) {
    const queryParams = {
      key: this.queryParams.key,
      apiQuery: JSON.stringify(this.constructSearchRequest(true))
    };

    if (isOnlineContents) {
      this.router.navigate(['browse/view-more', 1], { queryParams });
    } else {
      this.router.navigate(['view-more'], { queryParams });
    }
  }

  setNoResultMessage() {
    this.noResultMessage = {
      messageText: 'messages.stmsg.m0006'
    };
  }

  clearSearchQuery() {
    this.utilService.clearSearchQuery();
  }

  setTelemetryData() {
    this.visits = [];
    this.telemetryImpression = {
      context: {
        env: this.activatedRoute.snapshot.data.telemetry.env
      },
      edata: {
        type: this.activatedRoute.snapshot.data.telemetry.type,
        pageid: this.activatedRoute.snapshot.data.telemetry.pageid,
        uri: this.router.url,
        subtype: this.activatedRoute.snapshot.data.telemetry.subtype,
        duration: this.navigationHelperService.getPageLoadTime()
      }
    };

    this.backButtonInteractEdata = {
      id: 'back-button',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };

    this.filterByButtonInteractEdata = {
      id: 'filter-by-button',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };

    this.myDownloadsLinkInteractEdata = {
      id: 'my-downloads-link',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };

    this.onlineLibraryLinkInteractEdata = {
      id: 'online-library-link',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };

    this.viewMoreButtonInteractEdata = {
      id: 'view-more-button',
      type: 'click',
      pageid: this.activatedRoute.snapshot.data.telemetry.pageid
    };
  }

  prepareVisits(event) {
    this.visits = [...this.visits, ...event.visits];
    this.telemetryImpression.edata.visits = this.visits;
    this.telemetryImpression.edata.subtype = 'pageexit';
    this.telemetryImpression = Object.assign({}, this.telemetryImpression);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.utilService.emitHideHeaderTabsEvent(false);
  }
}
