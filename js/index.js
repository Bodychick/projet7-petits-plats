import { recipes } from '../recettes/recipes.js';

async function getRecipe() {  
   var newData = recipes;
   return newData;
}

async function init() {
   //console.log(recipes[0]);
    var data = await getRecipe();
    //filtre
    filtreSelection(data);
    //affichage
    manageData(data);
}

function manageData(data){
    const resultatRecette = document.getElementById("resultat-recette");
    while (resultatRecette.firstChild) {
        resultatRecette.removeChild(resultatRecette.firstChild);
    }
    console.log(data);
    
    data.forEach(element => {
        resultatRecette.appendChild(createCard(element));
    });
}

function createCard(element){
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

function filtreSelection(data){
    const inputRecherche = document.getElementById("input-recherche");
    inputRecherche.addEventListener("input", function(){
        console.log(inputRecherche.value.split("").length)
        console.log(inputRecherche.value.split(""));
       if (inputRecherche.value.split("").length>3){
            filterRecipesByKeyword(data, inputRecherche.value);
            inputRecherche.style.border = "1px solid green";
       } 
       else if(inputRecherche.value.split("").length==0) {
            
            inputRecherche.style.border = "none";
            console.log(data)
            manageData(data);
       } else {
            inputRecherche.style.border = "1px solid red";
       }
    });
}

function filterRecipesByKeyword(recipes, inputKeyword) {
    var filteredRecipes = [];
  
    // Convertir le mot-clé en minuscules pour une recherche insensible à la casse
    var keyword = inputKeyword.toLowerCase();
  
    // Parcourir les recettes
    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];
  
      // Vérifier si le nom de la recette ou la description contient le mot-clé
      if (recipe.name.toLowerCase().includes(keyword) || recipe.description.toLowerCase().includes(keyword)) {
        filteredRecipes.push(recipe);
        continue; // Passer à la prochaine recette si le mot-clé est trouvé dans le nom ou la description
      }
  
      // Vérifier si le mot-clé se trouve dans les ingrédients
      var matchingIngredients = recipe.ingredients.filter(function(ingredient) {
        return ingredient.ingredient.toLowerCase().includes(keyword);
      });
  
      // Ajouter la recette à la liste filtrée si au moins un ingrédient correspond au mot-clé
      if (matchingIngredients.length > 0) {
        filteredRecipes.push(recipe);
      }
    }
    console.log(filteredRecipes);
    manageData(filteredRecipes);
  }

init()