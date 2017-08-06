import { Routes } from '@angular/router';

import { FilmListComponent } from './films/film-list/film-list.component';
import { FilmFormComponent } from './films/film-form/film-form.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: 'films', component: FilmListComponent },
  { path: 'films/new', component: FilmFormComponent },
  { path: 'films/:id', component: FilmFormComponent }
];

