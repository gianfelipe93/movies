const _ = require('lodash')
const MovieService = require('../services/movie.service')

var MovieHandler = {
  getMovies(req, res) {
    return Promise.all([
        MovieService.getMoviesFromCinemaWorld(),
        MovieService.getMoviesFromFilmWorld()
      ])
      .then(handleMovieArrays)
      .then(allMovies => handleFilter(allMovies, req.params.term))
      .then(getMovieDetail)
      .then(sortArrayByTitle)
      .then(getCheapestMovies)
      .then(validImages)
      .then(movies => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).send(movies)
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send(err);
      })
  }
}

function validImages(movies) {
  if (movies) {
    const promises = movies.map(movie => {
      return MovieService.remoteImageExists(movie.Poster)
        .then(isValid => {
          if (isValid)
            return movie

          movie.Poster = "https://s3-ap-southeast-2.amazonaws.com/gianfelipe-images/no-image.png"
          return movie
        })
    })

    return Promise.all(promises).then(result => {
      return result
    })
  }

  return []
}

function getMovieDetail(movies) {
  const promises = movies.map(movie => MovieService.getMovieDetails(movie.ID)
    .then(detailedMovie => {
      if (detailedMovie)
        return JSON.parse(detailedMovie)

      return movie
    }))
  return Promise.all(promises).then(result => {
    return result
  })
}

function sortArrayByTitle(movies) {
  const sortedMovies = _.orderBy(movies, ['Title'])
  return sortedMovies
}

function handleMovieArrays(promisesResolved) {
  const cinemaMovies = promisesResolved[0].length > 0 ? JSON.parse(promisesResolved[0]).Movies : []
  const filmMovies = promisesResolved[1].length > 0 ? JSON.parse(promisesResolved[1]).Movies : []

  if (cinemaMovies.length > 0 && filmMovies.length == 0) {
    return cinemaMovies
  } else if (cinemaMovies.length == 0 && filmMovies.length > 0) {
    return filmMovies
  }

  return _.union(cinemaMovies, filmMovies)
}

function handleFilter(allMovies, term) {
  if (term) {
    const filteredMovies = allMovies.filter(movie => {
      return movie.Title.toLowerCase().includes(term.toLowerCase());
    })
    return filteredMovies;
  } else {
    return allMovies;
  }
}

function getCheapestMovies(movies) {
  if (movies.length == 0) {
    return undefined
  }

  var moviesFilm = []
  var moviesCinema = movies.filter(movie => {
    if (_.isEmpty(movie)) {
      return false;
    }

    if (!movie) {
      movie = JSON.parse(movie)
    }

    if (movie && movie.ID[0].toLowerCase() == 'c') {
      return true;
    } else {
      moviesFilm.push(movie)
      return false
    }
  })

  if (moviesCinema.length == 0) {
    return moviesFilm
  }

  if (moviesFilm.length == 0) {
    return moviesCinema
  }

  moviesCinema = _.orderBy(moviesCinema, ['Title'])
  moviesFilm = _.orderBy(moviesFilm, ['Title'])


  var cheapestMovies = []

  for (i = 0; i < moviesCinema.length; i++) {
    if (!moviesFilm[i]) {
      cheapestMovies.push(moviesCinema[i])
    } else if (Number(moviesCinema[i].Price) > Number(moviesFilm[i].Price)) {
      cheapestMovies.push(moviesFilm[i])
    } else {
      cheapestMovies.push(moviesCinema[i])
    }

  }
  return cheapestMovies;

}

module.exports = MovieHandler