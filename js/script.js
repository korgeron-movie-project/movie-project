// fetch(URL)
//     .then(res => res.json())
//     .then((data) => console.log(data))
//     .catch((error) =>{console.error(error);
// });


const movieData = () => {
    return fetch(URL).then(res => res.json())
}
console.log(movieData());

const renderMovies = () => {
    let click = 0;
    console.log(click);
    let i = 5;
    movieData().then((data) => {
        let movieCard = data.map((movie) => {
            return `
            <card>
                <button id="edit" type="button" data-id="${movie.id}">Edit</button>
                <button id="Delete" type="button" data-id="${movie.id}">X</button>
                <h3>Title: ${movie.title++}</h3>
                <div>Director: ${movie.director}</div>
                <div>Ratings: ${movie.rating}</div>
                <div>Genre: ${movie.genre}</div>
            </card>`

        })

        let movieBar = document.querySelector('#movie-bar');
        console.log(movieCard);
        $("#edit").click(function (){
            $('.edit-form').toggleClass('hide')
        })
        $("#finalEdit").click(function (){
            $('.edit-form').toggleClass('hide')
        })
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

const editForm = () => {
    fetch(`${URL}/${id}`).then((res) => res.json).then((data) => {
        return `
        <form class="edit-form hide">
    <div class="container">
        <div class="title-container">
            <label for="title">Title </label>
            <input type="text" id="title" name="title">
        </div>
        <div class="description-container">
            <label for="description">Description </label>
            <input type="text" id="description" name="description">
        </div>
        <div class="director-container">
            <label for="director">Director: </label>
            <input type="text" id="director" name="director">
        </div>
        <button data-id="${movie.id}" id="finalEdit">Edit Movie</button>
    </div>
</form>
        
        
        

        
        `

    })
}

//Edit portion
const editMovie = (movie) => {
    const URL = "https://superb-cream-psychiatrist.glitch.me/movies/";
    let options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)

    }

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json())
}

$("#finalEdit").click(function(e){
    e.preventDefault()
    let titleInput = document.getElementById("title")
    let directorInput = document.getElementById("director")
    let description = document.getElementById("description")
    let editedMovie = {
        title : titleInput.value,
        director: directorInput.value,
        description: description.value

    }
    console.log(e.target.getAttribute("data-id"))
    editMovie(editedMovie).then((res) => {
        console.log(res)
        console.log("hello")
        renderMovies()
    })
})
//DELETE PORTION
const deleteMovie = (id) => {
    const URL = "https://superb-cream-psychiatrist.glitch.me/movies/";
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${URL}/${id}`, options)
        .then(() => console.log("The song has been deleted successfully"))
        .then(renderMovies)
}
//ADD PORTION
const addMovies = () =>{
    const URL = `https://superb-cream-psychiatrist.glitch.me/movies/`;
    let options = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        }
    }
    return fetch (`${URL}/${id}`, options)
        .then(() => console.log("The Movie was successfully added!"))
        .then(renderMovies)
}














