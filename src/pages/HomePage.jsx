import { useOutletContext } from "react-router-dom"
import MovieResult from "../components/MovieResult"
import styles from "./HomePage.module.css"

function HomePage() {
  const [_searchQuery, setSearchQuery] = useOutletContext()

  return (
    <div className={styles["home-page"]}>
      <div className={styles["quicklinks-wrapper"]}>
        <div className={styles["quicklinks"]}>
          <div
            className={styles["quicklink"]}
            onClick={() => setSearchQuery("Action")}>
            Action
          </div>
          <div
            className={styles["quicklink"]}
            onClick={() => setSearchQuery("Adventure")}>
            Adventure
          </div>
          <div
            className={styles["quicklink"]}
            onClick={() => setSearchQuery("Animation")}>
            Animation
          </div>
          <div
            className={styles["quicklink"]}
            onClick={() => setSearchQuery("Comedy")}>
            Comedy
          </div>
        </div>
      </div>
      <MovieResult />
    </div>
  )
}
export default HomePage
