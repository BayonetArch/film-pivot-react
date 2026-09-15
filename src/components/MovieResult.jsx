import { useState, useEffect } from "react"
import { fetchApi, OMDB_API_KEY } from "../utils/utils.js"
import MovieCard from "./MovieCard"
import { useOutletContext } from "react-router-dom"

function MovieResult() {
  const [searchQuery] = useOutletContext()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [wasErr, setWasErr] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [showErr, setShowErr] = useState(false)

  function hideErr() {
    setShowErr(false)
    setWasErr(false)
  }

  function handleQueryData(data) {
    const dataArr = data.Search
    setData(dataArr)
  }

  function handleQueryErr(err) {
    setWasErr(true)
    setErrMsg(err.message)
    setShowErr(true)
  }

  async function fetchSearchData() {
    setLoading(true)
    hideErr()
    const queryUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${searchQuery}`

    try {
      const data = await fetchApi(queryUrl)
      if (data.Response === "False") {
        throw new Error(data.Error)
      }
      handleQueryData(data)
      hideErr()
    } catch (err) {
      handleQueryErr(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!showErr && errMsg) {
      const t = setTimeout(() => setErrMsg(""), 320)
      return () => clearTimeout(t)
    }
  }, [showErr, errMsg])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchQuery.length > 2 && fetchSearchData()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <div className="result-wrapper">
      <div className={`result-error ${showErr && errMsg ? "show" : ""}`}>
        {errMsg && (
          <p>
            <span>Error:</span> {errMsg}
            <button
              className="error-close"
              onClick={hideErr}
              aria-label="Dismiss">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </p>
        )}
      </div>
      {loading && searchQuery.length > 2 ? (
        <div className="loader-wrapper">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className={wasErr ? "result error" : "result"}>
          {data.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieResult
