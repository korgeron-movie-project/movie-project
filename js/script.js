let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');
const loadingScreen = setTimeout(function () {
    document.querySelector('body').style.visibility = 'visible';
    body.classList.remove('loadScreen');
}, 1000);
const movieData = () => {
    return fetch(URL).then(res => res.json());
}

const renderMovies = () => {
    let click = 0;
    let i = 5;
    movieData().then((data) => {
        let movieCard = data.map((movie) => {
            return `
            <card id="${movie.id}">
                <h3>Title: ${movie.id}</h3>
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

                document.querySelectorAll('card').forEach(function (card){
                    console.log(card);
                    card.addEventListener('click', function (){
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

                document.querySelectorAll('card').forEach(function (card){
                    console.log(card);
                    card.addEventListener('click', function (){
                        console.log(this.id);
                    })
                })




            })

            document.querySelectorAll('card').forEach(function (card){
                console.log(card);
                card.addEventListener('click', function (){
                    console.log(this.id);
                    this.style.border = '5px solid gold';
                })
            })



        }
        fiveCards(movieCard);
    })
}
renderMovies();



