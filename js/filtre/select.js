import { recipes } from '/../recettes/recipes.js';
import { createSelectCard } from '/../js/composant/selectValue.js';

export function createSelect(){
    const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn");

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
          prepareSelect(filteredIngredient);
    });

    prepareSelect(listIngredients);

    selectBtn.addEventListener("click", ()=> {
        wrapper.classList.toggle("active");
    });
}

//cette fonction permet de supprimer les éléments select deja présent dans liste + filtre alphabétique + initer la création des li dans les select
function prepareSelect(listIngredients){
    const optionsIngredient = document.getElementById("optionsIngredients");
    while (optionsIngredient.firstChild) {
      optionsIngredient.removeChild(optionsIngredient.firstChild);
    }
     //on tri par ordre alphabétique
     listIngredients.sort(function(a, b) {
        return a.localeCompare(b);
    });

      listIngredients.forEach(ingredient => {
        createSelectCard(ingredient);
      });
      ajoutListenerSurListe("ingredients");

}

//Cette fonction permet d'ajout le event listener sur chaque element d'une nouvelle liste
function ajoutListenerSurListe(name){
    const listElement = document.getElementsByName(name);

    listElement.forEach(element => {
        element.addEventListener("click", function(){
            console.log("je suis cliqué");
        });
    });
}