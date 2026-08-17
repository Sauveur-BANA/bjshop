const cartItemsContainer =
    document.getElementById("cart-items");

const cartContent =
    document.getElementById("cart-content");

const cartEmpty =
    document.getElementById("cart-empty");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");


function recupererPanier() {

    return JSON.parse(
        localStorage.getItem("panier")
    ) || [];

}


function enregistrerPanier(panier) {

    localStorage.setItem(
        "panier",
        JSON.stringify(panier)
    );

}


function formaterPrix(prix) {

    return prix.toLocaleString("fr-FR")
        + " F CFA";

}


function afficherPanier() {

    const panier = recupererPanier();

    cartItemsContainer.innerHTML = "";


    if (panier.length === 0) {

        cartEmpty.style.display = "flex";

        cartContent.style.display = "none";

        mettreAJourCompteur();

        return;

    }


    cartEmpty.style.display = "none";

    cartContent.style.display = "grid";


    panier.forEach((item, index) => {

        const sousTotal =
            item.prix * item.quantite;


        const taille =
            item.taille || "Non précisée";


        const couleur =
            item.couleur || "Non précisée";


        cartItemsContainer.innerHTML += `

            <article class="cart-item">

                <a
                    href="produit.html?id=${item.id}"
                    class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.nom}"
                    >

                </a>


                <div class="cart-item-info">

                    <div class="cart-item-top">

                        <div>

                            <p class="cart-item-category">
                                BJShop
                            </p>

                            <h3>
                                <a href="produit.html?id=${item.id}">
                                    ${item.nom}
                                </a>
                            </h3>

                        </div>


                        <button
                            class="remove-cart-item"
                            onclick="supprimerProduit(${index})"
                            aria-label="Supprimer">

                            <i class="fa-solid fa-xmark"></i>

                        </button>

                    </div>


                    <div class="cart-variations">

                        <span>
                            Taille :
                            <strong>${taille}</strong>
                        </span>

                        <span>
                            Couleur :
                            <strong>${couleur}</strong>
                        </span>

                    </div>


                    <div class="cart-item-bottom">

                        <div class="cart-quantity">

                            <button
                                onclick="diminuerQuantite(${index})">

                                -

                            </button>

                            <span>
                                ${item.quantite}
                            </span>

                            <button
                                onclick="augmenterQuantite(${index})">

                                +

                            </button>

                        </div>


                        <div class="cart-price-area">

                            <small>
                                ${formaterPrix(item.prix)}
                                / unité
                            </small>

                            <strong>
                                ${formaterPrix(sousTotal)}
                            </strong>

                        </div>

                    </div>

                </div>

            </article>

        `;

    });


    calculerTotal();

    mettreAJourCompteur();

}


function augmenterQuantite(index) {

    const panier = recupererPanier();

    panier[index].quantite++;

    enregistrerPanier(panier);

    afficherPanier();

}


function diminuerQuantite(index) {

    const panier = recupererPanier();


    if (panier[index].quantite > 1) {

        panier[index].quantite--;

    } else {

        panier.splice(index, 1);

    }


    enregistrerPanier(panier);

    afficherPanier();

}


function supprimerProduit(index) {

    const panier = recupererPanier();

    panier.splice(index, 1);

    enregistrerPanier(panier);

    afficherPanier();

}


function calculerTotal() {

    const panier = recupererPanier();


    const total = panier.reduce(
        (somme, item) =>
            somme + item.prix * item.quantite,
        0
    );


    subtotalElement.textContent =
        formaterPrix(total);


    totalElement.textContent =
        formaterPrix(total);

}


function mettreAJourCompteur() {

    const panier = recupererPanier();


    const totalArticles = panier.reduce(
        (somme, item) =>
            somme + item.quantite,
        0
    );


    const compteur =
        document.getElementById("cart-count");


    if (compteur) {

        compteur.textContent =
            totalArticles;

    }

}


document
.getElementById("clear-cart")
?.addEventListener("click", () => {

    const confirmation =
        confirm(
            "Voulez-vous vraiment vider votre panier ?"
        );


    if (!confirmation) return;


    localStorage.removeItem("panier");

    afficherPanier();

});


document
.getElementById("order-whatsapp")
?.addEventListener("click", () => {

    const panier = recupererPanier();

    if (panier.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    // INFORMATIONS CLIENT

    const nom =
        document.getElementById("client-nom").value.trim();

    const telephone =
        document.getElementById("client-telephone").value.trim();

    const ville =
        document.getElementById("client-ville").value.trim();

    const quartier =
        document.getElementById("client-quartier").value.trim();

    const indication =
        document.getElementById("client-indication").value.trim();


    // VERIFICATION

    if (!nom) {
        alert("Veuillez renseigner votre nom et prénom.");
        document.getElementById("client-nom").focus();
        return;
    }

    if (!telephone) {
        alert("Veuillez renseigner votre numéro de téléphone.");
        document.getElementById("client-telephone").focus();
        return;
    }

    if (!ville) {
        alert("Veuillez renseigner votre ville.");
        document.getElementById("client-ville").focus();
        return;
    }

    if (!quartier) {
        alert("Veuillez renseigner votre quartier ou adresse.");
        document.getElementById("client-quartier").focus();
        return;
    }


    // IMPORTANT :
    // METS ICI TON VRAI NUMERO WHATSAPP

    const numeroWhatsApp = "221787113820";


    let message = `
NOUVELLE COMMANDE - BJShop

-------------------------
INFORMATIONS CLIENT
-------------------------

Nom : ${nom}
Téléphone : ${telephone}
Ville : ${ville}
Quartier / Adresse : ${quartier}
Indication : ${indication || "Aucune"}

-------------------------
COMMANDE
-------------------------

`;


    panier.forEach((item, index) => {

        message += `
${index + 1}. ${item.nom}

Taille : ${item.taille || "Non précisée"}
Couleur : ${item.couleur || "Non précisée"}
Quantité : ${item.quantite}
Prix unitaire : ${formaterPrix(item.prix)}
Sous-total : ${formaterPrix(
    item.prix * item.quantite
)}

`;

    });


    const totalCommande =
        panier.reduce(
            (somme, item) =>
                somme + item.prix * item.quantite,
            0
        );


    message += `
-------------------------
TOTAL : ${formaterPrix(totalCommande)}
-------------------------

Adresse de livraison :
${quartier}, ${ville}

Merci de me confirmer la disponibilité
ainsi que les frais de livraison.
`;


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${
            encodeURIComponent(message)
        }`;


    window.open(url, "_blank");

});


const menuToggle =
    document.getElementById("menu-toggle");


const navbar =
    document.getElementById("navbar");


menuToggle?.addEventListener("click", () => {

    navbar.classList.toggle("show");

});


afficherPanier();