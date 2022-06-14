let body = document.querySelector('body');
body.style.visibility = 'hidden';
body.classList.add('loadScreen');


//TODO: BUTTON TO RELOAD THE PAGE
document.querySelector('#home').addEventListener('click', function () {
    document.location.reload();
})

//TODO: THIS IS FOR THE MAIN PAGE


const movieData = () => {
    return fetch("https://truthful-field-mice.glitch.me/movies").then(res => res.json())
}
console.log(movieData());
const renderMovies = () => {
    let click = 0;
    let i = 5;
    movieData().then((data) => {
        console.log(data);

        let movieCard = data.map((movie) => {
            console.log(movie);
            return `
            <card id="${movie.imdbID}">
                <img style="height: 100%; width: 100%;" src="${movie.Poster}" alt="failed to load">
            </card>
            `
        })

        //TODO: DELETE MOVIE FUNCTIONALITY
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

        document.querySelector('rightside').innerHTML+= `<button id="delete" style="height: 10%">DELETE</button> <input id="del" style="height: 8.75%" type="text" />`
        document.querySelector('#delete').addEventListener('click', function (){
            let movieDel = document.querySelector('#del');
            console.log(movieDel.value);
            deleteMovie(movieDel.value);
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

                if (i < movieCard.length) {
                    buttonR.style.display = 'flex';
                }
                if (movieCard.length >= 5) {
                    movieBar.firstElementChild.remove();
                    movieBar.innerHTML += movies[i - 1];
                }

            })

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
            })

            document.querySelector('body').style.visibility = 'visible';
            body.classList.remove('loadScreen');
        }
        fiveCards(movieCard);
    })
}
renderMovies();

//TODO: THIS IS FOR THE SEARCH MOVIE PORTION

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

                rightSide.innerHTML = `<img style="height: 280px; width: 100%" src="${data[0].Poster}" alt="failed to load" />
                                        <button id="addMovie" style="justify-self: end; text-align: center" type="button"> a<br>d <br>d</button>`
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

                document.querySelector('#addMovie').addEventListener('click', function (){
                    console.log(data[0].Title);
                    //TODO: ADD POST METHOD HERE
                    function addMovie(movie){
                        console.log(movie);
                       fetch("https://truthful-field-mice.glitch.me/movies", {
                            method: "POST",
                            body: JSON.stringify({
                                Title: movie[0].Title,
                                Poster: movie[0].Poster
                            }),
                           headers:{
                               'Content-Type': 'application/json'
                           }
                        }).then((res)=> res.json()).then(data => console.log(data))
                    }
                    addMovie(data);
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

                                fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => {
                                    console.log(alldata);
                                    rightSide.innerHTML = `<img style="height: 280px; width: 100%" src="${alldata.Poster}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center" type="button"> a<br>d <br>d</button>`
                                    document.querySelector('movieTitle').firstElementChild.innerHTML = alldata.Title;
                                    document.querySelector('.rating').innerHTML = 'Rated: ' + alldata.Rated;
                                    document.querySelector('.description').innerHTML = 'Description: ' + '<br>' + alldata.Plot;
                                    document.querySelector('.director').innerHTML = 'Director: ' + '<br>' + alldata.Director + '<br>' + '<br>' + 'Actors: ' + '<br>' + alldata.Actors;

                                    document.querySelector('#addMovie').addEventListener('click', function (){
                                        console.log(data[0].Title);
                                        //TODO: ADD POST METHOD HERE
                                        function addMovie(movie){
                                            console.log(movie);
                                            fetch("https://truthful-field-mice.glitch.me/movies", {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    Title: alldata.Title,
                                                    Poster: alldata.Poster
                                                }),
                                                headers:{
                                                    'Content-Type': 'application/json'
                                                }
                                            }).then((res)=> res.json()).then(data => console.log(data))
                                        }
                                        addMovie(data);
                                    })
                                })

                            })

                        })

                    })
                    const card = document.querySelector('card');
                    fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => {
                        console.log(alldata);
                        document.querySelector('.rating').innerHTML = 'Rated: ' + alldata.Rated
                        document.querySelector('.description').innerHTML = 'Description: ' + '<br>' + alldata.Plot;
                        document.querySelector('.director').innerHTML = 'Director: ' + '<br>' + alldata.Director + '<br>' + '<br>' + 'Actors: ' + '<br>' + alldata.Actors;
                    });


                    let buttonL = document.querySelector('buttonLeft');
                    buttonL.style.display = 'none';
                    buttonL.addEventListener('click', function () {
                        click--;
                        i--;
                        console.log(click);
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

                                fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => {
                                    console.log(alldata);
                                    rightSide.innerHTML = `<img style="height: 280px; width: 100%" src="${alldata.Poster}" alt="failed to load" /> <button id="addMovie" style="justify-self: end; text-align: center" type="button"> a<br>d <br>d</button>`
                                    document.querySelector('movieTitle').firstElementChild.innerHTML = alldata.Title;
                                    document.querySelector('.rating').innerHTML = 'Rated: ' + alldata.Rated;
                                    document.querySelector('.description').innerHTML = 'Description: ' + '<br>' + alldata.Plot;
                                    document.querySelector('.director').innerHTML = 'Director: ' + '<br>' + alldata.Director + '<br>' + '<br>' + 'Actors: ' + '<br>' + alldata.Actors;

                                    document.querySelector('#addMovie').addEventListener('click', function (){
                                        console.log(data[0].Title);
                                        //TODO: ADD POST METHOD HERE
                                        function addMovie(movie){
                                            console.log(movie);
                                            fetch("https://truthful-field-mice.glitch.me/movies", {
                                                method: "POST",
                                                body: JSON.stringify({
                                                    Title: alldata.Title,
                                                    Poster: alldata.Poster
                                                }),
                                                headers:{
                                                    'Content-Type': 'application/json'
                                                }
                                            }).then((res)=> res.json()).then(data => console.log(data))
                                        }
                                        addMovie(data);
                                    })
                                })

                            })
                        })

                    })
                    document.querySelectorAll('card').forEach(function (card) {
                        card.addEventListener('click', function () {

                            fetch(`http://www.omdbapi.com/?i=${card.id}&apikey=69918388`).then(res => res.json()).then(alldata => {
                                console.log(alldata);
                                rightSide.innerHTML = `<img style="height: 280px; width: 100%" src="${alldata.Poster}" alt="failed to load" />
                                <button id="addMovie" style="justify-self: end; text-align: center" type="button"> a<br>d <br>d</button>`
                                document.querySelector('movieTitle').firstElementChild.innerHTML = alldata.Title;
                                document.querySelector('.rating').innerHTML = 'Rated: ' + alldata.Rated;
                                document.querySelector('.description').innerHTML = 'Description: ' + '<br>' + alldata.Plot;
                                document.querySelector('.director').innerHTML = 'Director: ' + '<br>' + alldata.Director + '<br>' + '<br>' + 'Actors: ' + '<br>' + alldata.Actors;
                            })

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


