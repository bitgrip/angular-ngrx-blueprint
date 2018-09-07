import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';


export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: './start/start.module#StartModule',
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoModule',
  },
  { path: '**', component: NotFoundPageComponent },
];
