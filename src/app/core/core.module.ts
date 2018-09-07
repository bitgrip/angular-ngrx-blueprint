import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LayoutComponent } from './components/layout/layout.component';


export const COMPONENTS = [
  NotFoundPageComponent,
  LayoutComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
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
