import { BodyScrollDirective, StickyHeaderDirective } from './directives';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SuiSelectModule
} from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { SharedModule } from '@sunbird/shared';
import { AvatarModule } from 'ngx-avatar';
import { ErrorPageComponent,
  LanguageDropdownComponent, MainFooterComponent
} from './components';
import { CacheService } from 'ng2-cache-service';
import { WebExtensionModule } from '@project-sunbird/web-extensions';
import { TelemetryModule } from '@sunbird/telemetry';
@NgModule({
  imports: [
    CommonModule,
    SuiSelectModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    WebExtensionModule,
    TelemetryModule,
    AvatarModule
  ],
  declarations: [
    BodyScrollDirective,
    ErrorPageComponent, LanguageDropdownComponent, StickyHeaderDirective, MainFooterComponent],
  exports: [ BodyScrollDirective,
    TelemetryModule, LanguageDropdownComponent, MainFooterComponent],
  providers: [CacheService]
})
export class CoreModule {
}
