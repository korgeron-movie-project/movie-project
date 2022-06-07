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
        let movieCard = data.map((movie) => {
            return `
            <card>
                <h3>Title: ${movie.id}</h3>
            </card>`

        })
        document.querySelector('#movie-bar').innerHTML = movieCard.join('');
        console.log(movieCard);
    })
}
renderMovies();









