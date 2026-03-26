import { Movie } from "./movie.js";

// Element
const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// Startpris
let ticketPrice = 0;

// Fallback filmer
const fallbackMovies = [
  new Movie("The Lion King", "2019", 100, "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_SX300.jpg"),
  new Movie("Doctor Strange", "2016", 120, "https://m.media-amazon.com/images/M/MV5BMjEyNjQ3NjYyNV5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg"),
  new Movie("Get Hard", "2015", 90, "https://m.media-amazon.com/images/M/MV5BMjA0ODc0ODU3MF5BMl5BanBnXkFtZTgwMjg3NDc1NDE@._V1_SX300.jpg")
];

// Hämta filmer
fetch("http://localhost:3000/movies")
  .then((res) => res.json())
  .then((movies) => {
    populateMovies(movies);
    updateSelectedCount(); // 🔥 viktigt
  })
  .catch(() => {
    console.warn("Använder fallback-filmer");
    populateMovies(fallbackMovies);
    updateSelectedCount(); // 🔥 viktigt
  });

// Fyll dropdown
function populateMovies(movies) {
  movieSelect.innerHTML = "";

  movies.forEach((m) => {
    const movie =
      m instanceof Movie
        ? m
        : new Movie(m.Title, m.Year, m.Price, m.Poster);

    const option = document.createElement("option");
    option.value = movie.price;
    option.textContent = `${movie.title} (${movie.price} kr)`;
    movieSelect.appendChild(option);
  });

  ticketPrice = +movieSelect.value;
}

// Klick på säten
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Byta film
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Uppdatera
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
