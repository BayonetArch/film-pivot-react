import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movie/:id", element: <MoviePage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
