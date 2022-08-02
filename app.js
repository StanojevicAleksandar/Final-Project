const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=a199b4f09b3e7d29e56d2330f8014163';
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "heetps://image.tmdb.org/t/p/w500";

const row_recommendations = document.getElementById("recommendations");

getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    showMovies(data.results);
  })
}

function showMovies(data) {
  row_recommendations.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
  
  <img
  src="${IMG_URL + poster_path}" class="recommendations__img" alt="${title}"/>

  <div class="movie__info">
  <h3>${title}</h3>
  <span class="${getColor(vote_average)}">${vote_average}</span>
  </div>
  
  <div class="overview">
  
  <h3>Overview</h3>
  ${overview}
  </div>
  `

  row_recommendations.appendChild(movieEl);

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