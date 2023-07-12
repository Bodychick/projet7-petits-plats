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
    //filtre
    filtreSelection(data);
    //affichage
    manageData(data);   

    const wrappers = document.querySelectorAll(".wrapper");
    console.log(wrappers);
    if(wrappers != null || wrappers != undefined){
        wrappers.forEach((wrapper) => {
            const selectBtn = wrapper.querySelector(".select-btn");
            selectBtn.addEventListener("click", function() {
              console.log(wrapper.classList.contains("active"));
              closeAllSelects(wrapper);
              console.log(wrapper.classList.contains("active"));

              if(wrapper.classList.contains("active")){
                console.log("je passe ici")
                wrapper.classList.remove("active");
              }
              else {
                console.log("je passe là")
                wrapper.classList.add("active");
              }
              
            });
        });
    }
}

function closeAllSelects(wrapper) {
  const allSelects = document.querySelectorAll('.wrapper');

  allSelects.forEach(select => {
    if(wrapper !== select)
    select.classList.remove('active');
  });
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