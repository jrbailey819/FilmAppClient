import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Film } from './film.model';

@Injectable()
export class FilmService {
    private baseUrl: string = 'https://pgzvl3abj4.execute-api.us-west-1.amazonaws.com/Prod';
    constructor(private http: Http) {
    }

    create(): Observable<Film> {
        let film: Film = new Film();
        return Observable.of(film);
    }

    getList(): Observable<Film[]> {
        let films$: Observable<Film[]> = this.http
            .get(`${this.baseUrl}`, { headers: this.getHeaders() })
            .map(mapFilms);
        return films$;
    }

    getById(id: string): Observable<Film> {
        let film$: Observable<Film> = this.http
            .get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
            .map(mapFilm);
        return film$;
    }

    add(film: Film): Observable<Response> {
        return this.http
            .post(`${this.baseUrl}`,
                JSON.stringify(film),
                { headers: this.getHeaders() });
    }

    update(film: Film): Observable<Response> {
        return this.http
            .put(`${this.baseUrl}/${film.id}`,
                JSON.stringify(film),
                { headers: this.getHeaders() });
    }

    delete(film: Film): Observable<Response> {
        return this.http
            .delete(`${this.baseUrl}/${film.id}`,
                { headers: this.getHeaders() });
    }

    private getHeaders(): Headers {
        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

function mapFilms(response: Response): Film[] {
    return response.json().map(toFilm).sort(filmCompare);
}

function mapFilm(response: Response): Film {
    return toFilm(response.json());
}

function toFilm(r: any): Film {
    let film: Film = <Film>({
        id: r.Id,
        title: r.Title,
        director: r.Director,
        rating: r.Rating,
        releaseDate: r.ReleaseDate,
        createdTimestamp: r.CreatedTimestamp
    });
    console.log('Parsed film:', film);
    return film;
}

function filmCompare(a: Film, b: Film): number {
    if((a.title+'').toLowerCase() > (b.title+'').toLowerCase()) {
        return 1;
    }

    if((a.title+'').toLowerCase() < (b.title+'').toLowerCase()) {
        return -1;
    }

    return 0;
}
