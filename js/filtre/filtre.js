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
    var keywords = splitKeyword(inputKeyword);
    console.log(keywords);
    recipes.forEach(recipe => {
      var motTrouve = 0;

      keywords.forEach(element => {
        if (
          recipe.name.toLowerCase().includes(element) ||
          recipe.description.toLowerCase().includes(element) ||
          recipe.ingredients.some(function(ingredient) {
            return ingredient.ingredient.toLowerCase().includes(element);
          })
        ) {
          motTrouve++;
        }
      });
      if (motTrouve === keywords.length) {
        filteredRecipes.push(recipe);
      }
    });
    console.log(filteredRecipes);
    manageData(filteredRecipes);
  }

   //retourne un tableau avec une ligne par mot clé
  function splitKeyword(inputKeyword){
    var inputTableau = inputKeyword.split(" ");
    const tableauLowerCase = inputTableau.map(element => {
      return element.toLowerCase();
    });
    console.log(tableauLowerCase);
    return tableauLowerCase;
  }

