import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styles from "./MovieCard.module.css"

function MovieCard({ movie }) {
  const imdbID = movie.imdbID
  const navigate = useNavigate()
  const [_searchQuery, setSearchQuery] = useOutletContext()

  return (
    <div
      className={styles["movie-card"]}
      onClick={() => {
        setSearchQuery("")
        navigate(`/movie/${imdbID}`)
      }}>
      <img
        className={styles["movie-poster"]}
        src={movie.Poster}
        alt={movie.Title}
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
