/* =====================================
   CHARGEMENT HEADER / FOOTER
===================================== */

async function chargerComposant(id, fichier) {

    const emplacement =
        document.getElementById(id);

    if (!emplacement) {
        return;
    }

    try {

        const reponse = await fetch(fichier);

        if (!reponse.ok) {
            throw new Error(
                `Impossible de charger ${fichier}`
            );
        }

        const contenu =
            await reponse.text();

        emplacement.innerHTML = contenu;

    } catch (erreur) {

        console.error(erreur);

    }

}


/* =====================================
   INITIALISATION DU HEADER
===================================== */

function initialiserHeader() {

    const menuToggle =
        document.getElementById("menu-toggle");

    const navbar =
        document.getElementById("navbar");


    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("show");

        });

    }


    mettreAJourCompteurPanier();

    activerLienPage();

}


/* =====================================
   COMPTEUR PANIER
===================================== */

function mettreAJourCompteurPanier() {

    const compteur =
        document.getElementById("cart-count");

    if (!compteur) {
        return;
    }


    const panier =
        JSON.parse(
            localStorage.getItem("panier")
        ) || [];


    const total =
        panier.reduce(
            (somme, item) =>
                somme + Number(item.quantite || 0),
            0
        );


    compteur.textContent = total;

}


/* =====================================
   LIEN ACTIF DU MENU
===================================== */

function activerLienPage() {

    let page =
        window.location.pathname
        .split("/")
        .pop();


    if (!page) {
        page = "index.html";
    }


    document
        .querySelectorAll("#navbar a")
        .forEach(lien => {

            const href =
                lien.getAttribute("href");

            lien.classList.remove("active");


            if (href === page) {

                lien.classList.add("active");

            }

        });

}


/* =====================================
   INITIALISATION DU FOOTER
===================================== */

function initialiserFooter() {

    const annee =
        document.getElementById("current-year");

    if (annee) {

        annee.textContent =
            new Date().getFullYear();

    }

}


/* =====================================
   CHARGEMENT GENERAL
===================================== */

async function chargerLayout() {

    await chargerComposant(
        "header-container",
        "header.html"
    );

    initialiserHeader();


    await chargerComposant(
        "footer-container",
        "footer.html"
    );

    initialiserFooter();

}


document.addEventListener(
    "DOMContentLoaded",
    chargerLayout
);