import { createSelectCard,createTag } from '/js/composant/selectValue.js';
import { checkValeur,ajoutLocalStorage,supprimerLocalStorage } from '/js/filtre/localStorage.js';
import { recipes } from '/recettes/recipes.js';
import { filterRecipesByKeyword } from '/js/filtre/filtre.js';

export function createSelect(recipes2){
    let listIngredients = [];
    var listUstencils = [];
    var listAppareils = [];

    recipes2.forEach(recette => {
        let ingredients = recette.ingredients;
        var appareils  = recette.appliance;
        var ustencils = recette.ustensils;
        ingredients.forEach(ingredient => {
            let ingredientName = ingredient.ingredient;
            if(!listIngredients.some(function(element) {  
                return element.toLowerCase()=== ingredientName.toLowerCase();
              })){
                listIngredients.push(ingredientName);
              }
        });
        if(!listAppareils.some(function(element) {  
            return element.toLowerCase()=== appareils.toLowerCase();
          })){
            listAppareils.push(appareils);
        }
        ustencils.forEach(ustencil => {
            if(!listUstencils.some(function(element) {  
                return element.toLowerCase()=== ustencil.toLowerCase();
              })){
                listUstencils.push(ustencil);
              }
        });
    });
    
    const ingredientSearch = document.getElementById("ingredientSearch");
    ingredientSearch.addEventListener("input", function (){
        console.log(ingredientSearch.value);
        var filteredIngredient = listIngredients.filter(function(element) {
            return element.toLowerCase().includes(ingredientSearch.value.toLowerCase());
          });
          prepareSelect(filteredIngredient,"ingredients","optionsIngredients");
          ajoutListenerSurListeIngredient("ingredients");
    });

    const ustenciltSearch = document.getElementById("ustenciltSearch");
    ustenciltSearch.addEventListener("input", function (){
        
        var filteredUstencils = listUstencils.filter(function(element) {
            return element.toLowerCase().includes(ustenciltSearch.value.toLowerCase());
          });
          prepareSelect(filteredUstencils,"ustencils","optionsUstencils");
          ajoutListenerSurListeUstencils("ustencils");
    });

    const appareilSearch = document.getElementById("appareilSearch");
    appareilSearch.addEventListener("input", function (){
        console.log(appareilSearch.value);
        var filteredAppareils = listAppareils.filter(function(element) {
            return element.toLowerCase().includes(appareilSearch.value.toLowerCase());
          });
          prepareSelect(filteredAppareils,"appareils","optionsAppareils");
          ajoutListenerSurListeAppareils("appareils");
    });
    removeTags();
    prepareSelect(listIngredients,"ingredients","optionsIngredients");
    createTags(listIngredients,"ingredients","optionsIngredients");

    prepareSelect(listUstencils,"ustencils","optionsUstencils");
    createTags(listUstencils,"ustencils","optionsUstencils");

    prepareSelect(listAppareils,"appareils","optionsAppareils");
    createTags(listAppareils,"appareils","optionsAppareils");

    ajoutListenerSurListeIngredient("ingredients");
    ajoutListenerSurListeUstencils("ustencils");
    ajoutListenerSurListeAppareils("appareils");
}

function removeTags(){
  const tags = document.getElementById("tags");
  while (tags.firstChild) {
    tags.removeChild(tags.firstChild);
  }
}

function createTags(list,name,id){
  list.forEach(element => {
    var isSelected = checkValeur(name,element);
    createSelectCard(element,name,id,isSelected);
    createTag(element,name,isSelected);
 });
}

//cette fonction permet de supprimer les éléments select deja présent dans liste + filtre alphabétique + initer la création des li dans les select
function prepareSelect(list,name,id){
  console.log(id);
    const optionsIngredient = document.getElementById(id);
    
    console.log(optionsIngredient);
    while (optionsIngredient.firstChild) {
      optionsIngredient.removeChild(optionsIngredient.firstChild);
    }
    
    //Créer une fonction pour supprimer enfant
    //on tri par ordre alphabétique
     list.sort(function(a, b) {
        return a.localeCompare(b);
    });
}

//Cette fonction permet d'ajout le event listener sur chaque element d'une nouvelle liste
function ajoutListenerSurListeIngredient(name){
    const listElement = document.getElementsByName(name);

    listElement.forEach(element => {
        element.addEventListener("click", function(){
          console.log("ingredients");
          if(element.classList.contains("selected") || element.id =="tagElement"){
            console.log("supprimer")
            supprimerLocalStorage(element.textContent,name);
          }
          else {
            ajoutLocalStorage(element.textContent,name);
            
          }
          filterRecipesByKeyword(recipes);
        });
    });
}
function ajoutListenerSurListeUstencils(name){
  const listElement = document.getElementsByName(name);

  listElement.forEach(element => {
      element.addEventListener("click", function(){
        console.log("ustensils");
        if(element.classList.contains("selected") || element.id =="tagElement"){
          supprimerLocalStorage(element.textContent,name);
        }
        else {
          ajoutLocalStorage(element.textContent,name);
          
        }
        filterRecipesByKeyword(recipes);
      });
  });
}
function ajoutListenerSurListeAppareils(name){
  const listElement = document.getElementsByName(name);

  listElement.forEach(element => {
      element.addEventListener("click", function(){
        console.log("appareils");
        if(element.classList.contains("selected") || element.id =="tagElement"){
          supprimerLocalStorage(element.textContent,name);
        }
        else {
          ajoutLocalStorage(element.textContent,name);
          
        }
        filterRecipesByKeyword(recipes);
      });
  });
}