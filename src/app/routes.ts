import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: './start/start.module#StartModule',
  },
  // { path: '**', component: NotFoundPageComponent },

];
