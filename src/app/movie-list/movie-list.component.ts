import { Component, OnInit, Input } from '@angular/core';
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
  @Input() movies: Movie[];
  loading = false;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {

  }

  ngOnInit() {
    
  }
}
