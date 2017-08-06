import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Film } from './../shared/film.model';
import { FilmService } from './../shared/film.service';

@Component({
    selector: 'film-form',
    templateUrl: './film-form.component.html'
})
export class FilmFormComponent implements OnInit {
    film: Film;
    releaseDateStr: string;
    submitted: boolean = false;
    isNew: boolean = true;
    loading: boolean = true;
    busy: boolean = false;
    errorMessage: string;
    idKey: string = 'id';

    constructor(
        private filmService: FilmService,
        private route: ActivatedRoute,
        private router: Router,
        private datePipe: DatePipe) { }
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                let film: Film;
                if (params[this.idKey]) {
                    this.isNew = false;
                    return this.filmService.getById(params[this.idKey]);
                } else {
                    return this.filmService.create();
                }
            })
            .subscribe(film => {
                    this.film = film;
                    this.releaseDateStr = (film.releaseDate) ? this.datePipe.transform(film.releaseDate, 'MM/dd/yyyy') : '';
                    this.loading = false;
                },
                e => this.errorMessage = e,
                () => this.loading = false
            );
    }

    submitForm(filmForm: NgForm): void {
        if (filmForm.valid) {
            this.busy = true;
            this.film.releaseDate = new Date(this.releaseDateStr);
            let action$: Observable<Response>;
            if (this.isNew) {
                action$ = this.filmService.add(this.film);
            } else {
                action$ = this.filmService.update(this.film);
            }
            action$.subscribe(
                r => this.router.navigate(['../../films']),
                e => this.errorMessage = e,
                () => this.busy = false
            );
        } else {
            this.submitted = true;
        }
    }

    delete(): void {
        this.busy = true;
        this.filmService.delete(this.film)
            .subscribe(
                r => this.router.navigate(['../../films']),
                e => this.errorMessage = e,
                () => this.busy = false);
    }
}