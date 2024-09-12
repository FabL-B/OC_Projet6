const bestMoviesUrl = "http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score";
const apiGenreUrl = "http://localhost:8000/api/v1/genres/";

const getBestMovieUrl = async () => {
    const response = await fetch(bestMoviesUrl);
    const data = await response.json();
    const bestMovie = data.results[0];
    return `http://localhost:8000/api/v1/titles/${bestMovie.id}`;
};

const displayBestMovie = async () => {
    url = await getBestMovieUrl()
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById("best-movie-img").src = data.image_url;
    document.getElementById("best-movie-title").textContent = data.title;
    document.getElementById("best-movie-summary").textContent = data.description;
    const detailsButton = document.getElementById("button-modal-movie-id");
    detailsButton.id = `button-modal-${data.id}`;
    detailsButton.setAttribute('onclick', `toggleModal(${data.id})`);
};

const displayMovies = async (url, genreGrid) => {
    const container = document.getElementById(genreGrid);
    let moviesList = [];
    let nextPage = url;
    while (moviesList.length < 6 && nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        moviesList = moviesList.concat(data.results);
        nextPage = data.next;
    }

    const toDisplayMovies = moviesList.slice(0, 6);

    container.innerHTML = "";

    toDisplayMovies.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.className = "movie-item";
        movieItem.innerHTML = `
            <img src="${movie.image_url}" alt="${movie.title}">
            <div class="movie-modal">${movie.title}
                <button class="button-modal" id="button-modal-${movie.id}" onclick="toggleModal('${movie.id}')">Détails</button>
            </div>
        `;
        container.appendChild(movieItem);
    });
}

const fetchGenres = async (genreUrl) => {
    let genresList = [];
    let nextPage = genreUrl;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        for (let genre of data.results) {
            genresList.push(genre.name);
        }
        nextPage = data.next;
    }
    return genresList;
};

const displayGenreList = async () => {
    const genresList = await fetchGenres(apiGenreUrl);
    const genreSelect = document.getElementById("genre-select");
    for (let genre of genresList) {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    }
    selectGenreListener(genreSelect);
};

const selectGenreListener = (genreSelect) => {
    genreSelect.addEventListener("change", async (event) => {
        const selectedGenre = event.target.value;
        const selectedUrl = `http://localhost:8000/api/v1/titles/?genre=${selectedGenre}&sort_by=-imdb_score`;
        if (selectedUrl) {
            await displayMovies(selectedUrl, "custom-category-grid");
        }
    });
};

const toggleModal = (movieId = null) => {
    const modal = document.getElementById("modal");
    if (modal.classList.contains("open-modal")) {
        modal.classList.remove("open-modal");
    } else {
        if (movieId) {
            displayMovieDetails(movieId);
        }
        modal.classList.add("open-modal");
    }
};

const displayMovieDetails = async (movieId) => {
    const movieUrl = `http://localhost:8000/api/v1/titles/${movieId}`;
    const response = await fetch(movieUrl);
    const data = await response.json();
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-year-genre").textContent = `${data.year} - ${data.genres.join(", ")}`;
    document.getElementById("modal-rated-duration-country").textContent = `${data.rated} - ${data.duration} minutes - (${data.countries})`;
    document.getElementById("modal-score").textContent = `IMDB Score: ${data.imdb_score}`;
    document.getElementById("box-office-revenue").textContent = `Box office revenue: ${data.worldwide_gross_income}`
    document.getElementById("modal-director").textContent = `Director: ${data.directors.join(", ")}`;
    document.getElementById("modal-summary").textContent = data.long_description;
    document.getElementById("modal-casting").textContent = `${data.actors.join(", ")}`;
    document.getElementById("modal-img").src = data.image_url;
};

const showMoreMovies = (genreGrid, showMoreBtnId, showLessBtnId) => {
    const container = document.getElementById(genreGrid);
    const movieItems = container.querySelectorAll('.movie-item');
    movieItems.forEach(movieItem => {
        movieItem.style.display = 'block';
    });
    document.getElementById(showMoreBtnId).style.display = 'none';
    document.getElementById(showLessBtnId).style.display = 'block';
}

const showLessMovies = (genreGrid, showMoreBtnId, showLessBtnId) => {
    const container = document.getElementById(genreGrid);
    const movieItems = container.querySelectorAll('.movie-item');
    movieItems.forEach((movieItem, index) => {
        if (window.innerWidth >= 480 && window.innerWidth < 768) {
            movieItem.style.display = index < 4 ? 'block' : 'none';
        } else {
            movieItem.style.display = index < 2 ? 'block' : 'none';
        }
    });
    document.getElementById(showMoreBtnId).style.display = 'block';
    document.getElementById(showLessBtnId).style.display = 'none';
}

const main = async () => {
    await displayGenreList();
    await displayBestMovie();
    await displayMovies(bestMoviesUrl, "top-rated-movies-grid");
    await displayMovies("http://localhost:8000/api/v1/titles/?genre=Adventure&sort_by=-imdb_score", "category-1-grid");
    await displayMovies("http://localhost:8000/api/v1/titles/?genre=Mystery&sort_by=-imdb_score", "category-2-grid");
};

document.addEventListener("DOMContentLoaded", main);
