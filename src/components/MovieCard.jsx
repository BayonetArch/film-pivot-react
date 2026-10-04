import { useOutletContext, useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"
import noPoster from "../assets/no-poster.svg"

function MovieCard({ movie, index }) {
  const imdbID = movie.imdbID
  const navigate = useNavigate()
  const [_searchQuery, setSearchQuery] = useOutletContext()

  const poster =
    movie.Poster === "N/A" || movie.Poster.length === 0
      ? noPoster
      : movie.Poster

  return (
    <div
      className={styles["movie-card"]}
      style={{ "--i": index }}
      onClick={() => {
        setSearchQuery("")
        navigate(`/movie/${imdbID}`, { viewTransition: true })
      }}>
      <img
        className={styles["movie-poster"]}
        src={poster}
        alt={movie.Title}
        loading="lazy"
        onError={(e) => (e.target.src = noPoster)}
      />
      <div className={styles["movie-info"]}>
        <h3 className={styles["movie-title"]}>{movie.Title}</h3>
        <div className={styles["movie-meta"]}>
          <span className={styles["movie-type"]}>{movie.Type}</span>
          <span className={styles["movie-year"]}>{movie.Year}</span>
        </div>
      </div>
    </div>
  )
}
export default MovieCard