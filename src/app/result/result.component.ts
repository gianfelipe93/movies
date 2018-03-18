import { Component } from '@angular/core';
import { MovieService } from '../movie.service'

@Component({
  selector: 'app-root',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  term = ""

  constructor(
    private movieService: MovieService
  ) {}

  search(): void {
    this.movieService.getMovies(this.term).subscribe()
  }
}
