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
        let map = new Map();


        //TODO: Fixes constant load if array of movies is 0
        if (mainMovieArr.length <= 0) {
            //TODO:This loads in page for main page  (corresponds to the above load page functionality)
            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');
        }


        let moviebar = document.querySelector('movieBar');


        //TODO: This is the data to change in order to change the poster data for the cards on button clicks
        let start = 0;
        let end = 5;
        let change = 0;


        //TODO: This creates the 5 cards
        mainMovieArr.forEach((movie, i) => {

            //TODO: Testing Map() over array
            map.set(mainMovieArr[i].Title, mainMovieArr[i].id);


            //TODO: This adds left side image on page load
            let leftSide = document.querySelector('rightside'); //do not change selector
            leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${mainMovieArr[0].Poster}" alt="${mainMovieArr[0].Title}" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

            //TODO: This adds title to right side on page load
            let title = document.querySelector('movieTitle');
            title.firstElementChild.innerHTML = `${mainMovieArr[0].Title}`;




            //TODO: Adds cards on page load
            if (((i) + start) < end) {

                //TODO: Sets values from Map() to card (values = id)
                let values;
                map.forEach(function (value) {
                    values = value;
                })

                let r = `<card id="${values}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card>`
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

        //TODO: Click event for each card
        document.querySelectorAll('card').forEach(function (card, i) {
            card.addEventListener('click', function () {

                console.log(card);

                //TODO: Adding image to the left side of the page
                let leftSide = document.querySelector('rightside'); //do not change selector
                leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                //TODO: This adds title to right side of the page
                let title = document.querySelector('movieTitle');
                title.firstElementChild.innerHTML = `${mainMovieArr[(i)].Title}`;

                //TODO: Delete button functionality
                document.querySelector('#deleteMovie').addEventListener('click', function () {
                    const deleteMovie = (id) => {
                        console.log(id);
                        const URL = `https://truthful-field-mice.glitch.me/movies`;
                        console.log(URL);
                        let options = {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                    }
                    deleteMovie(card.id);

                    //TODO: Page reload to update card data
                    setTimeout(function () {
                        document.location.reload();
                    }, 300);

                })

            })
        })

        //TODO: Delete button functionality (NEEDS TO BE CALLED HERE FOR INITIAL PAGE LOAD)
        document.querySelector('#deleteMovie').addEventListener('click', function () {
            const deleteMovie = (id) => {
                const URL = "https://truthful-field-mice.glitch.me/movies";
                let options = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
            }
            deleteMovie(mainMovieArr[0].id);

            setTimeout(function () {
                document.location.reload();
            }, 300);

        })

        //TODO: Hides right button if array is less than or equal to 5
        if (mainMovieArr.length <= 5) {
            btnR.style.display = 'none';
        }


        //TODO: Right button click event
        btnR.addEventListener('click', () => {
            moviebar.innerHTML = '';
            ++start;
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

                    console.log(mainMovieArr);

                    //NOTES: Since card is in a loop here... the array shows 5 times (the amount of cards)
                    // Try to change the way you are adding the id. maybe in the for each card function?
                    // Or try changing the way you add the source to get rid of the loop? //NOT SURE HOW
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card>`

                    moviebar.innerHTML += r;

                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            })

            //TODO: Click event for each card
            document.querySelectorAll('card').forEach(function (card, i) {
                card.addEventListener('click', function () {


                    console.log(card);


                    //TODO: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                    //TODO: This adds title to right side of the page
                    let title = document.querySelector('movieTitle');
                    title.firstElementChild.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //TODO: Delete button functionality
                    document.querySelector('#deleteMovie').addEventListener('click', function () {
                        const deleteMovie = (id) => {
                            const URL = "https://truthful-field-mice.glitch.me/movies";
                            let options = {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                        }
                        deleteMovie(card.id);

                        setTimeout(function () {
                            document.location.reload();
                        }, 300);

                    })


                })
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
                    let r = `<card id="${this.id}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card>`

                    moviebar.innerHTML += r;
                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');


                }
            })

            //TODO: Click event for each card
            document.querySelectorAll('card').forEach(function (card) {
                card.addEventListener('click', function () {
                    console.log(card);

                    // console.log(card.firstElementChild.attributes[1].value);

                    //TODO: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                    //TODO: This adds title to right side of the page
                    let title = document.querySelector('movieTitle');
                    title.firstElementChild.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //TODO: Delete button functionality
                    document.querySelector('#deleteMovie').addEventListener('click', function () {
                        const deleteMovie = (id) => {
                            const URL = "https://truthful-field-mice.glitch.me/movies";
                            let options = {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                            return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                        }
                        deleteMovie(card.id);

                        setTimeout(function () {
                            document.location.reload();
                        }, 300);

                    })

                })
            })

        })
        return moviebar;
    })
}
loadMainPageMovieData(mainData);


