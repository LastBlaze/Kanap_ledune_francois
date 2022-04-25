
async function getArticles() {
    const articlescatch = await fetch("http://localhost:3000/api/products");
    return await articlescatch.json();
}

async function showArticles() {
    const articles = await getArticles();
    articles.forEach(article => {
        const articleContainer = document.getElementById("items");
        const articleLink = document.createElement("a");
        const articleTag = document.createElement("article");
        const imageTag = document.createElement("img");
        const titleTag = document.createElement("h3");
        const articleDescritpion = document.createElement("p");

        imageTag.src = article.imageUrl;
        titleTag.classList.add("articleName");
        titleTag.textContent = article.name;
        articleDescritpion.textContent = article.description;

        articleLink.append(articleTag)
        articleTag.append(imageTag);
        articleTag.append(titleTag);
        articleTag.append(articleDescritpion);
        articleContainer.append(articleLink);
        
        console.log(article);
    });

    try {
        nonExistentFunction();
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
    
};

showArticles();




  /*
Acceuil()

// Récupération des articles de l'API
async function getArticles() {
    const articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}


async function Acceuil() {
   const result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}*/