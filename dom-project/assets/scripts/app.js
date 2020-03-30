const backdrop = document.getElementById('backdrop');

const addMovieModal = document.getElementById('add-modal');
const addMovieBtn = document.querySelector('header button');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const introSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    introSection.style.display = 'block';
  } else {
    introSection.style.display = 'none';
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible')
}

const renderAddedMovie = () => {
  const movie = movies[movies.length - 1]
  const newMovie = document.createElement('li');
  newMovie.className = 'movie-element';
  newMovie.innerHTML = `
    <div class="movie-element__image">
      <img src="${movie.image}" alt="${movie.title}" />
    </div>
    <div class="movie-element__info">
      <h2>${movie.title}<h2/>
      <p>${movie.rating}/5 stars</p>
    </div>
  `;
  newMovie.addEventListener('click', deleteMovieHandler.bind(null, movie.id));
  movieList.append(newMovie);
  
}

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
  addMovieModal.classList.toggle('visible')
  toggleBackdrop();
}

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearUserInputs();
  toggleBackdrop();
}

const addMovieHandler = () => {
  const movieTitle = userInputs[0].value;
  const imgUrl = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (movieTitle.trim() === '' ||
      imgUrl.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1 ||
      +ratingValue > 5 
      ) {
        alert('Please check the validity of your values');
        return
      }
  const newMovie = {
    id: Math.random().toString(),
    title: movieTitle,
    image: imgUrl,
    rating: ratingValue,
  }
  movies.push(newMovie);
  closeMovieModal();
  toggleBackdrop();
  clearUserInputs();
  renderAddedMovie();  
  updateUI();
}

const deleteMovie = (movieId) => {
  const movieToDelete = movies.find(movie => movie.id === movieId);
  const idx = movies.indexOf(movieToDelete);
  movies.splice(idx, 1);
  movieList.children[idx].remove();
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
  updateUI();
}

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');
  cancelDeletionBtn.removeEventListener('click', cancelMovieDeletion);

  cancelDeletionBtn.addEventListener('click', cancelMovieDeletion);
  confirmDeletionBtn.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
    ); 
}


const clearUserInputs = () => {
  userInputs.forEach(inpt =>  inpt.value = '');
}

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearUserInputs();
}

addMovieBtn.addEventListener('click', showMovieModal);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);

