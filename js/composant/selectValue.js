
export function createSelectCard(ingredient) {
    const optionsIngredient = document.getElementById("optionsIngredients");
    
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.setAttribute("name","ingredients");
    optionsIngredient.appendChild(li);
}


