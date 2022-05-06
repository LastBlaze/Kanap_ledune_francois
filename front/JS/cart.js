//Récupéré les produits stockés dans le localstorage
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

async function getProduct(id) {
    let product = await fetch("http://localhost:3000/api/products/"+id)
    if(product.ok){
        return product.json();
    } else {
        console.error(product.statusText)
      }  
}

async function showProduct () {
try{
    let productsInCart = JSON.parse(localStorage.getItem("product"))
    await productsInCart.forEach(productInCart=> {
        const productInApi = await getProduct(productInCart.id);
    })
    
    productsInCart.forEach(productLocalStorage => {

    //Afficher les produit du panier

    //Inserer l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector(".cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    /*productArticle.setAttribute["data-id", productLocalStorage[product].idProduit];*/

    //Inserer l'élément "div"
    
    let productDivImg = document.createElement("div")
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = productLocalStorage.imageUrl;
    productImg.alt = productLocalStorage.altTxt;

    //Inséré l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    //Inséré l'élément"div"
    let productItemContentDescription = document.createElement("div");
    productItemContent.appendChild(productItemContentDescription);
    productItemContentDescription.className = "cart__item__content__description";

    //Inséré le titre h2
    let productTitle = document.createElement("h2");
    productItemContentDescription.appendChild(productTitle);
    productTitle.textContent = productLocalStorage.name;

    //Inséré la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.textContent = productLocalStorage.colors;

    //Inséré le prix
    let productPrice = document.createElement("p");
    productColor.appendChild(productPrice);
    productPrice = productLocalStorage.price +"€";

    //Inséré l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    //Inséré l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    //Inséré l'élément "quantité"
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.textContent = productLocalStorage.quantity;

    //Inséré la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productquantity);
    productQuantity.className = "itemQuantity";
    productQuantity.value = productLocalStorage.quantity;
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    //INSERER L'ELEMENT 'DIV'
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
    "cartitemcontentsettingsdelete";

    //INSERER L'ELEMENT  'P' SUPPRIMER
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.textContent = "Supprimer";
    
    })
}
 catch (e) {
    console.log(e);
  }
};

showProduct ();

function totalQuantityPrices() {
    //Afficher la quantité des produits
    let kanapQuantity = 0;
    for (let i = 0; i <listOfQuantity.length; i++) {
        kanapQuantity += parseInt(listOfQuantity[i].value);
    }
    totalQuantity.textContent = kanapQuantity;

    //Afficher le prix des produits
    let listOfPrices = document.querySelector(".cart__item__content__description");
    let kanapPrice = 0;
    for (let i = O; i < listOfPrices.lenght; i++) {
        kanapPrice += parseInt(listOfPrices[i].textContent) * listOfQuantity.value;
    }
    totalPrice.textContent = kanapPrice;
}

/*
//Changement de la quantité directement dans le panier
for (let input of listOfQuantity) {
    input.addEventListener('change' function () {
        totalPrice + totalQuantity ();
        input.dataset.value = input.value;
    })
}*/