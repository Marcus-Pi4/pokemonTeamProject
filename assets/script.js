const filterSwitch = document.getElementById("filter-switch").parentNode;
const filterTable = document.getElementById("filter-table");
const filterList = document.getElementById("filter-list");
const tableButton = document.getElementById("expand-table")
console.log(filterSwitch);
console.log(filterTable);

function hideTable() {
    console.log(filterSwitch.classList.contains("is-checked"));
    if (filterSwitch.classList.contains("is-checked")){
        filterTable.setAttribute("style", "display:none");
    } else {
        filterTable.setAttribute("style", "");
    }
}

function hideList() {
    console.log(filterList.getAttribute("style"));
    let styleAtt = filterList.getAttribute("style");
    if (styleAtt==="display: none;"){
        filterList.setAttribute("style", "display: content;");
    } else{
        filterList.setAttribute("style", "display: none;");
    }
}


filterSwitch.addEventListener("click", hideTable);
tableButton.addEventListener("click", hideList);


fetch('https://pokeapi.co/api/v2/pokemon/charizard')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.sprites.other["official-artwork"].front_default);
        console.log(data.id);
        console.log(data.name);
        console.log(data.height);
        console.log(data.weight);
        console.log(data.moves);
        console.log(data.sprites.back_default);
        for (var i = 0; i < data.types.length; i++) {
            console.log(data.types[i].type.name);
        }
        for (var i = 0; i < data.moves.length; i++) {
            console.log(data.moves[i].move.name);
        }
    });