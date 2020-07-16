import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from './layout/nav/nav.component';

@NgModule({
  declarations: [MainLayoutComponent, NavComponent],
  imports: [BrowserModule, RouterModule],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
