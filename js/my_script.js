//TODO: Page loading for main screen
let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');

//TODO: BUTTON TO RELOAD THE PAGE
document.querySelector('#home').addEventListener('click', function () {
    document.location.reload();
})

//TODO: Fetch data from glitch remix
const mainPageMovieData = () => {
    return fetch("https://truthful-field-mice.glitch.me/movies").then(res => res.json())
}

let mainData = mainPageMovieData().then(data => data);

//TODO: Function to dynamically add movie data to the card elements
const loadMainPageMovieData = (data) => {
    data.then(mainMovieArr => {
        console.log(mainMovieArr);
        let cards = document.querySelectorAll('card');
        let moviebar = document.querySelector('movieBar');


        //TODO: This is the data to change in order to change the poster data for the cards on button clicks
        let start = 0;
        let end = 5;
        let change = 0;


        //TODO: This creates the 5 cards
        mainMovieArr.forEach((movie, i) => {
            if (((i) + start) < end) {
                let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card>`
                moviebar.innerHTML += r;
                //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                document.querySelector('body').style.visibility = 'visible';
                body.classList.remove('loadScreen');
            }
        })


        let btnR = document.querySelector('buttonRight');
        let btnL = document.querySelector('buttonLeft');

        //TODO: This is needed to hide left button on initial start
        if (start <= 0) {
            btnL.style.display = 'none';
        }

        //TODO: Right button click event
        btnR.addEventListener('click', () => {
            moviebar.innerHTML = '';
            console.log(++start);
            ++end;
            ++change;

            if (end >= mainMovieArr.length) {
                btnR.style.display = 'none';
            } else {
                btnR.style.display = 'flex';
            }
            if (start <= 0) {
                btnL.style.display = 'none';
            } else {
                btnL.style.display = 'flex';
            }

            mainMovieArr.forEach((movie, i) => {
                if (((i) + start) < end) {
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card>`

                    moviebar.innerHTML += r;
                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            })

        })
        //TODO: This adds the functionality to the left button
        btnL.addEventListener('click', () => {
            moviebar.innerHTML = '';
            --start;
            --end;
            --change;

            if (end >= mainMovieArr.length) {
                btnR.style.display = 'none';
            } else {
                btnR.style.display = 'flex';
            }
            if (start <= 0) {
                btnL.style.display = 'none';
            } else {
                btnL.style.display = 'flex';
            }

            mainMovieArr.forEach((movie, i) => {
                if (((i) + start) < end) {
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card>`

                    moviebar.innerHTML += r;
                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            })
        })
        return moviebar;
    })
}
loadMainPageMovieData(mainData);