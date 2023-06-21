
//Permet d'ajouter un tag dans le local storage si par type de valeurs si elle n'y est pas déjà
export function ajoutLocalStorage(tag,name){
    //si la valeur n'est pas comprise dans le tableau
    if(checkValeur(name,tag) == false) 
    {
        var tableauRecupere = localStorage.getItem(name);
        if(tableauRecupere == null){
            var tableauSplit = [];
        }
        else {
            var tableauSplit = tableauRecupere.split("||");
        }
        tableauSplit.push(tag);
        console.log(tableauSplit);
        var tableauJoin = tableauSplit.join("||");
        console.log(tableauJoin);
        localStorage.setItem(name,tableauJoin);
    }
}

export function supprimerLocalStorage(tag,name){
    var tableauRecupere = localStorage.getItem(name);
    if (tableauRecupere!=null){
        console.log(tableauRecupere);
        var tableauSplit = tableauRecupere.split("||");
        var tableauSplit2 = tableauRecupere.split("");
        console.log(tableauSplit2.length);

        if (tableauSplit.length === 1 ){
            localStorage.removeItem(name);
        }
        else {
            var nouveauTableau = tableauSplit.filter(function(element) {
                return element !== tag;
            });
            var tableauJoin = nouveauTableau.join("||");
            console.log(tableauJoin);
            localStorage.setItem(name,tableauJoin);
        }
    }   
}

//Check si la valeur est présente en localStorage
export function checkValeur(name,tag){
    var tableauRecupere = localStorage.getItem(name);
    if(tableauRecupere == null){
        return false;
    }
    else {
        var tableauSplit = tableauRecupere.split("||");

        if (tableauSplit.includes(tag)){
            return true;
        }
        else {
            return false;
        }  
    }   
}

