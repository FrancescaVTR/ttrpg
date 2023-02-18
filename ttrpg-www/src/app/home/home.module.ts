import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MaterialModule } from '../shared/modules/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
