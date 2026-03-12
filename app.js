import { Movie } from "./movie.js"

// Element
const container = document.querySelector(".container")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")

let ticketPrice = 0


// Hämta filmer från JSON-server
fetch("http://localhost:3000/movies")
  .then((response) => response.json())
  .then((data) => {

    const movies = data.map(
      (m) => new Movie(m.Title, m.Year, m.Price, m.Poster)
    )

    movieSelect.innerHTML = ""

    movies.forEach((movie) => {

      const option = document.createElement("option")

      option.value = movie.price
      option.textContent = `${movie.title} (${movie.price} kr)`

      movieSelect.appendChild(option)

    })

    ticketPrice = movies[0].price

  })


// klicka på seat
container.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {

    e.target.classList.toggle("selected")

    updateSelectedCount()

  }

})


// ändra film
movieSelect.addEventListener("change", (e) => {

  ticketPrice = +e.target.value

  updateSelectedCount()

})


// uppdatera pris
function updateSelectedCount() {

  const selectedSeats = document.querySelectorAll(".seat.selected")

  const selectedSeatsCount = selectedSeats.length

  count.innerText = selectedSeatsCount

  total.innerText = selectedSeatsCount * ticketPrice

}