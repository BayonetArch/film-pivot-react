import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./RootLayout.css"

function RootLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="app-container">
      {isHomePage && (
        <header className="site-header">
          <h1 className="site-title">Film Pivot</h1>
          <p className={isFocused ? "site-desc focused" : "site-desc"}>
            Search. Discover. Pivot
          </p>
        </header>
      )}
      {!isHomePage && (
        <div
          className="home-link"
          onClick={() => {
            setSearchQuery("")
            navigate("/", { viewTransition: true })
          }}>
          Home
        </div>
      )}

      <div className="input-wrapper">
        <div className="search-box">
          <input
            className="movie-search-input"
            type="text"
            placeholder="Search for movies...."
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {}}>
            <circle cx="10.5" cy="10.5" r="7.5"></circle>
            <line x1="21" y1="21" x2="15.8" y2="15.8"></line>
          </svg>
        </div>
      </div>
      <main>
        <Outlet context={[searchQuery, setSearchQuery]} />
      </main>
    </div>
  )
}

export default RootLayout
