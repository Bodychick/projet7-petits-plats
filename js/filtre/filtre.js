import { manageData } from '/../js/index.js';

// écoute de l'input + savoir si l'utilisateur a rentré +/- 3 caractères
export function filtreSelection(data){
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

//
export function filterRecipesByKeyword(recipes, inputKeyword) {
    var filteredRecipes = [];
  
    // Convertir le mot-clé en minuscules pour une recherche insensible à la casse
    var keyword = inputKeyword.toLowerCase();

    recipes.forEach(recipe => {
      // Vérifier si le nom de la recette ou la description contient le mot-clé
      if (recipe.name.toLowerCase().includes(keyword) || recipe.description.toLowerCase().includes(keyword)) {
        return filteredRecipes.push(recipe);
       // Passer à la prochaine recette si le mot-clé est trouvé dans le nom ou la description
      }
  
      // Vérifier si le mot-clé se trouve dans les ingrédients
      var matchingIngredients = recipe.ingredients.filter(function(ingredient) {
        return ingredient.ingredient.toLowerCase().includes(keyword);
      });
  
      // Ajouter la recette à la liste filtrée si au moins un ingrédient correspond au mot-clé
      if (matchingIngredients.length > 0) {
        filteredRecipes.push(recipe);
      }
      
    });

    console.log(filteredRecipes);
    manageData(filteredRecipes);
  }

