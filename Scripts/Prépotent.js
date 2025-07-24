let MON_TOKEN = "Non initialisé";

let page = 0;
let element = 20;

let data;

function aime() {
    console.log("J'aime ce film !");
    next();
}

function aime_pas() {
    console.log("Je n'aime pas ce film.");
    next();
}

async function next() {

    console.log("Film suivant...");

    element += 1;

    if (element > 19) {
        page+=1;
        element = 0;

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: "Bearer " + MON_TOKEN
            }
        };

        const reponse = await fetch("https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=" + page, options);
        data = await reponse.json();
    }

    document.getElementById("affiche").src = "https://image.tmdb.org/t/p/original" + data.results[element].poster_path;

    document.getElementById("arriere-plan-poster").style.backgroundImage = "radial-gradient(circle at center, #000a, #000f), url(https://image.tmdb.org/t/p/original" + data.results[element].backdrop_path + ")";
}