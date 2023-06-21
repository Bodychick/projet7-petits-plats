export function createCard(element){
    const article = document.createElement("article");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const cookingTime=document.createElement("span");
    const recetteDetails=document.createElement("figcaption");
    const nomRecette = document.createElement("h2");
    const description = document.createElement("p");
    description.classList.add("recette-description");
    description.textContent=element.description;
    nomRecette.textContent = element.name;
    nomRecette.classList.add("nom-recette");
    const titreRecette = document.createElement("h3");
    titreRecette.textContent="recette";
    const ingredientsTitle=document.createElement("h3");
    ingredientsTitle.textContent="ingredients";
    const listeIngredients = document.createElement("ul");
    listeIngredients.classList.add("ingredients");

    // Parcourir les éléments du tableau
    for (var i = 0; i < element.ingredients.length; i++) {
        var element2 = element.ingredients[i];
        var listItem = document.createElement('li'); // Créer l'élément <li>

        // Créer le span pour le nom de l'ingrédient
        var ingredientName = document.createElement('span');
        ingredientName.className = 'ingredient-name';
        ingredientName.textContent = element2.ingredient;

        // Créer le span pour la quantité et l'unité (si disponible)
        var quantityUnit = document.createElement('span');
        quantityUnit.className = 'ingredient-quantity-unit';
        quantityUnit.textContent = element2.quantity + ' ';

        if (element2.unit) {
        quantityUnit.textContent += element2.unit;
        }

        // Ajouter les spans à l'élément <li>
        listItem.appendChild(ingredientName);
        listItem.appendChild(quantityUnit);

        // Ajouter l'élément <li> à l'élément <ul>
        listeIngredients.appendChild(listItem);
    }
    
    cookingTime.id="cooking-time";
    cookingTime.textContent=element.time+"min";
    img.setAttribute("src","img/"+element.image);
    img.setAttribute("alt","Photo de "+element.name);
    figure.appendChild(img);
    figure.appendChild(cookingTime);
    recetteDetails.appendChild(nomRecette);
    recetteDetails.appendChild(titreRecette);
    recetteDetails.appendChild(description);
    recetteDetails.appendChild(ingredientsTitle);
    recetteDetails.appendChild(listeIngredients);
    figure.appendChild(recetteDetails);
    article.appendChild(figure);
    console.log(article);
    return article;
}

