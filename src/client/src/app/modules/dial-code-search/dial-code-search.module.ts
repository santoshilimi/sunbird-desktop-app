import { DialCodeSearchRoutingModule } from './dial-code-search.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@sunbird/core';
import { SharedModule } from '@sunbird/shared';
import { NgInviewModule } from 'angular-inport';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    NgInviewModule,
    DialCodeSearchRoutingModule,
    FormsModule
  ]
})
export class DialCodeSearchModule { }
