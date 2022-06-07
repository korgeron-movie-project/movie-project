// fetch(URL)
//     .then(res => res.json())
//     .then((data) => console.log(data))
//     .catch((error) =>{console.error(error);
// });


const movieData = () => {
    return fetch(URL).then(res => res.json());
}
console.log(movieData());

const renderMovies = () => {
    movieData().then((data) => {
        let movieCard = data.filter((_, idx) => idx < 5).map((movie) => {
            return `
            <card>
                <button id="edit" type="button" data-id="${movie.id}">Edit</button>
                <button id="Delete" type="button" data-id="${movie.id}">X</button>
                <h3>Title: ${movie.title++}</h3>
            </card>`

        })

        document.querySelector('#movie-bar').innerHTML = movieCard.join('');
        console.log(movieCard);
        $("#edit").click(function (){
            $('.edit-form').toggleClass('hide')
        })
    })

}
renderMovies();

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













