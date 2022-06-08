const movieData = () => {
    return fetch(URL).then(res => res.json());
}

const renderMovies = () => {
let click = 0;
console.log(click);
    let i = 5;
    movieData().then((data) => {
        let movieCard = data.map((movie) => {

            // console.log(movie);
            return `
            <card>
                <h3>Title: ${movie.id}</h3>
            </card>
            `

        })
        let movieBar = document.querySelector('#movie-bar');

        const fiveCards = (movies) => {
            let x = movies.filter((x, index) => index < i)
            movieBar.innerHTML = x.join('');
            console.log(movies.length);
            let buttonR = document.querySelector('buttonRight');
            buttonR.addEventListener('click', function () {
                click++;
                if (click !== 0) {
                    console.log('its not 0 anymore');
                    buttonL.style.display = 'flex';
                }
                console.log(click);
                console.log(i)
                i++;
                console.log(i);
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

            })
            let buttonL = document.querySelector('buttonLeft');



            buttonL.addEventListener('click', function () {
                console.log(i)
                click--
                i--;
                if (click === 0) {
                    console.log('its 0');
                    buttonL.style.display = 'none'
                }

                const newFrontCard = () => {
                    const card = document.createElement('card');
                    card.innerHTML = movies[i - 5];

                    console.log(card.innerText);
                    console.log(card)
                    return card
                }
                console.log(newFrontCard());
                if (movieCard.length >= 5) {
                    movieBar.lastElementChild.remove();
                    movieBar.prepend(newFrontCard().firstElementChild);

                }

            })
        }
        fiveCards(movieCard);


    })
}
renderMovies();



