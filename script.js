document.addEventListener("DOMContentLoaded", () => {

    const bestFilmUrl = "http://localhost:8000/api/v1/titles/9";
    const bestMoviesUrl = "http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score"
    const apiGenreUrl = "http://localhost:8000/api/v1/genres/"

    
    async function displayBestMovie(url) {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById("best-movie-img").src = data.image_url;
        document.getElementById("best-movie-title").textContent = data.title;
        document.getElementById("best-movie-summary").textContent = data.long_description
    }

    async function displayMovies(url, genreGrid) {
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
                <div class="movie-overlay">${movie.title}
                    <button id="button-overlay">Détails</button>
                </div>
            `;
            container.appendChild(movieItem);
        clickDetailsListener();
        });

    }

    async function fetchGenres(genreUrl) {
        let genresList = [];
        nextPage = genreUrl

        while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            for (let genre of data.results) {
                genresList.push(genre.name);
            }
            nextPage = data.next;
        }
        return genresList;
    }

    async function displayGenreList() {
        const genresList = await fetchGenres(apiGenreUrl)
        const genreSelect = document.getElementById("genre-select");
        for (let genre of genresList) {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        }
        selectGenreListener(genreSelect, "genre-grid");
    }

    function selectGenreListener(genreSelect) {
        genreSelect.addEventListener("change", async (event) => {
            const selectedGenre = event.target.value;
            const selectedUrl = `http://localhost:8000/api/v1/titles/?genre=${selectedGenre}`
            if (selectedUrl) {
                await displayMovies(selectedUrl, "custom-category-grid");
            }
        });
    }

    async function clickDetailsListener() {
        buttonDetail = document.querySelectorAll(".button-overlay");
        buttonDetail.forEach(button => {
            button.addEventListener("click", () => {
                console.log("bouton cliqué");
            });
        });

    }

    
    displayGenreList();
    displayBestMovie(bestFilmUrl);
    displayMovies(bestMoviesUrl, "top-rated-movies-grid");
    displayMovies("http://localhost:8000/api/v1/titles/?genre=Action", "category-1-grid");
    displayMovies("http://localhost:8000/api/v1/titles/?genre=Mystery", "category-2-grid");
    
});