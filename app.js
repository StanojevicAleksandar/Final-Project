const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=a199b4f09b3e7d29e56d2330f8014163';
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const genres = [{
  "id": 28,
  "name": "Action"
},
{
  "id": 12,
  "name": "Adventure"
},
{
  "id": 16,
  "name": "Animation"
},
{
  "id": 35,
  "name": "Comedy"
},
{
  "id": 80,
  "name": "Crime"
},
{
  "id": 99,
  "name": "Documentary"
},
{
  "id": 18,
  "name": "Drama"
},
{
  "id": 10751,
  "name": "Family"
},
{
  "id": 14,
  "name": "Fantasy"
},
{
  "id": 36,
  "name": "History"
},
{
  "id": 27,
  "name": "Horror"
},
{
  "id": 10402,
  "name": "Music"
},
{
  "id": 9648,
  "name": "Mystery"
},
{
  "id": 10749,
  "name": "Romance"
},
{
  "id": 878,
  "name": "Science Fiction"
},
{
  "id": 10770,
  "name": "TV Movie"
},
{
  "id": 53,
  "name": "Thriller"
},
{
  "id": 10752,
  "name": "War"
},
{
  "id": 37,
  "name": "Western"
}]

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results)
    showMovies(data.results.slice(0,8))
  })
}


function showMovies(data) {
  main.innerHTML = ""

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `

   
    
      <img src="${IMG_URL + poster_path}" alt="${title}"
      />

      <div class="movie__info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>

      <div class="overview">

        <h3>Overview</h3>
        ${overview}
      </div> </div> `

      
  

    main.appendChild(movieEl)
  })
}

function getColor(vote) {
  if (vote >= 8) {
    return "green"
  } else if (vote >= 5) {
    return "orange"
  } else {
    return "red"
  }
}

/*
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL+"&query="+searchTerm)
  } else {
    getMovies(API_URL);
  }

}) */

document.addEventListener("active", e => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]")
  if (!isDropdownButton && e.target.closest("[data-dropdown]") !=null)
  return

  let currentDropdown
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.classList.toggle("active")
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active")
  })
})
