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

//Fonction qui filtre les recettes en fonction du mot clé dans le champ input
function filterRecipesByKeyword(recipes, inputKeyword) {
    var filteredRecipes = [];
    var keywords = splitKeyword(inputKeyword);
    console.log(keywords);
    // Convertir le mot-clé en minuscules pour une recherche insensible à la casse
    //var keyword = inputKeyword.toLowerCase();
  
    // Parcourir les recettes
    for (var i = 0; i < recipes.length; i++) {
      var recipe = recipes[i];
      var motTrouve = 0;
    
      for (var y = 0; y < keywords.length; y++) {
        if (
          recipe.name.toLowerCase().includes(keywords[y]) ||
          recipe.description.toLowerCase().includes(keywords[y]) ||
          recipe.ingredients.some(function(ingredient) {
            return ingredient.ingredient.toLowerCase().includes(keywords[y]);
          })
        ) {
          motTrouve++;
        } else {
          break; // Sortir de la boucle dès qu'un mot-clé n'est pas présent
        }
      }
    
      if (motTrouve === keywords.length) {
        filteredRecipes.push(recipe);
      }
    }
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

