import { recipes } from '../recettes/recipes.js';
import { filtreSelection, modifnbTotalRecettes } from '../js/filtre/filtre.js';
import { createCard } from '../js/composant/card.js';
import { createSelect } from './filtre/select.js';


async function getRecipe() {  
   var newData = recipes;
   return newData;
}

async function init() {
    localStorage.clear();
   //console.log(recipes[0]);
    var data = await getRecipe();
    console.log(document.getElementById("optionsIngredients"));


    //input listener
    filtreSelection(data);
    console.log(document.getElementById("optionsIngredients"));

    //affichage
    manageData(data);

    const wrappers = document.querySelectorAll(".wrapper");
    console.log(wrappers)
    if(wrappers != null || wrappers != undefined){
        wrappers.forEach((wrapper) => {
            const selectBtn = wrapper.querySelector(".select-btn");
            selectBtn.addEventListener("click", () => {
              //wrapper.classList.toggle("active");
              console.log(wrapper.classList.contains("active"))
              if(wrapper.classList.contains("active")){
                wrapper.classList.remove("active");
              }
              else {
                wrapper.classList.add("active");
              }
            });
        });
    }
}

export function manageData(data){
    console.log(document.getElementById("optionsIngredients"));

    createSelect(data);
    console.log(document.getElementById("optionsIngredients"));

    const resultatRecette = document.getElementById("resultat-recette");
    while (resultatRecette.firstChild) {
        resultatRecette.removeChild(resultatRecette.firstChild);
    }
    console.log(data);
    modifnbTotalRecettes(data.length);
    data.forEach(element => {
        resultatRecette.appendChild(createCard(element));
    });
    console.log(document.getElementById("optionsIngredients"));

}

init();