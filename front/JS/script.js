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

        articleLink.href = "./product.html?id=" + article["_id"];
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

      }
    
};

showArticles();