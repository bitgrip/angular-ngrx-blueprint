import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component/app.component';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),

    CoreModule.forRoot(),
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
