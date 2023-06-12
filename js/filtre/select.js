import { createSelectCard } from '/../js/composant/selectValue.js';

export function createSelect(recipes){
  const wrappers = document.querySelectorAll(".wrapper");

    var listIngredients = [];
    var listUstencils = [];
    var listAppareils = [];

    recipes.forEach(recette => {
        var ingredients = recette.ingredients;
        var appareils  = recette.appliance;
        var ustencils = recette.ustensils;
        ingredients.forEach(ingredient => {
            var ingredientName = ingredient.ingredient;
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
    });

    const ustenciltSearch = document.getElementById("ustenciltSearch");
    ustenciltSearch.addEventListener("input", function (){
        
        var filteredUstencils = listUstencils.filter(function(element) {
            return element.toLowerCase().includes(ustenciltSearch.value.toLowerCase());
          });
          prepareSelect(filteredUstencils,"ustencils","optionsUstencils");
    });

    const appareilSearch = document.getElementById("appareilSearch");
    appareilSearch.addEventListener("input", function (){
        
        var filteredAppareils = listAppareils.filter(function(element) {
            return element.toLowerCase().includes(appareilSearch.value.toLowerCase());
          });
          prepareSelect(filteredAppareils,"appareils","optionsAppareils");
    });

    prepareSelect(listIngredients,"ingredients","optionsIngredients");
    prepareSelect(listUstencils,"ustencils","optionsUstencils");
    prepareSelect(listAppareils,"appareils","optionsAppareils");

    wrappers.forEach((wrapper) => {
      const selectBtn = wrapper.querySelector(".select-btn");
      selectBtn.addEventListener("click", () => {
        wrapper.classList.toggle("active");
      });
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
     //on tri par ordre alphabétique
     list.sort(function(a, b) {
        return a.localeCompare(b);
    });

    list.forEach(element => {
        createSelectCard(element,name,id);
      });
      ajoutListenerSurListe("ingredients");

}

//Cette fonction permet d'ajout le event listener sur chaque element d'une nouvelle liste
function ajoutListenerSurListe(name){
    const listElement = document.getElementsByName(name);

    listElement.forEach(element => {
        element.addEventListener("click", function(){
            console.log(element);
        });
    });
}