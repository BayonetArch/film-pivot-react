import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"
import noPoster from "../assets/no-poster.svg"

function MovieCard({ movie }) {
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
      onClick={() => {
        setSearchQuery("")
        navigate(`/movie/${imdbID}`, { viewTransition: true })
      }}>
      <img
        className={styles["movie-poster"]}
        src={poster}
        alt={movie.Title}
        onError={(e) => (e.target.src = noPoster)}
      />
      <div className={styles["movie-info"]}>
        <h3 className={styles["movie-title"]}>{movie.Title}</h3>
        <div className={styles["movie-type"]}>{movie.Type}</div>
        <p className={styles["movie-year"]}>{movie.Year}</p>
      </div>
    </div>
  )
}
export default MovieCard
