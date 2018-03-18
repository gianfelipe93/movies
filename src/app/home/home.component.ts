import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../movie.service'
import { Movie } from '../movie/movie';
import {MovieListComponent} from '../movie-list/movie-list.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home';
  @Input() term = "";
  public loading = false;
  isFull = true;
  clicked = false;
  movies: Movie[];

  constructor(private movieService: MovieService, private movieListComponent: MovieListComponent) {

  }

  ngOnInit() {
    //this.search();
  }

  search(): void {
    this.getMovies(this.term) 
  }

  getMovies(term) : void {
    this.loading = true
    this.movieService.getMovies(term).subscribe(mvs => {
      this.movies = mvs
      this.loading = false
      this.clicked = true
    }) 
  }
}