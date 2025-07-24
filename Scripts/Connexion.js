async function connexion() {

    if (document.cookie.includes("mon_token")) {
        window.location.href = "/";
        return;
    }

    if (document.cookie.includes("demande_de_jeton")) {
        const token = decodeURIComponent(
            document.cookie
                .split('; ')
                .find(c => c.startsWith('demande_de_jeton'))
                .split('=')[1]
        );
        window.location.href = "https://www.themoviedb.org/auth/access?request_token=" + token;
        return;
    }

    const response = await fetch("https://connexion-api-tmdb.antodu72210.workers.dev/demande_de_jeton/index.html", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        const data = await response.json();

        document.cookie = "demande_de_jeton=" + data.demande_de_jeton + "; path=/; max-age=900; SameSite=Lax";

        window.location.href = "https://www.themoviedb.org/auth/access?request_token=" + data.demande_de_jeton;
    }
    else {
        console.error("Erreur " + response.status + " : " + await response.text());
    }
}