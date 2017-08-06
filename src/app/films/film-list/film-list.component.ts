import { Component, OnInit } from '@angular/core';

import { Film } from './../shared/film.model';
import { FilmService } from './../shared/film.service';

@Component({
    selector: 'film-list',
    templateUrl: './film-list.component.html'
})
export class FilmListComponent implements OnInit {
    films: Film[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;
    busy: boolean = false;

    constructor(private filmService: FilmService) {}
    ngOnInit(): void {
        this.filmService
            .getList()
            .subscribe(
                f => this.films = f,
                e => this.errorMessage  = e,
                () => this.isLoading = false
            );
    }

    saveRating(film: Film): void {
        this.busy = true;
        this.filmService.update(film)
            .subscribe(
                () => {},
                e => this.errorMessage = e,
                () => this.busy = false
            );
    }

}