//Récupéré les données de l'API
async function getArticles() {
    const articlescatch = await fetch("http://localhost:3000/api/products");
    if(articlescatch.ok){
      return await articlescatch.json();
    } else {
      console.error(articlescatch.statusText)
    }
    
}

async function showArticles() {
  try{
    const articles = await getArticles();
    articles.forEach(article => {
        //Création des emplacements pour les éléments de l'API
        const articleContainer = document.getElementById("items");
        const articleLink = document.createElement("a");
        const articleTag = document.createElement("article");
        const imageTag = document.createElement("img");
        const titleTag = document.createElement("h3");
        const articleDescritpion = document.createElement("p");

        //Indication de l'équivalence des constantes par rapport au données de l'API
        articleLink.href = "./product.html?id=" + article["_id"];
        imageTag.src = article.imageUrl;
        imageTag.alt = article.altTxt;
        titleTag.classList.add("productName");
        titleTag.textContent = article.name;
        articleDescritpion.textContent = article.description;
        articleDescritpion.classList.add("productDescription");
       
        //Résultat des constantes
        articleLink.append(articleTag)
        articleTag.append(imageTag);
        articleTag.append(titleTag);
        articleTag.append(articleDescritpion);
        articleContainer.append(articleLink);
        
        console.log(article);
    });
      } catch (e) {
        console.error(e);
      }
};

showArticles();


/*
function trier(liste){
  liste.sort()
  console.log(liste);
}

trier(["banane", "pomme", "avocat", "cornichon"])
*/