import { useState, useEffect } from "react"
import { fetchApi, OMDB_API_KEY } from "../utils/utils.js"
import MovieCard from "./MovieCard"
import { useOutletContext } from "react-router-dom"

function MovieResult() {
  const [searchQuery] = useOutletContext()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [wasErr, setWasErr] = useState(false)

  function handleQueryData(data) {
    const dataArr = data.Search
    setData(dataArr)
  }

  function handleQueryErr(err) {
    setWasErr(true)
    console.log(err)
  }

  async function fetchSearchData() {
    setLoading(true)
    const queryUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchQuery}`

    try {
      const data = await fetchApi(queryUrl)
      if (data.Response === "False") {
        throw new Error(data.Error)
      }
      handleQueryData(data)
      setWasErr(false)
    } catch (err) {
      handleQueryErr(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchQuery.length > 2 && fetchSearchData()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  if (loading && searchQuery.length > 2) {
    return <div className="loader">Loading...</div>
  }

  return (
    <div className="result-wrapper">
      <div className={wasErr ? "result error" : "result"}>
        {data.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MovieResult
