const express = require('express')
var bodyParser = require("body-parser");
const MovieHandler = require("./handlers/movie.handler")

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('etag');


app.get('/', (req, res) => res.send('Hello World!'))
app.get('/movies', MovieHandler.getMovies)
app.get('/movies/:term', MovieHandler.getMovies)

app.listen(8080, () => console.log('API listening on port 8080!'))