import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StartPageComponent } from './components/start-page/start-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StartPageComponent }
    ]),
  ],
  declarations: [StartPageComponent]
})
export class StartModule {
}
