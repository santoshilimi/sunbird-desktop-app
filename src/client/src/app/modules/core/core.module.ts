import { PermissionDirective, BodyScrollDirective, StickyHeaderDirective } from './directives';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule,
  SuiProgressModule, SuiRatingModule, SuiCollapseModule
} from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { SharedModule } from '@sunbird/shared';
import { AvatarModule } from 'ngx-avatar';
import {
  MainHeaderComponent, MainMenuComponent, SearchComponent,
  DataDrivenFilterComponent, ErrorPageComponent, SortByComponent,
  LanguageDropdownComponent, ProminentFilterComponent, TopicPickerComponent, MainFooterComponent
} from './components';
import { AuthGuard } from './guard/auth-gard.service';
import { CacheService } from 'ng2-cache-service';
import { WebExtensionModule } from '@project-sunbird/web-extensions';
import { TelemetryModule } from '@sunbird/telemetry';
@NgModule({
  imports: [
    CommonModule,
    SuiSelectModule, SuiModalModule, SuiAccordionModule, SuiPopupModule, SuiDropdownModule, SuiProgressModule,
    SuiRatingModule, SuiCollapseModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    WebExtensionModule,
    TelemetryModule,
    AvatarModule
  ],
  declarations: [MainHeaderComponent, MainMenuComponent, SearchComponent, PermissionDirective,
    BodyScrollDirective, DataDrivenFilterComponent, SortByComponent,
    ErrorPageComponent, LanguageDropdownComponent,
    ProminentFilterComponent, TopicPickerComponent, StickyHeaderDirective, MainFooterComponent],
  exports: [MainHeaderComponent, PermissionDirective, BodyScrollDirective,
    DataDrivenFilterComponent, SortByComponent,
    TelemetryModule, LanguageDropdownComponent, ProminentFilterComponent, TopicPickerComponent, MainFooterComponent],
  providers: [CacheService, AuthGuard]
})
export class CoreModule {
}
