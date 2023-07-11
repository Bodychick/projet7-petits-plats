import { manageData } from '/../js/index.js';
//import { recipes } from '../recettes/recipes.js';

// écoute de l'input + savoir si l'utilisateur a rentré +/- 3 caractères
export function filtreSelection(data){
  console.log("je repasse ici")
    const inputRecherche = document.getElementById("input-recherche");
    inputRecherche.addEventListener("input", function(){
        console.log(inputRecherche.value.split("").length)
        console.log(inputRecherche.value.split(""));
       if (inputRecherche.value.split("").length>2){
            //filterRecipesByKeyword(data, inputRecherche.value);
            filterRecipesByKeyword(data);
            inputRecherche.style.border = "1px solid green";
       } 
       else if(inputRecherche.value.split("").length==0) {
            inputRecherche.style.border = "none";
            console.log(data)
            filterRecipesByKeyword(data);
       } else {
            inputRecherche.style.border = "1px solid red";
       }
    });
}


function getInputValue(){
  const inputRecherche = document.getElementById("input-recherche");
  if (inputRecherche.value.split("").length>2){
    var keywords = splitKeyword(inputRecherche.value);
    return keywords;
  }
  return [];
}

function getIngredientsListValue(){
  var tableauRecupere = localStorage.getItem("ingredients");
  if(tableauRecupere == null){
    return [];
  }
  else {
    var tableauSplit = tableauRecupere.split("||");
    return tableauSplit;
  }
}

function getAppareilsList(){
  var tableauRecupere = localStorage.getItem("appareils");
  if(tableauRecupere == null){
    return [];
  }
  else {
    var tableauSplit = tableauRecupere.split("||");
    return tableauSplit;
  }
}

function getUstencilsListValue(){
  var tableauRecupere = localStorage.getItem("ustencils");
  if(tableauRecupere == null){
    return [];
  }
  else {
    var tableauSplit = tableauRecupere.split("||");
    return tableauSplit;
  }
}

 export function filterRecipesByKeyword(data) {
    const filteredRecipes = [];
    var keywords = getInputValue();
    var ingredients = getIngredientsListValue();
    var appareils = getAppareilsList();
    var ustencils = getUstencilsListValue();
    console.log(keywords);
    console.log(ingredients);
    console.log(appareils);
    console.log(ustencils);
    
    data.forEach(recipe => {
      // Filtrer par inputKeywords
      const containsKeywords = keywords.every(keyword => {
        const recipeName = recipe.name.toLowerCase();
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
        const recipeDescription = recipe.description.toLowerCase();
        
        const keywordLowerCase = keyword.toLowerCase();
        return recipeName.includes(keywordLowerCase) ||
          recipeIngredients.some(ingredient => ingredient.includes(keywordLowerCase)) ||
          recipeDescription.includes(keywordLowerCase);
      });
      
      // Filtrer par listAppareils
      const hasAppliance = appareils.length === 0 || appareils.includes(recipe.appliance);
      console.log(appareils.length);
      
      // Filtrer par utensils
      const hasUtensils = ustencils.length === 0 || ustencils.every(utensil => recipe.ustensils.includes(utensil));
      
      // Filtrer par ingredients
      const hasIngredients = ingredients.length === 0 || ingredients.every(ingredient => {
        return recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase()));
      });
      
      // Vérifier si la recette correspond à tous les critères de filtrage
      if (containsKeywords && hasAppliance && hasUtensils && hasIngredients) {
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

  export function modifnbTotalRecettes(nbRecettes){
    const textTotalRecettes = document.getElementById("nbTotalRecette");
    if(nbRecettes == 1){
      textTotalRecettes.textContent = nbRecettes + " recette";
    }
    else if (nbRecettes == 0){
      textTotalRecettes.textContent = nbRecettes + " recette";
    }
    else {
      textTotalRecettes.textContent = nbRecettes + " recettes";
    }
  }


