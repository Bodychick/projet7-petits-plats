
export function createSelectCard(element,name,id,isSelected) {
    const options = document.getElementById(id);
    const li = document.createElement("li");
    if(isSelected){
        const cliqueCroix = document.createElement("i");
        //const content = document.createElement("span");
        cliqueCroix.classList.add("fa-solid","fa-xmark");
        //console.log(cliqueCroix);
        li.innerHTML = `${element}<i class="fa-solid fa-xmark"></i>`;
        li.appendChild(cliqueCroix);
       // li.appendChild(content);
        console.log(li)
        li.classList.add("selected");
        console.log(li);
    }
    else {
        li.textContent = element;
    }    
    
    li.setAttribute("name",name);
    options.appendChild(li);
}

export function createTag(element,name, isSelected){
    const tagSection = document.getElementById("tags");
    if(isSelected){
        const div = document.createElement("div");
        div.setAttribute("id","tagElement");
        const xMark = document.createElement("i");
        xMark.classList.add("fa-solid","fa-xmark");
        const span = document.createElement("span");
        div.setAttribute("name",name);
        span.textContent = element;
        div.appendChild(span);
        div.appendChild(xMark);
        
        tagSection.appendChild(div);
    }
}

