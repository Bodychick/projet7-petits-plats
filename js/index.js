import { recipes } from '../recettes/recipes.js';
import { filterRecipesByKeyword, filtreSelection } from '../js/filtre/filtre.js';
import { createCard } from '../js/card/card.js';

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

init();