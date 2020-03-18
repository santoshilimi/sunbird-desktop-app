import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from '@sunbird/shared';
import { Component, HostListener, AfterViewInit, OnInit } from '@angular/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-offline-help-center',
  templateUrl: './offline-help-center.component.html',
  styleUrls: ['./offline-help-center.component.scss']
})

export class OfflineHelpCenterComponent implements AfterViewInit, OnInit {
  images: any;
  activeTab: any;
  instance: string;

  constructor(public resourceService: ResourceService,
    public activatedRoute: ActivatedRoute,
    public router: Router) { }
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnInit() {
    this.instance = _.upperCase(this.resourceService.instance);
    /* download animation */
    const downloadButton = document.querySelector('.sb-btn-download');
    if (downloadButton) {
      downloadButton.addEventListener('click', (event) => {
        event.preventDefault();

        /* Start loading process. */
        downloadButton.classList.add('loading');

        /* Set delay before switching from loading to success. */
        window.setTimeout(() => {
          downloadButton.classList.remove('loading');
          downloadButton.classList.add('success');
        }, 3000);

        /* Reset animation. */
        window.setTimeout(() => {
          downloadButton.classList.remove('success');
        }, 8000);
      });
    }
    /* download animation ends */
    this.activeTab = 'browse';
  }
  tabClicked(tab) {
    this.activeTab = tab;
    console.log(this.activeTab);
  }

  ngAfterViewInit() {
    // mediumZoom('[data-zoomable]');
  }
  setTelemetryImpression() {
    return {
      context: { env: _.get(this.activatedRoute.snapshot.data.telemetry, 'env') || 'help' },
      edata: {
        type: 'view',
        pageid: 'help',
        uri: this.router.url
      }
    };
  }
}
