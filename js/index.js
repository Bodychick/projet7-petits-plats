import { recipes } from '../recettes/recipes.js';
import { filtreSelection, modifnbTotalRecettes,getAppareilsList,getUstencilsListValue, getIngredientsListValue } from '../js/filtre/filtre.js';
import { create404,createCard } from '../js/composant/card.js';
import { createSelect, createTags, ajoutListenerSurListeIngredient, ajoutListenerSurListeAppareils, ajoutListenerSurListeUstencils } from './filtre/select.js';

console.log(document.getElementById("optionsIngredients"));

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
    console.log(document.getElementById("optionsIngredients"))

    //affichage
    manageData(data);

    const wrappers = document.querySelectorAll(".wrapper");
    console.log(wrappers)
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
    console.log(document.getElementById("optionsIngredients"));
    
    createSelect(data);
    
    console.log(document.getElementById("optionsIngredients"));

    const resultatRecette = document.getElementById("resultat-recette");
    while (resultatRecette.firstChild) {
        resultatRecette.removeChild(resultatRecette.firstChild);
    }
    console.log(data);
    modifnbTotalRecettes(data.length);
    if (data.length>0){
      data.forEach(element => {
        resultatRecette.appendChild(createCard(element));
      });
    }
    else {
      resultatRecette.appendChild(create404());
      let listIngredients = [];
      var listUstencils = [];
      var listAppareils = [];
      listIngredients = getIngredientsListValue();
      listUstencils = getUstencilsListValue();
      listAppareils = getAppareilsList();
      if(listIngredients.lenght!=0){
        createTags(listIngredients,"ingredients","optionsIngredients");
      }
      if(listUstencils.lenght!=0){
        createTags(listUstencils,"ingredients","optionsIngredients");
      }
      if(listAppareils.lenght!=0){
        createTags(listAppareils,"ingredients","optionsIngredients");
      }
      createTags(listUstencils,"ustencils","optionsUstencils");
      createTags(listAppareils,"appareils","optionsAppareils");
      ajoutListenerSurListeIngredient("ingredients");
      ajoutListenerSurListeUstencils("ustencils");
      ajoutListenerSurListeAppareils("appareils");
    }
    
}


init();