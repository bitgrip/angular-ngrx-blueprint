import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { StartPageComponent } from './components/start-page/start-page.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      { path: '', component: StartPageComponent }
    ]),
  ],
  declarations: [StartPageComponent]
})
export class StartModule {
}
