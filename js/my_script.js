/*TODO:
   1. Add right side of page to start up / online pages
        a. needs "description"
        b. needs "rating"
        c. needs "author"
   2. Create "EDIT" button functionality to main page
   3. Style CSS for main page for "IF ARRAY LENGTH WAS 0"
   4. What happens if movie search doesnt exist?
   5. fix issue with too long of a movie description...
   6. mess around with border style of card based on index % 2 === 0
*/

//todo: Page loading for main screen
let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');

//todo: BUTTON TO RELOAD THE PAGE
document.querySelector('#home').addEventListener('click', function () {
    document.location.reload();
})

//todo: Fetch data from glitch remix
const mainPageMovieData = () => {
    return fetch("https://truthful-field-mice.glitch.me/movies").then(res => res.json())
}

let mainData = mainPageMovieData().then(data => data);

//todo: Main page data
const loadMainPageMovieData = (data) => {
    data.then(mainMovieArr => {
        console.log(mainMovieArr);
        let map = new Map();
        let values;

        //todo: This is needed in order to separate the online buttons from the main page buttons
        let mainPage = true;

        //todo: Fixes constant load if array of movies is 0
        if (mainMovieArr.length <= 0) {
            //todo:This loads in page for main page  (corresponds to the above load page functionality)
            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');

            //todo: CSS STYLING FOR PAGE IF NO MOVIES EXIST IN ARRAY
            document.querySelector('rightSide').style.background = 'lightgrey'

        }

        let moviebar = document.querySelector('movieBar');

        //todo: This is the data to change in order to change the poster data for the cards on button clicks
        let start = 0;
        let end = 5;
        let change = 0;

        //todo: This creates the 5 cards
        mainMovieArr.forEach((movie, i) => {

            //todo: Testing Map() over array
            map.set(mainMovieArr[i].Title, mainMovieArr[i].id);

            //todo: This adds left side image on page load
            let leftSide = document.querySelector('rightside'); //do not change selector
            leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${mainMovieArr[0].Poster}" alt="${mainMovieArr[0].Title}" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

            //todo: This adds title to right side on page load
            let title = document.querySelector('h1');
            title.innerHTML = `${mainMovieArr[0].Title}`;

            //todo: Create right side page data display
            document.querySelector('.rating').innerHTML = `Rated: ${mainMovieArr[0].Rated} <span style="padding-left: 3em">${mainMovieArr[0].Runtime}`;
            document.querySelector('.description').innerHTML = `${mainMovieArr[0].Plot}`;
            document.querySelector('.awards').innerHTML = `${mainMovieArr[0].Awards} <br>Given ${mainMovieArr[0].imdbRating} / 10 stars`;
            document.querySelector('.director').innerHTML = `<br>Director:<br>${mainMovieArr[0].Director}`;
            document.querySelector('.actors').innerHTML = `<br>Actors:<br>${mainMovieArr[0].Actors}`;

            //todo: Adds cards on page load
            if (((i) + start) < end) {

                //todo: Sets values from Map() to card (values = id)

                map.forEach(function (value) {
                    values = value;
                })
                //todo: IMPORTANT! initiates card existence
                let r = `<card id="${values}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card>`
                moviebar.innerHTML += r;
                //todo:This loads in page for main page  (corresponds to the above load page functionality)
                document.querySelector('body').style.visibility = 'visible';
                body.classList.remove('loadScreen');
            }
        })

        let btnR = document.querySelector('buttonRight');
        let btnL = document.querySelector('buttonLeft');

        //todo: This is needed to hide left button on initial start
        if (start <= 0) {
            btnL.style.display = 'none';
        }

        //todo: Sets every other card to inset border

        // let cardsRef = document.querySelectorAll('card');
        // cardsRef.forEach(function (card, i){
        //     if (cardsRef.length % 2 === 0){
        //card.style.border = 'green outset thick';
        // }
        // })




        //todo: Click event for each card
        document.querySelectorAll('card').forEach(function (card, i) {
            card.addEventListener('click', function () {

                console.log(card);


                //todo: Adding image to the left side of the page
                let leftSide = document.querySelector('rightside'); //do not change selector
                leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                //todo: This adds title to right side of the page
                let title = document.querySelector('h1');
                title.innerHTML = `${mainMovieArr[(i)].Title}`;

                //todo: Delete button functionality
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

                    //todo: Page reload to update card data
                    setTimeout(function () {
                        document.location.reload();
                    }, 300);
                })
            })
        })

        //todo: Delete button functionality (NEEDS TO BE CALLED HERE FOR INITIAL PAGE LOAD)
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

        //todo: Hides right button if array is less than or equal to 5
        if (mainMovieArr.length <= 5) {
            btnR.style.display = 'none';
        }

        //todo: Right button click event
        btnR.addEventListener('click', () => {
            moviebar.innerHTML = '';
            ++start;
            ++end;
            ++change;
            if (mainPage === true) {
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
            }


            mainMovieArr.forEach((movie, i) => {

                if (((i) + start) < end) {

                    //todo: Sets correct id / Poster on card for delete method
                    let r = `<card id="${mainMovieArr[(i + change)].id}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i + change)].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card>`

                    moviebar.innerHTML += r;

                    //todo:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            })

            //todo: Click event for each card
            document.querySelectorAll('card').forEach(function (card, i) {
                card.addEventListener('click', function () {

                    console.log(card);

                    //todo: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                    //todo: This adds title to right side of the page
                    let title = document.querySelector('h1');
                    title.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //todo: Delete button functionality
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

        //todo: This adds the functionality to the left button
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
                    let r = `<card id="${mainMovieArr[(i + change)].id}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i + change)].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card>`

                    moviebar.innerHTML += r;

                    //todo:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            })

            //todo: Click event for each card
            document.querySelectorAll('card').forEach(function (card) {
                card.addEventListener('click', function () {
                    console.log(card);

                    // console.log(card.firstElementChild.attributes[1].value);

                    //todo: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="deleteMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: delete" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style="justify-self: end; text-align: center; height: 140px; width: 90%; grid-area: edit" type="button"> E<br>D<br>I<br>T </button>`

                    //todo: This adds title to right side of the page
                    let title = document.querySelector('h1');
                    title.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //todo: Delete button functionality
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
            mainPage = false;
        })
        return moviebar;
    })
}
loadMainPageMovieData(mainData);

// ----------------------------------------------------------------- //

//todo: Online movie search data
const onlineMovies = () => {
    let search = document.querySelector('#search-bar');

    //todo: This adds click event to search for online movies to add to current page
    document.querySelector('#search-button').addEventListener('click', () => {
        console.log(search.value);

        //todo: Page loading for main screen
        let body = document.querySelector('body');
        body.style.visibility = 'hidden';
        body.classList.add('loadScreen');

        //todo: Establishing the online search
        fetch(`http://www.omdbapi.com/?s=${search.value}&page=1&type=movie&apikey=69918388`).then(res => res.json()).then(data => {

            //todo: Results from search bar
            let movies = data.Search;
            let moviebar = document.querySelector('movieBar');
            moviebar.innerHTML = '';
            console.log(movies);

            //todo: Adding image to the left side of the page
            let leftSide = document.querySelector('rightside'); //do not change selector
            leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${movies[0].Poster}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

            //todo: Add title to the right side of the page
            let movieTitle = document.querySelector('h1');
            movieTitle.innerHTML = movies[0].Title;

            //todo: This is the data to change in order to change the poster data for the cards on button clicks
            let start = 0;
            let end = 5;
            let change = 0;

            //todo: 5 cards for online search
            movies.forEach((movie, i) => {
                if (((i) + start) < end) {
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> `
                    moviebar.innerHTML += r;
                    //TODO:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');
                }
            });

            //todo:This loads in page for main page  (corresponds to the above load page functionality)
            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');

            let btnR = document.querySelector('buttonRight');
            let btnL = document.querySelector('buttonLeft');

            //todo: This is needed to hide left button on initial start
            if (start <= 0) {
                btnL.style.display = 'none';
            }

            //todo: Grabs all data from movie title
            const getAllData = (title) => {
                console.log(title);
                fetch(`http://www.omdbapi.com/?i=${title}&apikey=69918388`).then(res => res.json()).then(allData => {
                    console.log(allData);

                    //todo: Create right side page data display
                    document.querySelector('.rating').innerHTML = `Rated: ${allData.Rated} <span style="padding-left: 3em">${allData.Runtime}`;
                    document.querySelector('.description').innerHTML = `${allData.Plot}`;
                    document.querySelector('.awards').innerHTML = `${allData.Awards} <br>Given ${allData.imdbRating} / 10 stars`;
                    document.querySelector('.director').innerHTML = `<br>Director:<br>${allData.Director}`;
                    document.querySelector('.actors').innerHTML = `<br>Actors:<br>${allData.Actors}`;

                    //todo: This adds movies to the main page
                    document.querySelector('#addMovie').addEventListener('click', function () {
                        function addMovie(movie) {
                            console.log(movie);
                            fetch("https://truthful-field-mice.glitch.me/movies", {
                                method: "POST",
                                body: JSON.stringify({
                                    Title: movie[0].Title,
                                    Poster: movie[0].Poster,
                                    imdbID: movie[0].imdbID,
                                    Plot: allData.Plot,
                                    Rated: allData.Rated,
                                    Awards: allData.Awards,
                                    imdbRating: allData.imdbRating,
                                    Director: allData.Director,
                                    Actors: allData.Actors,
                                    Runtime: allData.Runtime
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then((res) => res.json()).then(data => console.log(data))
                        }
                        addMovie(movies);
                    })
                });
            }
            getAllData(movies[0].imdbID);

            //todo: Click event for each card
            document.querySelectorAll('card').forEach(function (card, i) {
                card.addEventListener('click', function () {
                    console.log(movies);

                    //todo: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

                    //todo: This adds title to right side of the page
                    movieTitle.innerHTML = movies[i].Title;

                    //todo: Grabs all data from movie title
                    const getAllData = (title) => {
                        console.log(title);
                        fetch(`http://www.omdbapi.com/?i=${title.imdbID}&apikey=69918388`).then(res => res.json()).then(allData => {
                            console.log(allData);

                            //TODO: trying to get the length of the description for if() statement
                            console.log(allData.Plot.length);

                            //todo: Create right side page data display
                            document.querySelector('.rating').innerHTML = `Rated: ${allData.Rated} <span style="padding-left: 3em">${allData.Runtime}`;
                            document.querySelector('.description').innerHTML = `${allData.Plot}`;
                            document.querySelector('.awards').innerHTML = `${allData.Awards} <br>Given ${allData.imdbRating} / 10 stars`;
                            document.querySelector('.director').innerHTML = `<br>Director:<br>${allData.Director}`;
                            document.querySelector('.actors').innerHTML = `<br>Actors:<br>${allData.Actors}`;

                            //todo: This adds movies to the main page (for each card on page load)
                            document.querySelector('#addMovie').addEventListener('click', function () {
                                function addMovie(movie) {
                                    console.log(movie);
                                    fetch("https://truthful-field-mice.glitch.me/movies", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            Title: movie[i].Title,
                                            Poster: movie[i].Poster,
                                            imdbID: movie[i].imdbID,
                                            Plot: allData.Plot,
                                            Rated: allData.Rated,
                                            Awards: allData.Awards,
                                            imdbRating: allData.imdbRating,
                                            Director: allData.Director,
                                            Actors: allData.Actors,
                                            Runtime: allData.Runtime
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then((res) => res.json()).then(data => console.log(data))
                                }
                                addMovie(movies);
                            })
                        });
                    }
                    getAllData(movies[i]);
                })
            })



            //todo: Right button click event
            btnR.addEventListener('click', () => {
                moviebar.innerHTML = '';
                ++start;
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
                        //todo:This loads in page for main page  (corresponds to the above load page functionality)
                        document.querySelector('body').style.visibility = 'visible';
                        body.classList.remove('loadScreen');
                    }
                })

                //todo: Click event for each card
                document.querySelectorAll('card').forEach(function (card, i) {
                    card.addEventListener('click', function () {

                        //todo: Adding image to the left side of the page
                        let leftSide = document.querySelector('rightside'); //do not change selector
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D</button>`

                        //todo: This adds title to right side of the page
                        movieTitle.innerHTML = movies[(i + change)].Title;

                        //todo: This adds movies to the main page
                        document.querySelector('#addMovie').addEventListener('click', function () {
                            function addMovie(movie) {
                                console.log(movie);
                                fetch("https://truthful-field-mice.glitch.me/movies", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        Title: movie[(i + change)].Title,
                                        Poster: movie[(i + change)].Poster,
                                        imdbID: movie[(i + change)].imdbID
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

            //todo: This adds the functionality to the left button
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

                        //todo:This loads in page for main page  (corresponds to the above load page functionality)
                        document.querySelector('body').style.visibility = 'visible';
                        body.classList.remove('loadScreen');
                    }
                })

                //todo: Click event for each card
                document.querySelectorAll('card').forEach(function (card, i) {
                    card.addEventListener('click', function () {

                        //todo: Adding image to the left side of the page
                        let leftSide = document.querySelector('rightside'); //do not change selector
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center; width: 90%" type="button"> A<br>D<br>D </button>`

                        //todo: This adds title to right side of the page
                        movieTitle.innerHTML = movies[(i + change)].Title;

                        //todo: This adds movies to the main page
                        document.querySelector('#addMovie').addEventListener('click', function () {
                            function addMovie(movie) {
                                console.log(movie);
                                fetch("https://truthful-field-mice.glitch.me/movies", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        Title: movie[(i + change)].Title,
                                        Poster: movie[(i + change)].Poster,
                                        imdbID: movie[(i + change)].imdbID
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
        });
    })
}
onlineMovies();

