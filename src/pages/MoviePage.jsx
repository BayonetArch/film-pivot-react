import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./MoviePage.module.css"
import MovieResult from "../components/MovieResult"
import { fetchApi, OMDB_API_KEY } from "../utils/utils.js"
import noPoster from "../assets/no-poster.svg"
import star from "../assets/star.svg"

const defaultDetails = {
  title: "Test title",
  poster: noPoster,
  plot: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi perferendis labore nulla! Minima impedit, recusandae est itaque tempore vel qui!",
  runtime: "100 min",
  rating: "PG-13",
  genres: ["Adventure", "Animation", "Comedy"],
  imdbRating: "9/10",
  writers: ["Adam Smith", "John Doe", "Jane Doe"],
  actors: ["Adam Smith", "John Doe"],
  awards: "67 wins and 90 nominations total",
  year: "2077",
  directors: ["WhatshisName", "WhatsherName"],
}

function MovieMeta({ title, imdbRating, year, rating, runtime }) {
  return (
    <div className={styles["movie-meta"]}>
      <div className={styles["movie-title"]}>{title}</div>
      <div className={styles["imdb-rating"]}>
        <div className={styles["label"]}>IMDB RATING</div>
        <div className={styles["number-wrapper"]}>
          <img className={styles["star"]} src={star} />
          <span className={styles["number"]}>{imdbRating}</span>
        </div>
      </div>
      <div className={styles["meta-row"]}>
        <div className={styles["movie-year"]}>{year}</div>
        <div className={styles["movie-rated"]}>{rating}</div>
        <div className={styles["movie-runtime"]}>{runtime}</div>
      </div>
    </div>
  )
}

function MovieGraphics({ poster, title = "unknown film" }) {
  return (
    <div className={styles["movie-graphics"]}>
      <img src={poster} alt={title} className={styles["movie-poster"]} />
    </div>
  )
}

function MovieGenres({ genres }) {
  return (
    <div className={styles["movie-genres"]}>
      {genres.map((genre) => (
        <div
          className={styles["movie-genre"]}
          key={genre}
          onClick={() => {
            wikiSearch(`${genre}_film`)
          }}>
          {genre}
        </div>
      ))}
    </div>
  )
}

function MoviePlot({ plot }) {
  return <div className={styles["movie-plot"]}>{plot}</div>
}

function MovieCast({ directors, writers, actors }) {
  return (
    <div className={styles["movie-cast"]}>
      <div className={styles["movie-directors"]}>
        <span className={styles["label"]}>Director</span>{" "}
        {directors.map((director) => (
          <span
            className={styles["movie-director"]}
            key={director}
            onClick={() => {
              wikiSearch(`${director}`)
            }}>
            {director}
          </span>
        ))}
      </div>
      <hr className={styles["divider"]} />
      <div className={styles["movie-writers"]}>
        <span className={styles["label"]}>Writer</span>
        {writers.map((writer) => (
          <span
            className={styles["movie-writer"]}
            key={writer}
            onClick={() => wikiSearch(writer)}>
            {writer}
          </span>
        ))}
      </div>

      <hr className={styles["divider"]} />
      <div className={styles["movie-stars"]}>
        <span className={styles["label"]}>Stars</span>
        {actors.map((actor) => (
          <span
            className={styles["movie-star"]}
            key={actor}
            onClick={() => wikiSearch(actor)}>
            {actor}
          </span>
        ))}
      </div>
      <hr className={styles["divider"]} />
    </div>
  )
}

function MovieAwards({ awards }) {
  return (
    <div className={styles["movie-awards"]}>
      <span className={styles["label"]}>Awards</span> {awards}
    </div>
  )
}

function toSearchableName(name = "Foo Bar") {
  return name.split(" ").join("_")
}

function wikiSearch(name = "Hello World") {
  if (name.includes("Sci")) name = "Science_fiction_film"

  const win = window.open(
    `https://en.wikipedia.org/wiki/${toSearchableName(name)}`,
    "_blank",
  )
  if (!win) alert("popup blocked. Please allow popups for this site.")
}

function MoviePage() {
  const { id } = useParams()
  const [searchQuery, _setSearchQuery] = useOutletContext()
  const [loading, setLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState(defaultDetails)

  function handleData(data) {
    const shortData = {
      title: data.Title,
      poster: data.Poster,
      plot: data.Plot,
      runtime: data.Runtime,
      rating: data.Rated,
      genres: data.Genre.split(", "),
      imdbRating: `${data.imdbRating}/10`,
      writers: data.Writer.split(", "),
      actors: data.Actors.split(", "),
      awards: data.Awards,
      year: data.Year,
      directors: data.Director.split(", "),
    }

    setMovieDetails(shortData)
  }

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true)
      const queryUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`

      try {
        const data = await fetchApi(queryUrl)
        if (data.Response === "False") {
          throw new Error(data.Error)
        }
        handleData(data)
      } catch (err) {
        console.log(err)
      }

      setLoading(false)
    }
    fetchMovie()
  }, [id])

  if (searchQuery.length > 2) {
    return <MovieResult />
  }

  if (loading) {
    return (
      <div className="loader-wrapper page">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles["movie-page-wrapper"]}>
      <div className={styles["movie-page"]}>
        <MovieMeta
          title={movieDetails.title}
          imdbRating={movieDetails.imdbRating}
          year={movieDetails.year}
          rating={movieDetails.rating}
          runtime={movieDetails.runtime}
        />
        <MovieGraphics
          poster={movieDetails.poster}
          title={movieDetails.title}
        />
        <MovieGenres genres={movieDetails.genres} />
        <MoviePlot plot={movieDetails.plot} />
        <hr className={styles["divider"]} />
        <MovieCast
          directors={movieDetails.directors}
          writers={movieDetails.writers}
          actors={movieDetails.actors}
        />
        <MovieAwards awards={movieDetails.awards} />
      </div>
    </div>
  )
}
export default MoviePage

//TODO: fix the bad animation when changing to movie page from movie page
