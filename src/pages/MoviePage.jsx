import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./MoviePage.module.css"
import MovieResult from "../components/MovieResult"
import { fetchApi, OMDB_API_KEY } from "../utils/utils.js"
import noPoster from "../assets/no-poster.svg"

const default_details = {
  title: "Test title",
  poster: noPoster,
  plot: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi perferendis labore nulla! Minima impedit, recusandae est itaque tempore vel qui!",
  runtime: "100 min",
  rating: "PG-13",
  genres: ["Foo", "Bar", "Baz"],
  imdbRating: "10.0",
  writers: ["Adam Smith", "John Doe", "Jane Doe"],
  actors: ["Adam Smith", "John Doe"],
  awards: "67 wins and 90 nominations total",
  year: "2077",
  directors: ["WhatshisName", "WhatsherName"],
}

function MoviePage() {
  const { id } = useParams()
  const [searchQuery, _setSearchQuery] = useOutletContext()
  const [loading, setLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState(default_details)

  function handleData(data) {
    const title = data.Title
    const poster = data.Poster
    const plot = data.Plot
    const runTime = data.Runtime
    const genres = data.Genre
    const imdbRating = data.imdbRating
    const writers = data.Writer
    const actors = data.Actors
    const awards = data.Awards
    const year = data.Year
    const directors = data.Director
  }

  useEffect(() => {
    async function fetchMovie() {
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
  }, [])

  if (searchQuery.length > 2) {
    return <MovieResult />
  }

  if (loading && searchQuery.length > 2) {
    return (
      <div className="loader-wrapper">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles["movie-page"]}>
      <h1>{movieDetails.title}</h1>
      <div className={styles["movie-info-wrapper"]}>
        <img
          className={styles["movie-poster"]}
          src={movieDetails.poster}
          alt={movieDetails.title}
        />
        <div className={styles["movie-info"]}>
          <p className={styles["movie-plot"]}>{movieDetails.plot}</p>
          <p className={styles["movie-runtime"]}>{movieDetails.runtime}</p>
          <p className={styles["movie-rating"]}>{movieDetails.rating}</p>
          <p className={styles["movie-genres"]}>{movieDetails.genres}</p>
        </div>
      </div>
    </div>
  )
}
export default MoviePage
