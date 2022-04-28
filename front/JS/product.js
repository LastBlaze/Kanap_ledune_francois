//URLSearchParams 
function idProduct() {  
  const str = window.location.href;
  const url = new URL (str);
  const idProduct = url.searchParams.get("id");
  return idProduct;
};


fetch (`http://localhost:3000/api/products/${idProduct()}`)
  .then ((response) => response.json()
  .then ((data) => {
      //création des variables qui font appel au données de l'API
      let image = document.createElement("img");
      document.querySelector(".item__img").appendChild(image);
      image.src = data.imageUrl;
      image.alt = data.altTxt; 

      let title = document.getElementById("title");
      title.textContent = data.name;

      let price = document.getElementById("price");
      price.textContent = data.price;

      let description = document.getElementById("description");
      description.textContent = data.description;

      //Ajout des couleurs
      for (let color of data.colors) {
      let Option = document.createElement("option");
      document.getElementById("colors").appendChild(Option);
      Option.textContent = color;
    }
    console.log(data);
  })
  );


 function addToCart() {
   const btnPanier = document.querySelector("addToCart");
 }



 