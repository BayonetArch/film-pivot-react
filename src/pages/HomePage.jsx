import { useOutletContext } from "react-router-dom"
import MovieResult from "../components/MovieResult"
import styles from "./HomePage.module.css"

const GENRES = ["Action", "Adventure", "Animation", "Comedy"]

function HomePage() {
  const [_searchQuery, setSearchQuery] = useOutletContext()

  return (
    <div className={styles["home-page"]}>
      <div className={styles["quicklinks-wrapper"]}>
        <div className={styles["quicklinks"]}>
          {GENRES.map((genre) => (
            <div
              key={genre}
              className={styles["quicklink"]}
              onClick={() => setSearchQuery(genre)}>
              {genre}
            </div>
          ))}
        </div>
      </div>
      <MovieResult />
    </div>
  )
}
export default HomePage