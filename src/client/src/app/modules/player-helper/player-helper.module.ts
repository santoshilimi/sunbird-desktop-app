import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiModule } from 'ng2-semantic-ui/dist';
import { TelemetryModule } from '@sunbird/telemetry';
import {
  ContentRatingComponent, CommingSoonComponent
} from './components';
import { SharedModule } from '@sunbird/shared';
import { CoreModule } from '@sunbird/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SuiModule,
    TelemetryModule,
    SharedModule,
    CoreModule,
    FormsModule
  ],
  declarations: [ ContentRatingComponent,
    CommingSoonComponent],
  exports: [ ContentRatingComponent,
    CommingSoonComponent]
})
export class PlayerHelperModule { }
