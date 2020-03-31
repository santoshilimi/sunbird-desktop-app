import { SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule,
  SuiProgressModule, SuiRatingModule, SuiCollapseModule } from 'ng2-semantic-ui';
import { SlickModule } from 'ngx-slick';
import { FormsModule } from '@angular/forms';
import {
   PageSectionComponent, NoResultComponent, CardComponent,
  CardCreationComponent, ShareLinkComponent, QrCodeModalComponent, RedirectComponent,
  CustomMultiSelectComponent, OfflineCardComponent, FullPageModalComponent, AppLoaderComponent
} from './components';
import {
  ConfigService, ResourceService, ToasterService, WindowScrollService, BrowserCacheTtlService,
  PaginationService, RouterNavigationService, NavigationHelperService, UtilService, ContentUtilsServiceService, ExternalUrlPreviewService,
  OfflineCardService
} from './services';
import { ContentDirectionDirective } from './directives';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DateFormatPipe, DateFilterXtimeAgoPipe, FilterPipe, InterpolatePipe } from './pipes';
import { CacheService } from 'ng2-cache-service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TelemetryModule } from '@sunbird/telemetry';
import { CdnprefixPipe } from './pipes/cdnprefix.pipe';
import { HighlightTextDirective } from './directives/highlight-text/highlight-text.directive';


@NgModule({
  imports: [
    CommonModule,
    SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule, SuiProgressModule,
    SuiRatingModule, SuiCollapseModule,
    SlickModule,
    FormsModule,
    TelemetryModule
  ],
  declarations: [DateFormatPipe, PageSectionComponent,
     NoResultComponent, DateFilterXtimeAgoPipe, CardComponent, CardCreationComponent, FilterPipe, InterpolatePipe,
    ShareLinkComponent,  QrCodeModalComponent, CdnprefixPipe, RedirectComponent, CustomMultiSelectComponent,
     ContentDirectionDirective, OfflineCardComponent,
     HighlightTextDirective, FullPageModalComponent, AppLoaderComponent],
  exports: [ DateFormatPipe, DateFilterXtimeAgoPipe,
    PageSectionComponent, NoResultComponent, CardComponent, OfflineCardComponent, CardCreationComponent, FilterPipe,
    ShareLinkComponent, QrCodeModalComponent, CdnprefixPipe, InterpolatePipe, RedirectComponent,
    CustomMultiSelectComponent, ContentDirectionDirective, HighlightTextDirective,
    FullPageModalComponent, AppLoaderComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ResourceService, ConfigService, ToasterService, PaginationService,
        RouterNavigationService, WindowScrollService, NavigationHelperService, CacheService, UtilService, ContentUtilsServiceService,
        DeviceDetectorModule, DeviceDetectorService, BrowserCacheTtlService, ExternalUrlPreviewService, OfflineCardService]
    };
  }
}
