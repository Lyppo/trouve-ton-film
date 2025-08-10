let MON_TOKEN = "Non initialisé";
let connecté = false;

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

/* reinplémenter radial gradiant mais retravaillé pour téléphone */

async function retour() {

    element -= 1;

    if (element < 0) {
        if (page > 0) {
            page-=1;
            element = 19;
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: "Bearer " + MON_TOKEN
            }
        };

        let reponse;

        if (connecté) reponse = await fetch("https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=" + page, options);
        else reponse = await fetch("https://invite-api-tmdb.antodu72210.workers.dev/Popular?language=en-US&page=" + page, options);
        data = await reponse.json();
    }

    document.getElementById("affiche").src = "https://image.tmdb.org/t/p/original" + await data.results[element].poster_path;

    document.getElementById("arriere-plan-poster").style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + await data.results[element].backdrop_path + ")";

    document.getElementById("bouton-vus").textContent = page + " - " + element;
}

async function next() {

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

        let reponse;

        if (connecté) reponse = await fetch("https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=" + page, options);
        else reponse = await fetch("https://invite-api-tmdb.antodu72210.workers.dev/Popular?language=en-US&page=" + page, options);
        data = await reponse.json();
    }

    document.getElementById("affiche").src = "https://image.tmdb.org/t/p/original" + await data.results[element].poster_path;

    document.getElementById("arriere-plan-poster").style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + await data.results[element].backdrop_path + ")";
    document.getElementById("bouton-vus").textContent = page + " - " + element;
}