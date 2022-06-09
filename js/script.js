let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');


const movieData = () => {
    return fetch(URL).then(res => res.json());
}

const renderMovies = () => {
    let click = 0;
    let i = 5;
    movieData().then((data) => {
        console.log(data);
        let movieCard = data.map((movie) => {
            return `
            <card id="${movie.id}">
                <h3>Title: ${movie.title}</h3>
            </card>
            `
        })


        let movieBar = document.querySelector('#movie-bar');


        const fiveCards = (movies) => {
            let x = movies.filter((x, index) => index < i)
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
                if (i < movieCard.length) {
                    buttonR.style.display = 'flex';
                }
                if (movieCard.length >= 5) {
                    movieBar.firstElementChild.remove();
                    movieBar.innerHTML += movies[i - 1];
                }

                document.querySelectorAll('card').forEach(function (card) {
                    console.log(card);
                    card.addEventListener('click', function () {
                        console.log(this.id);
                    })
                })

            })
            let buttonL = document.querySelector('buttonLeft');
            buttonL.style.display = 'none';
            buttonL.addEventListener('click', function () {
                click--
                i--;
                if (click === 0) {
                    buttonL.style.display = 'none'
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
                    console.log(card);
                    card.addEventListener('click', function () {
                        console.log(this.id);
                    })
                })

            })
            document.querySelectorAll('card').forEach(function (card) {
                console.log(card);
                card.addEventListener('click', function () {



                })
            })
            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');
        }
        fiveCards(movieCard);
    })
}
renderMovies();

// let str = `http://www.omdbapi.com/?t=&apikey=69918388;`
//
// function getMovie(titlename){
//     fetch(`http://www.omdbapi.com/?t=${titlename}&apikey=69918388`).then(res => res.json().then(finale => console.log(finale)));
//
//     }
// getMovie('all');

