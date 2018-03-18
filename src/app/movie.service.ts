import { Injectable } from '@angular/core';
import { Movie } from './movie/movie';
import { MOVIES_ARRAY } from './mock-movies';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment'

const options = {
  header: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  }
}

@Injectable()
export class MovieService {
  private apiUrl = environment.apiUrl;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient) { }

  getMovies(term): Observable<Movie[]> {
    const FINAL_URL = `${this.apiUrl}/${term}`
    return this.http.get<Movie[]>(FINAL_URL).pipe(
      catchError(this.handleError('getMovies', []))
    );

  }
}
