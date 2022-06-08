// fetch(URL)
//     .then(res => res.json())
//     .then((data) => console.log(data))
//     .catch((error) =>{console.error(error);
// });


const movieData = () => {
    return fetch(URL).then(res => res.json());
}
// console.log(movieData());


const renderMovies = () => {
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
                console.log(i)
                i++;
                if (i > movieCard.length - 1) {
                    buttonR.style.display = 'none';
                }
                if (movieCard.length >= 5) {
                    movieBar.firstElementChild.remove();
                    movieBar.innerHTML += movies[i - 1];
                }

            })
            let buttonL = document.querySelector('buttonLeft');
            buttonL.addEventListener('click', function () {
                console.log(i)
                i--;
                if (i < movieCard.length) {
                        buttonR.style.display = 'flex';
                }

                if (movieCard.length >= 5) {
                    movieBar.lastElementChild.remove();
                    movieBar.prepend(`<card></card>`);
                }

            })
        }
        fiveCards(movieCard)


    })
}
renderMovies();


//TODO: THINGS TO KEEP

// movieBar.innerHTML = movieCard.join('');



