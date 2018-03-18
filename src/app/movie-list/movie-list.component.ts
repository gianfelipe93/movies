import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie/movie';
import { MOVIES_ARRAY } from '../mock-movies'
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service'



@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  loading = false;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {

  }

  ngOnInit() {
    var term = ""
    this.loading = true
    this.route.params.subscribe(params => params.term ? term = params.term : term = "")

    this.movieService.getMovies(term).subscribe(mvs => {
      this.movies = mvs
      this.loading = false
    })
  }
}
