/*
//URLSearchParams 
function idProduct() {  
  const str = window.location.href;
  const url = new URL (str);
  const idpro = url.searchParams.get("id");
  return idpro;
};
*/

let urlparam = new URLSearchParams(window.location.search);
let idProduct = urlparam.get("id");

async function getArticle() {
  const articleCatch = await fetch("http://localhost:3000/api/products/" + idProduct); 
  if(articleCatch.ok){
    return await articleCatch.json();
  } else {
    console.error(articleCatch.statusText);
  } 
};


async function showArticle() {
  try {
    //On a un article qu'on récupère depuis l'api
    const article = await getArticle();

    let image = document.createElement("img");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");

    image.src = article.imageUrl;
    image.alt = article.altTxt;

    //On récupère la classe qui doit contenir l'image
    imageWrapper = document.querySelector(".item__img");
    //Maintenant on ajoute l'image qu'on vient de créer dans cette classe
    imageWrapper.appendChild(image);

    title.textContent = article.name;
    price.textContent = article.price;
    description.textContent = article.description;

    //Ajout des couleurs
    for (let color of article.colors) {
      let Option = document.createElement("option");
      document.getElementById("colors").appendChild(Option);
      Option.textContent = color;
    }
  } catch (e) {
    console.log(e);
  }


  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", (event) => {
    
    const selectQuantity = document.getElementById("quantity");
    const selectColors = document.getElementById("colors");

    if (selectQuantity.value >= 1 && selectQuantity.value <= 100 && selectColors.value != "") {
      let choiceColors = selectColors.value;
      let choiceQuantity = selectQuantity.value;

      let addArticle = {
        id: idProduct,
        title: title.textContent,
        quantity: selectQuantity.value,
        color: selectColors.value,
        image: getArticle,
        alt: getArticle,
        price: price.textContent,
      };
  
      /*const lienPageCart = (window.location.href = "cart.html");*/
  
      //recuperer un tableau de mon localstorage
      let productLocalStorage = JSON.parse(localStorage.getItem("product"));
  
      const addProductLocalStorage = () => {
  
        // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
        productLocalStorage.push(addArticle);
  
        // je stocke les données récupérées dans le localStorage :
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
      };
  
      let addConfirm = () => {
        alert("Le produit a bien été ajouté au panier");
      };
  
      let update = false;
  
      // s'il y a des produits enregistrés dans le localStorage
      if (productLocalStorage) {
        // verifier que le produit ne soit pas deja dans le localstorage/panier
        // avec la couleur
        productLocalStorage.forEach(function (productCheck, key) {
          if (productCheck.id == idProduct && productCheck.color == selectColors.value) {
            productLocalStorage[key].quantity =
              parseInt(productCheck.quantity) + parseInt(selectQuantity.value);
            localStorage.setItem(
              "product",
              JSON.stringify(productLocalStorage)
            );
            update = true;
            addConfirm();
          }
        });
  
        //
        if (!update) {
          addProductLocalStorage();
          addConfirm();
        }
      }
  
      // s'il n'y a aucun produit enregistré dans le localStorage
      else {
        // je crée alors un tableau avec les éléments choisi par l'utilisateur
        productLocalStorage = [];
        addProductLocalStorage();
        addConfirm();
      }
    }
      else {
        alert ("veuillez selectionner une couleur ainsi qu'une quantité");
      };
  })
};

  showArticle();

/*
Test a faire :
  - vérifié qu'une couleur est séléctionné
  - vérifié que la quantité est comprise entre 1 & 100

  - si le localstorage est vide -> rajouter le produit directement
  - si le localstorage n'est pas vide :
    - si un produit à le même id ET couleur -> incrémenter la quantité
    - si il n'y a pas de produit identique -> rajouter le produit a la liste

  - affichier une alert en cas d'erreur
  - afficher une alert en cas de succès
*/

