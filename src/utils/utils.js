export const OMDB_API_KEY = "61b657f5"

export async function fetchApi(
  url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`,
) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        throw new Error(data.Error)
      }
      return data
    })
}
