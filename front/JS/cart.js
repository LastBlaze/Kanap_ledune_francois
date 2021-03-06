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
    let products = JSON.parse(localStorage.getItem("product"));

    await products.forEach(async (product) => {
      const details = await getProduct(product.id);

      //Afficher les produit du panier

      //Inserer l'élément "article"
      let productArticle = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.dataset.id = details._id;
      productArticle.dataset.color = product.color;

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
      productItemContentDescription.className =
        "cart__item__content__description";

      //Inséré le titre h2
      let productTitle = document.createElement("h2");
      productItemContentDescription.appendChild(productTitle);
      productTitle.textContent = details.name;

      //Inséré la couleur
      let productColor = document.createElement("p");
      productItemContentDescription.appendChild(productColor);
      productColor.textContent = product.color;

      //Inséré le prix
      let productPrice = document.createElement("p");
      productItemContentDescription.appendChild(productPrice);
      productPrice.textContent = details.price + "€";
      var totalpricespan = document.getElementById("totalPrice");
      if (totalpricespan.textContent == "") {
        totalpricespan.innerText = + (parseInt(details.price) * parseInt(product.quantity))+ ",00";
      } else {
        totalpricespan.innerText =
          parseInt(totalpricespan.textContent) +
          (parseInt(details.price) * parseInt(product.quantity)) +
          ",00";
      }

      //Inséré l'élément "div"
      let productItemContentSettings = document.createElement("div");
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = "cart__item__content__settings";

      //Inséré l'élément "div"
      let productItemContentSettingsQuantity = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsQuantity);
      productItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

      //Inséré l'élément "quantité"
      let productQte = document.createElement("p");
      productItemContentSettingsQuantity.appendChild(productQte);
      productQte.textContent = "Qté :";
      var totalqtespan = document.getElementById("totalQuantity");
      if (totalqtespan.textContent == "") {
        totalqtespan.innerText = parseInt(product.quantity);
      } else {
        totalqtespan.innerText =
          parseInt(totalqtespan.textContent) +
          parseInt(product.quantity);
      }
      
      //Inséré la quantité
      let productQuantity = document.createElement("input");
      productItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.className = "itemQuantity";
      productQuantity.value = product.quantity;
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      productQuantity.addEventListener("change", (event) => {
        if (productQuantity.value >= 1  && productQuantity.value <=100) { 
        var quantityInput = event.target;
        var newQte = quantityInput.value;
        var ArticleDiv = quantityInput.closest("article");
        var idKanap = ArticleDiv.dataset.id;
        var colorKanap = ArticleDiv.dataset.color;
        updateQuantity(newQte, idKanap, colorKanap);
      } else {
        alert ("la quauntité doit être comprise entre 1 et 100 !")
        document.location.reload();
      }
      })

      //INSERER L'ELEMENT 'DIV'
      let productItemContentSettingsDelete = document.createElement("div");
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

      //INSERER L'ELEMENT  'P' SUPPRIMER
      let productDelete = document.createElement("p");
      productItemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.textContent = "Supprimer";
      
      productDelete.addEventListener("click", (event) => {
        var deleteInput = event.target;
        var ArticleDiv = deleteInput.closest("article");
        var idKanap = ArticleDiv.dataset.id;
        var colorKanap = ArticleDiv.dataset.color;
        deleteItems(colorKanap, idKanap);
      })
    });
  } catch (e) {
    console.log(e);
  }
}
showProduct();

//Fonction pour supprimer un article
function deleteItems(colorKanap, idKanap) {
  let myCart = JSON.parse(localStorage.getItem("product"));
  myCart.forEach((kanap, index) => {
    if (kanap.id === idKanap && kanap.color == colorKanap) {
      myCart.splice(index, 1)
    }
  });
  localStorage.setItem("product", JSON.stringify(myCart));
  document.location.reload();
}

//Fontcion pour modifier la quantité
function updateQuantity(newQuantity, idKanap, colorKanap) {
  let myCart = JSON.parse(localStorage.getItem("product"));
  myCart.forEach((kanap) => {
    if (kanap.id === idKanap && kanap.color == colorKanap) {
      kanap.quantity = newQuantity;
    }
  });
  localStorage.setItem("product", JSON.stringify(myCart));
  document.location.reload();
}


//FORMULAIRE

  //créations des expressions régulières
  let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
  let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
  let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

  //Variable pour récupérer les id de champs de formulaire
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById ("lastName");
  const address = document.getElementById ("address");
  const city = document.getElementById ("city");
  const email = document.getElementById ("email");

// Validation prénom
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation nom
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation adresse
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (adressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation ville
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});


const btnCommander = document.getElementById("order");

//Ecoutez le panier
btnCommander.addEventListener("click", (event) => {
  event.preventDefault();

  
  //Récupération des coordonnées du formulaire client
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    alert("Merci de vérifier vos coordonnées !");
    } else {
      alert("Formulaire validé");
      let products = [];
      JSON.parse(localStorage.getItem("product")).forEach((order) => {
        products.push(order.id)
      });
      
      
      let pageOrder = {contact, products};
      console.log(JSON.stringify(pageOrder))      
      //appel à l'api order pour envoyer les tableaux
      fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pageOrder)
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            let idCommandeUser = data.orderId;

            // Redirection vers la page 'confirmation'
            location.href = `./confirmation.html?id=${data.orderId}`;
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}});

    