// ----------------------------------------------------------------- //

//TODO: THIS IS FOR THE SEARCH MOVIE PORTION
const onlineMovies = () => {
    let search = document.querySelector('#search-bar');

    //TODO: This adds click event to search for online movies to add to current page
    document.querySelector('#search-button').addEventListener('click', () => {
        console.log(search.value);

        //TODO: Establishing the online search
        fetch(`http://www.omdbapi.com/?s=${search.value}&page=1&type=movie&apikey=69918388`).then(res => res.json()).then(data => {
            let movies = data.Search;
            let moviebar = document.querySelector('movieBar');
            moviebar.innerHTML = '';
            console.log(movies);

            //TODO: Adding image to the left side of the page
            let leftSide = document.querySelector('rightside'); //do not change selector
            leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${movies[0].Poster}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

            //TODO: This is the data to change in order to change the poster data for the cards on button clicks
            let start = 0;
            let end = 5;
            let change = 0;

            //TODO: 5 cards for online search
            movies.forEach((movie, i) => {
                if (((i) + start) < end) {
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> `
                    moviebar.innerHTML += r;
                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            });

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

                if (end >= movies.length) {
                    btnR.style.display = 'none';
                } else {
                    btnR.style.display = 'flex';
                }
                if (start <= 0) {
                    btnL.style.display = 'none';
                } else {
                    btnL.style.display = 'flex';
                }

                movies.forEach((movie, i) => {
                    if (((i) + start) < end) {
                        let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> `

                        moviebar.innerHTML += r;
                        //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                        document.querySelector('body').style.visibility = 'visible';
                        body.classList.remove('loadScreen');
                    }
                })

                //TODO: Click event for each card
                document.querySelectorAll('card').forEach(function (card) {
                    card.addEventListener('click', function () {

                        //TODO: Adding image to the left side of the page
                        let leftSide = document.querySelector('rightside'); //do not change selector
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

                        //TODO: This adds title to right side of the page
                    })
                })

            })

            //TODO: This adds the functionality to the left button
            btnL.addEventListener('click', () => {
                moviebar.innerHTML = '';
                --start;
                --end;
                --change;

                if (end >= movies.length) {
                    btnR.style.display = 'none';
                } else {
                    btnR.style.display = 'flex';
                }
                if (start <= 0) {
                    btnL.style.display = 'none';
                } else {
                    btnL.style.display = 'flex';
                }

                movies.forEach((movie, i) => {
                    if (((i) + start) < end) {
                        let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> `

                        moviebar.innerHTML += r;

                        //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                        document.querySelector('body').style.visibility = 'visible';
                        body.classList.remove('loadScreen');
                    }
                })

                //TODO: Click event for each card
                document.querySelectorAll('card').forEach(function (card, i) {
                    card.addEventListener('click', function () {

                        //TODO: Adding image to the left side of the page
                        let leftSide = document.querySelector('rightside'); //do not change selector
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D </button>`

                        //TODO: This adds title to right side of the page

                        //TODO: This adds movies to the main page
                        document.querySelector('#addMovie').addEventListener('click', function () {
                            function addMovie(movie) {
                                console.log(movie);
                                fetch("https://truthful-field-mice.glitch.me/movies", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        Title: movie.Title,
                                        Poster: movie.Poster,
                                        imdbID: movie.imdbID
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then((res) => res.json()).then(data => console.log(data))
                            }

                            addMovie(movies);
                        })
                    })
                })


            })

            //TODO: Trying to add specific movie search by id to add descriptions etc
            console.log(movies);


            //TODO: This adds movies to the main page
            document.querySelector('#addMovie').addEventListener('click', function () {
                function addMovie(movie) {
                    console.log(movie);
                    fetch("https://truthful-field-mice.glitch.me/movies", {
                        method: "POST",
                        body: JSON.stringify({
                            Title: movie[0].Title,
                            Poster: movie[0].Poster,
                            imdbID: movie[0].imdbID
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => res.json()).then(data => console.log(data))
                }

                addMovie(movies);
            })

            //TODO: Click event for each card
            document.querySelectorAll('card').forEach(function (card) {
                card.addEventListener('click', function () {

                    //TODO: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

                    //TODO: This adds title to right side of the page
                })
            })


        });
    })

}
onlineMovies();

