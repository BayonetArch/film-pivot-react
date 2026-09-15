import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./RootLayout.css"

function RootLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  return (
    <div className="app-container">
      {isHomePage && (
        <header className="site-header">
          <h1 className="site-title">Film Pivot</h1>
          <p className="site-desc">Search. Discover. Pivot</p>
        </header>
      )}
      {!isHomePage && (
        <div
          className="home-link"
          onClick={() => {
            setSearchQuery("")
            navigate("/")
          }}>
          Home
        </div>
      )}

      <div className="input-wrapper">
        <input
          className="movie-search-input"
          type="text"
          placeholder="Search for movies...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <main>
        <Outlet context={[searchQuery, setSearchQuery]} />
      </main>
    </div>
  )
}

export default RootLayout
