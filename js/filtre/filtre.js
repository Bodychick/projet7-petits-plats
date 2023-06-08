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
      
      for (var x = 0; x < keywords.length; x++){
        // Vérifier si le nom de la recette ou la description contient le mot-clé
        if (recipe.name.toLowerCase().includes(keywords[x]) || recipe.description.toLowerCase().includes(keywords[x])) {
          if(filteredRecipes.filter(item => item.id === recipe.id).length > 0){
            console.log("déja présente");
          }else {
            motTrouve++;
          }
          continue; // Passer à la prochaine recette si le mot-clé est trouvé dans le nom ou la description
        }
    
        // Vérifier si le mot-clé se trouve dans les ingrédients
        var matchingIngredients = recipe.ingredients.filter(function(ingredient) {
          return ingredient.ingredient.toLowerCase().includes(keywords[x]);
        });
    
        // Ajouter la recette à la liste filtrée si au moins un ingrédient correspond au mot-clé
        if (matchingIngredients.length > 0) {
            motTrouve++;
        }
      }
      
      if(motTrouve == keywords.length){
        filteredRecipes.push(recipe);
      }
      else {
        
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

