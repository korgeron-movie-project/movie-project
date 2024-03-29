/*TODO:
   1. Create "EDIT" button functionality to main page
   2. Style CSS for main page for "IF ARRAY LENGTH WAS 0"
   3. What happens if movie search doesnt exist?
   4. Move buttons to side of card and not in top data content
   5. "FIX" add button functionality (can only add first movie due to button refactors)
*/

//todo: This is needed in order to separate the online buttons from the main page buttons
let mainPage = true;

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
        console.log(mainPage);

        //todo: Fixes constant load if array of movies is 0
        if (mainMovieArr.length <= 0) {
            //todo:This loads in page for main page  (corresponds to the above load page functionality)
            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');

            //todo: CSS STYLING FOR PAGE IF NO MOVIES EXIST IN ARRAY
            document.querySelector('rightSide').style.background = 'lightgrey'
        }

        let moviebar = document.querySelector('movieBar > cardbox');

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
            leftSide.innerHTML = `<img style="background-size: initial;height: 280px; width: 80%; grid-area: movie-img" src="${mainMovieArr[0].Poster}" alt="${mainMovieArr[0].Title}" />`

            //todo: This adds title to right side on page load
            let title = document.querySelector('h1');
            title.innerHTML = `${mainMovieArr[0].Title}`;

            //todo: Create right side page data display
            document.querySelector('.rating').innerHTML = `Rated: ${mainMovieArr[0].Rated} <span style="padding-left: 3em">${mainMovieArr[0].Runtime}`;
            document.querySelector('.description').innerHTML = `${mainMovieArr[0].Plot}`;
            document.querySelector('.awards').innerHTML = `<br>${mainMovieArr[0].Awards} <br>Given ${mainMovieArr[0].imdbRating} / 10 stars`;
            document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${mainMovieArr[0].Director}<br> ${mainMovieArr[0].Actors}`;

            //todo: Adds cards on page load
            if (((i) + start) < end) {

                //todo: Sets values from Map() to card (values = id)
                map.forEach(function (value) {
                    values = value;
                })

                //todo: IMPORTANT! initiates card existence
                let r = `<card id="${values}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i) + change].Poster}"></card> <btnbox style="display: flex; visibility: hidden ;flex-direction: column""> <button id="deleteMovie" style="; text-align: center; height: 97px;" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style=" text-align: center; height: 97px;" type="button"> E<br>D<br>I<br>T </button> </btnBox>`
                moviebar.innerHTML += r;
                //todo:This loads in page for main page  (corresponds to the above load page functionality)
                document.querySelector('body').style.visibility = 'visible';
                body.classList.remove('loadScreen');

                //todo: button hover events
                document.querySelector('cardbox').addEventListener('mouseenter', function () {
                    document.querySelectorAll('btnbox').forEach((btn) => {
                        btn.style.visibility = 'visible';

                    })

                    document.querySelector('cardbox').addEventListener('mouseleave', function () {
                        document.querySelectorAll('btnbox').forEach((btn) => {
                            btn.style.visibility = 'hidden';
                        })
                    })
                })
            }
        })

        //todo: Stores buttons as variables
        let btnR = document.querySelector('buttonRight');
        let btnL = document.querySelector('buttonLeft');

        //todo: This is needed to hide left button on initial start
        if (start <= 0) {
            btnL.style.display = 'none';
        }

        //todo: This is the "UPDATED VERSION [06/27/22]" for delete functionality
        document.querySelectorAll('btnbox').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const deleteMovie = (id) => {
                    console.log(mainMovieArr[i])
                    const URL = "https://truthful-field-mice.glitch.me/movies";
                    let options = {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                }

                deleteMovie(mainMovieArr[i].id);

                setTimeout(function () {
                    document.location.reload();
                }, 300);
            })
        })

        //todo: Click event for each card
        document.querySelectorAll('card').forEach(function (card, i) {
            card.addEventListener('click', function () {

                //todo: Adding image to the left side of the page
                let leftSide = document.querySelector('rightside'); //do not change selector
                leftSide.innerHTML = `<img style="height: 280px; width: 80%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

                //todo: This adds title to right side of the page
                let title = document.querySelector('h1');
                title.innerHTML = `${mainMovieArr[i].Title}`;
                console.log(mainMovieArr[i]);

                //todo: Create right side page data display
                document.querySelector('.rating').innerHTML = `Rated: ${mainMovieArr[i].Rated} <span style="padding-left: 3em">${mainMovieArr[i].Runtime}`;
                document.querySelector('.description').innerHTML = `${mainMovieArr[i].Plot}`;
                document.querySelector('.awards').innerHTML = `<br>${mainMovieArr[i].Awards} <br>Given ${mainMovieArr[i].imdbRating} / 10 stars`;
                document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${mainMovieArr[i].Director}<br> ${mainMovieArr[i].Actors}`;
            })
        })

        //todo: Delete button functionality (NEEDS TO BE CALLED HERE FOR INITIAL PAGE LOAD)
        document.querySelectorAll('btnbox').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const deleteMovie = (id) => {
                    console.log(mainMovieArr[i])
                    const URL = "https://truthful-field-mice.glitch.me/movies";
                    let options = {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                }

                deleteMovie(mainMovieArr[i].id);

                setTimeout(function () {
                    document.location.reload();
                }, 300);
            })
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
            console.log(mainPage);
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
                    let r = `<card id="${mainMovieArr[(i + change)].id}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i + change)].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card> <btnbox style="display: flex; visibility: hidden ;flex-direction: column""> <button id="deleteMovie" style="; text-align: center; height: 97px;" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style=" text-align: center; height: 97px;" type="button"> E<br>D<br>I<br>T </button> </btnBox>`

                    moviebar.innerHTML += r;

                    //todo:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');

                    //todo: button hover events
                    document.querySelector('cardbox').addEventListener('mouseenter', function () {
                        document.querySelector('btnbox').style.visibility = 'visible';
                        document.querySelector('cardbox').addEventListener('mouseleave', function () {
                            document.querySelector('btnbox').style.visibility = 'hidden';
                        })
                    })
                }
            })

            //todo: Click event for each card
            document.querySelectorAll('card').forEach(function (card, i) {
                card.addEventListener('click', function () {

                    console.log(card.id);

                    //todo: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 80%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

                    //todo: This adds title to right side of the page
                    let title = document.querySelector('h1');
                    title.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //todo: Create right side page data display
                    document.querySelector('.rating').innerHTML = `Rated: ${mainMovieArr[(i + change)].Rated} <span style="padding-left: 3em">${mainMovieArr[(i + change)].Runtime}`;
                    document.querySelector('.description').innerHTML = `${mainMovieArr[(i + change)].Plot}`;
                    document.querySelector('.awards').innerHTML = `<br>${mainMovieArr[(i + change)].Awards} <br>Given ${mainMovieArr[(i + change)].imdbRating} / 10 stars`;
                    document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${mainMovieArr[(i + change)].Director}<br> ${mainMovieArr[(i + change)].Actors}`;

                    //todo: Delete button functionality
                    document.querySelectorAll('btnbox').forEach((btn, i) => {
                        btn.addEventListener('click', () => {
                            const deleteMovie = (id) => {
                                console.log(mainMovieArr[i])
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

            //todo: Delete button functionality
            document.querySelectorAll('btnbox').forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    const deleteMovie = (id) => {
                        console.log(mainMovieArr[i])
                        const URL = "https://truthful-field-mice.glitch.me/movies";
                        let options = {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                    }
                    deleteMovie(mainMovieArr[i + 1].id);

                    setTimeout(function () {
                        document.location.reload();
                    }, 300);
                })
            })
        })

        //todo: This adds the functionality to the left button
        btnL.addEventListener('click', () => {
            moviebar.innerHTML = '';
            --start;
            --end;
            --change;
            console.log(mainPage);
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
                    let r = `<card id="${mainMovieArr[(i + change)].id}"><img style="background-size: contain; height: 100%; width: 100%" src="${mainMovieArr[(i + change)].Poster}" alt="${mainMovieArr[(i) + change].Title}"></card> <btnbox style="display: flex; visibility: hidden ;flex-direction: column""> <button id="deleteMovie" style="; text-align: center; height: 97px;" type="button"> D<br>E<br>L<br>E<br>T<br>E </button> <button id="editMovie" style=" text-align: center; height: 97px;" type="button"> E<br>D<br>I<br>T </button> </btnBox>`

                    moviebar.innerHTML += r;

                    //todo:This loads in page for main page  (corresponds to the above load page functionality)
                    document.querySelector('body').style.visibility = 'visible';
                    body.classList.remove('loadScreen');

                    //todo: button hover events
                    document.querySelector('cardbox').addEventListener('mouseenter', function () {
                        document.querySelector('btnbox').style.visibility = 'visible';
                        document.querySelector('cardbox').addEventListener('mouseleave', function () {
                            document.querySelector('btnbox').style.visibility = 'hidden';
                        })
                    })
                }
            })

            //todo: Click event for each card
            document.querySelectorAll('card').forEach(function (card, i) {
                card.addEventListener('click', function () {
                    console.log(card);

                    //todo: Adding image to the left side of the page
                    let leftSide = document.querySelector('rightside'); //do not change selector
                    leftSide.innerHTML = `<img style="height: 280px; width: 80%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

                    //todo: This adds title to right side of the page
                    let title = document.querySelector('h1');
                    title.innerHTML = `${card.firstElementChild.attributes[2].nodeValue}`;

                    //todo: Create right side page data display
                    document.querySelector('.rating').innerHTML = `Rated: ${mainMovieArr[(i + change)].Rated} <span style="padding-left: 3em">${mainMovieArr[(i + change)].Runtime}`;
                    document.querySelector('.description').innerHTML = `${mainMovieArr[(i + change)].Plot}`;
                    document.querySelector('.awards').innerHTML = `<br>${mainMovieArr[(i + change)].Awards} <br>Given ${mainMovieArr[(i + change)].imdbRating} / 10 stars`;
                    document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${mainMovieArr[(i + change)].Director}<br> ${mainMovieArr[(i + change)].Actors}`;

                    //todo: Delete button functionality
                    document.querySelectorAll('btnbox').forEach((btn, i) => {
                        btn.addEventListener('click', () => {
                            const deleteMovie = (id) => {
                                console.log(mainMovieArr[i])
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

            //todo: Delete button functionality
            document.querySelectorAll('btnbox').forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    const deleteMovie = (id) => {
                        console.log(mainMovieArr[i])
                        const URL = "https://truthful-field-mice.glitch.me/movies";
                        let options = {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        return fetch(`${URL}/${id}`, options).then(() => console.log("DELETE SUCCESS!"))
                    }
                    deleteMovie(mainMovieArr[i].id);

                    setTimeout(function () {
                        document.location.reload();
                    }, 300);
                })
            })
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
        mainPage = false;

        //todo: Page loading for main screen
        let body = document.querySelector('body');
        body.style.visibility = 'hidden';
        body.classList.add('loadScreen');

        //todo: Establishing the online search
        fetch(`http://www.omdbapi.com/?s=${search.value}&page=1&type=movie&apikey=69918388`).then(res => res.json()).then(data => {

            //todo: Results from search bar
            let movies = data.Search;
            let moviebar = document.querySelector('movieBar > cardbox');
            moviebar.innerHTML = '';
            console.log(movies);

            //todo: Adding image to the left side of the page
            let leftSide = document.querySelector('rightside'); //do not change selector
            leftSide.innerHTML = `<img style="height: 280px; width: 80%; grid-area: movie-img" src="${movies[0].Poster}" alt="failed to load" />`

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
                    let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> <button id="addMovie" style="justify-self: end; text-align: center; " type="button"> A<br>D<br>D</button> `
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
                    document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${allData.Director}<br> ${allData.Actors}`;

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
                    leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

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
                            document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${allData.Director}<br> ${allData.Actors}`;

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
                    getAllData(movies[i].imdbID);
                })
            })

            //todo: Right button click event
            btnR.addEventListener('click', () => {
                moviebar.innerHTML = '';
                ++start;
                ++end;
                ++change;

                if (mainPage === false) {
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
                }

                movies.forEach((movie, i) => {
                    if (((i) + start) < end) {
                        let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> <button id="addMovie" style="justify-self: end; text-align: center; " type="button"> A<br>D<br>D</button> `

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
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

                        //todo: This adds title to right side of the page
                        movieTitle.innerHTML = movies[(i + change)].Title;

                        //todo: Grabs all data from movie title
                        const getAllData = (title) => {
                            console.log(title);
                            fetch(`http://www.omdbapi.com/?i=${title}&apikey=69918388`).then(res => res.json()).then(allData => {
                                console.log(allData);

                                //todo: Create right side page data display
                                document.querySelector('.rating').innerHTML = `Rated: ${allData.Rated} <span style="padding-left: 3em">${allData.Runtime}`;
                                document.querySelector('.description').innerHTML = `${allData.Plot}`;
                                document.querySelector('.awards').innerHTML = `${allData.Awards} <br>Given ${allData.imdbRating} / 10 stars`;
                                document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${allData.Director}<br> ${allData.Actors}`;

                                //todo: This adds movies to the main page
                                document.querySelector('#addMovie').addEventListener('click', function () {
                                    function addMovie(movie) {
                                        console.log(movie);
                                        fetch("https://truthful-field-mice.glitch.me/movies", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                Title: movie[(i + change)].Title,
                                                Poster: movie[(i + change)].Poster,
                                                imdbID: movie[(i + change)].imdbID,
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
                        getAllData(movies[(i + change)].imdbID);
                    })
                })
            })

            //todo: This adds the functionality to the left button
            btnL.addEventListener('click', () => {
                moviebar.innerHTML = '';
                --start;
                --end;
                --change;

                if (mainPage === false) {
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
                }

                movies.forEach((movie, i) => {
                    if (((i) + start) < end) {
                        let r = `<card><img style="background-size: contain; height: 100%; width: 100%" src="${movies[(i) + change].Poster}"></card> <button id="addMovie" style="justify-self: end; text-align: center; " type="button"> A<br>D<br>D</button> `

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
                        leftSide.innerHTML = `<img style="height: 280px; width: 100%; grid-area: movie-img" src="${card.firstElementChild.attributes[1].value}" alt="failed to load" />`

                        //todo: This adds title to right side of the page
                        movieTitle.innerHTML = movies[(i + change)].Title;

                        //todo: Grabs all data from movie title
                        const getAllData = (title) => {
                            console.log(title);
                            fetch(`http://www.omdbapi.com/?i=${title}&apikey=69918388`).then(res => res.json()).then(allData => {
                                console.log(allData);

                                //todo: Create right side page data display
                                document.querySelector('.rating').innerHTML = `Rated: ${allData.Rated} <span style="padding-left: 3em">${allData.Runtime}`;
                                document.querySelector('.description').innerHTML = `${allData.Plot}`;
                                document.querySelector('.awards').innerHTML = `${allData.Awards} <br>Given ${allData.imdbRating} / 10 stars`;
                                document.querySelector('.director').innerHTML = `<br>Director / Actors:<br>${allData.Director}<br> ${allData.Actors}`;

                                //todo: This adds movies to the main page
                                document.querySelector('#addMovie').addEventListener('click', function () {
                                    function addMovie(movie) {
                                        console.log(movie);
                                        fetch("https://truthful-field-mice.glitch.me/movies", {
                                            method: "POST",
                                            body: JSON.stringify({
                                                Title: movie[(i + change)].Title,
                                                Poster: movie[(i + change)].Poster,
                                                imdbID: movie[(i + change)].imdbID,
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
                        getAllData(movies[(i + change)].imdbID);
                    })
                })
            })
        });
    })
}
onlineMovies();

