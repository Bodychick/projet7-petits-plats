
export function createSelectCard(element,name,id) {
    const options = document.getElementById(id);
    
    const li = document.createElement("li");
    li.textContent = element;
    li.setAttribute("name",name);
    options.appendChild(li);
}


