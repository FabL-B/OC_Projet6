# JustStreamIt

## Description:

JustStreamIt is a user interface developed using HTML, CSS, and JavaScript, designed to display movies from the OCMovies API. The goal of this project is to allow users to browse a selection of movies, view movie details in a modal window, and navigate through different movie categories.

## Features:
### Movie Management:

- Display top-rated movies.
- View movie details in a modal.
- Browse through movie categories (Adventure, Mystery, etc.).

### Movie Details Modal:

- Display details of a movie, such as title, director, summary, score, etc.
- Navigate through movie options via modal buttons.

### API Interactions:

- Fetch movie information from the OCMovies API using `fetch` requests.
- Dynamically display movies on the page using the fetched data.

### Responsive Design:

- The layout adapts to different screen sizes (mobile, tablet, desktop).
- Manage the display of images and movies in a grid format for a better user experience.

## Installation:

1. Open Git Bash or any terminal.

2. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/FabL-B/OC_Projet6
    cd JustStreamIt
    ```

3. Install and run the OCMovies API (if it's not already running):

    - Clone the API from the following repository:  
      [OCMovies API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)

    - Navigate to the API directory:

      ```bash
      cd path/to/ocmovies-api-en
      ```

    - Create and activate the virtual environment:

      - For **Linux/Mac**:
        ```bash
        python3 -m venv env
        source env/bin/activate
        ```

      - For **Windows**:
        ```bash
        python -m venv env
        .\env\Scripts\activate
        ```

    - Once the virtual environment is activated, run the API server with the following command:

      ```bash
      python3 manage.py runserver
      ```

## Usage:

1. Open the `index.html` file in your web browser:

    - Double-click the `index.html` file located in the `JustStreamIt` directory to launch the application.

2. Browse the website to view movies, open modals for movie details, and explore different categories.

3. Modify the HTML, CSS, or JavaScript code to customize the site or improve its functionality.