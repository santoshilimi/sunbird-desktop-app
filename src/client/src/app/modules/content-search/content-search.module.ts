import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultComponent } from './components';
import { SharedModule } from '@sunbird/shared';
import { TelemetryModule } from '@sunbird/telemetry';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonConsumptionModule } from '@project-sunbird/common-consumption';

@NgModule({
  declarations: [NoResultComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TelemetryModule,
    CommonModule,
    CommonConsumptionModule,
    SharedModule
  ],
  exports: [NoResultComponent]
})
export class ContentSearchModule { }
