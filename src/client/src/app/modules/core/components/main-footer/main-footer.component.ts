import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './main-footer.component.html'
})
export class MainFooterComponent {

  hideDownloadManager: boolean;
  constructor( public router: Router, public activatedRoute: ActivatedRoute) {}

  checkRouterPath() {
    this.hideDownloadManager = this.router.url.includes('/profile') || this.router.url.includes('/play/collection') ||
      this.router.url.includes('/play/content');
  }

}
