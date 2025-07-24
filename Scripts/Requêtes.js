async function début() {

    if (document.cookie.includes("mon_token")) {
        const mon_token = decodeURIComponent(
            document.cookie
                .split('; ')
                .find(c => c.startsWith('mon_token'))
                .split('=')[1]
        );

        MON_TOKEN = mon_token;
    }
    else if (document.cookie.includes("demande_de_jeton")) {
        const demande_de_jeton = decodeURIComponent(
            document.cookie
                .split('; ')
                .find(c => c.startsWith('demande_de_jeton'))
                .split('=')[1]
        );

        const response = await fetch("https://connexion-api-tmdb.antodu72210.workers.dev/demande_de_jeton", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ demande_de_jeton: demande_de_jeton })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Token d'acces reçu :", data.access_token);
            document.cookie = "mon_token=" + data.access_token + "; path=/; max-age=24000000; SameSite=Lax";
            document.cookie = "demande_de_jeton=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            MON_TOKEN = data.access_token;
        }
        else {
            console.error("Erreur " + response.status + " : " + await response.text());
        }
    }
    else {
        window.location.replace("/trouve-ton-film/connexion.html");
    }
}

début();

next();