const got = require('got');

const WEBJET_API_URL = 'http://webjetapitest.azurewebsites.net/api'
const CINEMAWORLD = 'cinemaworld'
const FILMWORLD = 'filmworld'
const ID_INITIAL_CINEMAWORLD = "cw"
const ID_INITIAL_FILMWORLD = "fw"
const timeout = 5000;
const options = {
  headers: {
    'content-type': 'application/json',
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    'x-access-token': process.env.WEB_JET_TOKEN
  },
  timeout
}


var MovieService = {
  getMoviesFromCinemaWorld() {
    const FINAL_URL = `${WEBJET_API_URL}/${CINEMAWORLD}/movies`

    return got.get(FINAL_URL, options)
      .then(result => {
        return result.body
      })
      .catch((err) => {
        return []
      })
  },
  getMoviesFromFilmWorld() {
    const FINAL_URL = `${WEBJET_API_URL}/${FILMWORLD}/movies`

    return got.get(FINAL_URL, options)
      .then(result => {
        return result.body
      })
      .catch(() => {
        return []
      })
  },
  getMovieDetails(id) {
    var FINAL_URL = ""
    if (id.includes(ID_INITIAL_CINEMAWORLD)) {
      FINAL_URL = `${WEBJET_API_URL}/${CINEMAWORLD}/movie/${id}`
    } else {
      FINAL_URL = `${WEBJET_API_URL}/${FILMWORLD}/movie/${id}`
    }

    return got.get(FINAL_URL, options)
      .then(result => {
        return result.body
      })
      .catch(() => {
        return
      })
  },

  remoteImageExists(url) {
    return got.get(url, options)
      .then(result => {
        return true
      })
      .catch((err) => {
        return false
      })
  }
}



module.exports = MovieService
