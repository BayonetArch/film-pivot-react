import { useOutletContext, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "./MoviePage.module.css"
import MovieResult from "../components/MovieResult"

function MoviePage() {
  const { id } = useParams()
  const [searchQuery, _setSearchQuery] = useOutletContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovie() {
      setLoading(false)
    }
    fetchMovie()
  }, [id, loading])

  if (searchQuery.length > 2) {
    return <MovieResult />
  }

  if (loading && searchQuery.length > 2) {
    return <div className="loader">Loading...</div>
  }

  return (
    <div className={styles["movie-page"]}>
      <h1>Movie Details: {id}</h1>
    </div>
  )
}
export default MoviePage
