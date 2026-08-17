const listeProduits =
    document.getElementById("liste-produits");

const productCount =
    document.getElementById("product-count");


let produitsAffiches =
    [...produits];


/* =====================================
   AFFICHAGE DES PRODUITS
===================================== */

function afficherProduits(liste) {

    listeProduits.innerHTML = "";

    productCount.textContent =
        liste.length;


    liste.forEach(produit => {

        listeProduits.innerHTML += `

            <article class="product-card">

                <a
                    href="produit.html?id=${produit.id}"
                    class="product-image product-real-image">

                    <img
                        src="${produit.image}"
                        alt="${produit.nom}"
                        class="catalogue-image"
                    >

                    ${
                        produit.stock <= 3
                        ? '<span class="product-badge">Stock limité</span>'
                        : ''
                    }

                </a>


                <div class="product-info">

                    <p class="product-category">
                        ${produit.categorie}
                    </p>

                    <h3>

                        <a href="produit.html?id=${produit.id}">
                            ${produit.nom}
                        </a>

                    </h3>


                    <div class="product-bottom">

                        <span class="price">
                            ${formaterPrix(produit.prix)}
                        </span>


                        <a
                            href="produit.html?id=${produit.id}"
                            class="add-cart-btn">

                            <i class="fa-solid fa-arrow-right"></i>

                        </a>

                    </div>

                </div>

            </article>

        `;

    });

}


/* =====================================
   FORMAT PRIX
===================================== */

function formaterPrix(prix) {

    return prix.toLocaleString("fr-FR")
        + " F CFA";

}


/* =====================================
   FILTRE CATEGORIE
===================================== */

document
.querySelectorAll(".filter-btn")
.forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelectorAll(".filter-btn")
        .forEach(b =>
            b.classList.remove("active")
        );


        btn.classList.add("active");


        const categorie =
            btn.dataset.category;


        if (categorie === "tous") {

            produitsAffiches =
                [...produits];

        } else {

            produitsAffiches =
                produits.filter(
                    produit =>
                        produit.categorie === categorie
                );

        }


        afficherProduits(
            produitsAffiches
        );

    });

});


/* =====================================
   TRI + HOMME / FEMME
===================================== */

const triProduits =
    document.getElementById("tri-produits");


if (triProduits) {

    triProduits.addEventListener(
        "change",
        function () {

            let liste =
                [...produitsAffiches];


            /* HOMME */

            if (this.value === "homme") {

                liste =
                    liste.filter(
                        produit =>
                            produit.genre === "homme"
                    );

            }


            /* FEMME */

            else if (this.value === "femme") {

                liste =
                    liste.filter(
                        produit =>
                            produit.genre === "femme"
                    );

            }


            /* PRIX CROISSANT */

            else if (
                this.value === "prix-croissant"
            ) {

                liste.sort(
                    (a, b) =>
                        a.prix - b.prix
                );

            }


            /* PRIX DECROISSANT */

            else if (
                this.value === "prix-decroissant"
            ) {

                liste.sort(
                    (a, b) =>
                        b.prix - a.prix
                );

            }


            /* NOM */

            else if (
                this.value === "nom"
            ) {

                liste.sort(
                    (a, b) =>
                        a.nom.localeCompare(
                            b.nom
                        )
                );

            }


            afficherProduits(liste);

        }
    );

}


/* =====================================
   AFFICHAGE INITIAL
===================================== */

afficherProduits(produits);