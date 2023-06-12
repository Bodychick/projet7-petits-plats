import { recipes } from '../recettes/recipes.js';
import { filtreSelection, modifnbTotalRecettes } from '../js/filtre/filtre.js';
import { createCard } from '../js/composant/card.js';
import { createSelect } from './filtre/select.js';

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

export function manageData(data){
    createSelect(data);
    const resultatRecette = document.getElementById("resultat-recette");
    while (resultatRecette.firstChild) {
        resultatRecette.removeChild(resultatRecette.firstChild);
    }
    console.log(data);
    modifnbTotalRecettes(data.length);
    data.forEach(element => {
        resultatRecette.appendChild(createCard(element));
    });
}

init();