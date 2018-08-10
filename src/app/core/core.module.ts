import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LayoutComponent } from './components/layout/layout.component';


export const COMPONENTS = [
  NotFoundPageComponent,
  LayoutComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
