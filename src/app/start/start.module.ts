import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StartComponent } from './components/start/start.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StartComponent }
    ]),
  ],
  declarations: [StartComponent]
})
export class StartModule {
}
