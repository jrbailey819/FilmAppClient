import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FilmListComponent } from './film-list/film-list.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { FilmService } from './shared/film.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule
    ],
    exports: [],
    declarations: [FilmListComponent, FilmFormComponent],
    providers: [FilmService, DatePipe]
})
export class FilmsModule {}