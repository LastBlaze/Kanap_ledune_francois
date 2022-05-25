//Récupéré les produits stockés dans le localstorage
async function getProduct(id) {
  let product = await fetch("http://localhost:3000/api/products/" + id);
  if (product.ok) {
    return product.json();
  } else {
    console.error(product.statusText);
  }
}

/*document.addEventListener("DOMContentLoaded", function(event) { */

async function showProduct() {
  try {
    let totalPrice = 0;
    let totalQuantity = 0;

    let products = JSON.parse(localStorage.getItem("product"));

    await products.forEach(async (product) => {
      const details = await getProduct(product.id);

      //Afficher les produit du panier

      //Inserer l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute("data-id", details._id);

      //Inserer l'élément "div"
      let productDivImg = document.createElement("div");
      productArticle.appendChild(productDivImg);
      productDivImg.className = "cart__item__img";

      //Inserer l'élément "img"
      let productImg = document.createElement("img");
      productDivImg.appendChild(productImg);
      productImg.src = details.imageUrl;
      productImg.alt = details.altTxt;

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
      productTitle.textContent = details.name;

      //Inséré la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.textContent = product.color;

      //Inséré le prix
      let productPrice = document.createElement("p");
      productColor.appendChild(productPrice);
      productPrice.textContent = details.price + "€";
      totalPrice += details.price;
      

      //Inséré l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      //Inséré l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(
        productItemContentSettingsQuantity
      );
      productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      //Inséré l'élément "quantité"
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.textContent = product.quantity;
      totalQuantity += product.quantity;

      //Inséré la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.className = "itemQuantity";
      productQuantity.value = product.quantity;
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      //INSERER L'ELEMENT 'DIV'
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

      //INSERER L'ELEMENT  'P' SUPPRIMER
      let productDelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.textContent = "Supprimer";
    })
  } catch (e) {
    console.log(e);
  }
}
showProduct();
/*});*/



const listOfQuantity = document.getElementsByClassName("itemQuantity");
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

function totalQuantityPrices() {
  //Quantité totale
  let sumQuantity = 0;
  for (let i = 0; i < listOfQuantity.length; i++) {
      sumQuantity += parseInt(listOfQuantity[i].value);
  }
  totalQuantity.innerHTML = sumQuantity;

  //Prix total
  let listOfPrices = document.getElementsByClassName("cart__item__content__description p");
  let sumPrices = 0;
  for (let i = 0; i < listOfPrices.length; i++) {
      sumPrices += parseInt(listOfPrices[i].innerHTML) * listOfQuantity[i].value;
  }
  totalPrice.innerHTML = sumPrices;
}
totalQuantityPrices()











/*
//Calcul de la quantité total et du prix total
function totalQuantityPrices() {
  //Afficher la quantité des produits
  let kanapQuantity = 0;
  for (let i = 0; i < listOfQuantity.length; i++) {
    kanapQuantity += parseInt(listOfQuantity[i].value);
  }
  totalQuantity.textContent = kanapQuantity;

  //Afficher le prix des produits
  let listOfPrices = [
    ...document.getElementsByClassName("cart__item__content__description"),
  ];
  console.log(listOfPrices);
  let kanapPrice = 0;
  listOfPrices.forEach((div) => {
    console.log(div);
  });
  /*for (let i = 0; i < listOfPrices.length; i++) {
        console.log(i);
        console.log(listOfPrices[i].querySelector("p:nth-child(3)"));
        kanapPrice += parseInt(listOfPrices[i].textContent) * listOfQuantity[i].value;
    }
  totalPrice.textContent = kanapPrice;
}*/

totalQuantityPrices();

//Changement de la quantité directement dans le panier
function changeQuantity() {
  for (let input of listOfQuantity) {
    input.addEventListener("change", function () {
      totalQuantityPrices();
      input.dataset.value = input.value;

      for (let i = 0; i < products.lenght; i++) {
        products[i].quantity = listOfQuantity[i].dataset.value;
      }
      localStorage.setItem("product", JSON.stringify(products));
    });
  }
}

changeQuantity();

//Supprimer un produit directement dans le panier
function deleteItem() {
  let deleteProduct = document.querySelectorAll(".deleteItem");

  for (let deleteButton of deleteProduct) {
    deleteButton.addEventListener("click", function () {
      let deleteProductInCart = deleteButton.closest("article");
      deleteProductInCart.remove();

      for (let i = 0; i < products.lenght; i++) {
        if (deleteProductInCart.dataset.id == products[i].id) {
          products.splice(i, 1);
          localStorage.setItem("product", JSON.stringify(products));
        }
      }
      totalQuantityPrices();
    });
  }
}
