let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');

setTimeout(function () {
    document.querySelector('body').style.visibility = 'visible';
    body.classList.remove('loadScreen');
}, 1000);
let counter = 0;
let searchBar = document.querySelector('#query');
document.querySelector('#button').addEventListener('click', () => {
    counter++

    let body = document.querySelector('body');
    body.style.visibility = 'hidden';
    body.classList.add('loadScreen');


    const searchMovies = (search) => {
        console.log(search.value);

        const movieData = () => {
            return fetch(`http://www.omdbapi.com/?s=${search.value}&page=1&type=movie&apikey=69918388`).then(res => res.json()).then(data => data.Search);
        }

        const renderMovies = () => {
            let click = 0;
            let i = 5;
            movieData().then((data) => {
                console.log(data);
                const movieTitle = document.querySelector('movieTitle');
                const rightSide = document.querySelector('rightSide');

                rightSide.innerHTML = `<img style="height: 280px; width: 100%" src="${data[0].Poster}" alt="failed to load" />`
                movieTitle.firstElementChild.innerHTML = data[0].Title;
                if (counter > 1) {
                    counter = 0;
                    movieTitle.firstElementChild.innerHTML = '';
                    movieTitle.firstElementChild.innerHTML = data[0].Title;
                }

                let movieCard = data.map((movie) => {
                    console.log(movie);
                    return `
            <card id="${movie.imdbID}">
                <img style="height: 100%; width: 100%;" src="${movie.Poster}" alt="failed to load">
            </card>
            `
                })


                const movieBar = document.querySelector('#movie-bar');



                const fiveCards = (movies) => {
                    let x = movies.filter((x, index) => index < i);
                    movieBar.innerHTML = x.join('');
                    let buttonR = document.querySelector('buttonRight');
                    buttonR.addEventListener('click', function () {
                        click++;
                        if (click !== 0) {
                            buttonL.style.display = 'flex';
                        }
                        i++;
                        if (click < movieCard.length - 1) {
                            buttonR.style.display = 'none';
                        }
                        console.log(i);
                        if (i < movieCard.length) {
                            buttonR.style.display = 'flex';
                        }
                        if (movieCard.length >= 5) {
                            movieBar.firstElementChild.remove();
                            movieBar.innerHTML += movies[i - 1];
                        }



                        document.querySelectorAll('card').forEach(function (card) {

                            card.addEventListener('click', function () {

                            })
                        })

                    })
                    const card = document.querySelector('card');
                    fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => {
                        console.log(alldata);
                        document.querySelector('.rating').innerHTML = 'Rated: ' + alldata.Rated
                        document.querySelector('.description').innerHTML = 'Description: '+'<br>' + alldata.Plot;
                        document.querySelector('.director').innerHTML = 'Director: ' + '<br>' + alldata.Director + '<br>' + '<br>' + 'Actors: '+ '<br>' + alldata.Actors;
                    });




                    let buttonL = document.querySelector('buttonLeft');
                    buttonL.style.display = 'none';
                    buttonL.addEventListener('click', function () {
                        click--;
                        i--;
                        if (click === 0) {
                            buttonL.style.display = 'none'
                        }
                        if (i < movieCard.length) {
                            buttonR.style.display = 'flex';
                        }
                        const newFrontCard = () => {
                            const card = document.createElement('card');
                            card.innerHTML = movies[i - 5];
                            return card
                        }
                        if (movieCard.length >= 5) {
                            movieBar.lastElementChild.remove();
                            movieBar.prepend(newFrontCard().firstElementChild);

                        }

                        document.querySelectorAll('card').forEach(function (card) {
                            card.addEventListener('click', function () {
                            })
                        })

                    })
                    document.querySelectorAll('card').forEach(function (card) {
                        card.addEventListener('click', function () {
                            fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => console.log(alldata));

                        })
                    })

                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
                fiveCards(movieCard);
            })
        }
        renderMovies();


    }
    searchMovies(searchBar)
})













