//Sets constants from the search table. 
const filterSwitch = document.getElementById("filter-switch").parentNode;
const filterTable = document.getElementById("filter-table");
const filterList = document.getElementById("filter-list");
const tableButton = document.getElementById("expand-table");

//Content Container Constants
const contentContainer1 = document.getElementById("content1");
const contentContainer2 = document.getElementById("content2");
const contentContainer3 = document.getElementById("content3");

//Content Header Constants
const contentHeader1 = document.getElementById("content-header1");
const contentHeader2 = document.getElementById("content-header2");
const contentHeader3 = document.getElementById("content-header3");

//Content Header Button Constants
const contentButton1 = document.getElementById("content-button1");
const contentButton2 = document.getElementById("content-button2");
const contentButton3 = document.getElementById("content-button3");

//Content Paragraph Constants
const contentP1 = document.getElementById("content-p1");
const contentP2 = document.getElementById("content-p2");
const contentP3 = document.getElementById("content-p3");

//Hides table of filters.
function hideTable() {
    if (filterSwitch.classList.contains("is-checked")){
        filterTable.setAttribute("style", "display:none");
    } else {
        filterTable.setAttribute("style", "");
    }
}

//Hides lists within table. 
function hideList() {
    let styleAtt = filterList.getAttribute("style");
    if (styleAtt==="display: none;"){
        tableButton.childNodes[1].textContent = "expand_less"
        filterList.setAttribute("style", "display: content;");
    } else{
        tableButton.childNodes[1].textContent = "expand_more"
        filterList.setAttribute("style", "display: none;");
    }
}

//Hides first content paragraph.
function hideContent1() {
    let p1Style = contentP1.getAttribute("style");

    if (p1Style==="display: none;"){
        contentButton1.childNodes[1].textContent = "expand_less"
        contentP1.setAttribute("style", "display: content;");
        contentContainer1.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton1.childNodes[1].textContent = "expand_more"
        contentP1.setAttribute("style", "display: none;");
        contentContainer1.setAttribute("style", "border-top: 2px dotted gray;");
    }
}

//Hides second content paragraph.
function hideContent2() {
    let p2Style = contentP2.getAttribute("style");

    if (p2Style==="display: none;"){
        contentButton2.childNodes[1].textContent = "expand_less"
        contentP2.setAttribute("style", "display: content;");
        contentContainer2.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton2.childNodes[1].textContent = "expand_more"
        contentP2.setAttribute("style", "display: none;");
        contentContainer2.setAttribute("style", "border-top: 2px dotted gray;");
    }
}

//Hides third content paragraph.
function hideContent3() {
    let p3Style = contentP3.getAttribute("style");

    if (p3Style==="display: none;"){
        contentButton3.childNodes[1].textContent = "expand_less"
        contentP3.setAttribute("style", "display: content;");
        contentContainer3.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton3.childNodes[1].textContent = "expand_more"
        contentP3.setAttribute("style", "display: none;");
        contentContainer3.setAttribute("style", "border-top: 2px dotted gray;");
    }

}

filterSwitch.addEventListener("click", hideTable);
tableButton.addEventListener("click", hideList);
contentButton1.addEventListener("click", hideContent1);
contentButton2.addEventListener("click", hideContent2);
contentButton3.addEventListener("click", hideContent3);

const selectSearchElement = document.querySelector('#sample6');
const selectSearchButton = document.querySelector('#search-button');

//This is the function for taking querys from the search bar and displaying the information on the pokemon page
selectSearchButton.addEventListener('click', function(event) {
    event.preventDefault();
    const userSearchResult = selectSearchElement.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${userSearchResult}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let pokemonApiImage = data.sprites.other["official-artwork"].front_default;
        document.getElementById("pokemon-name").textContent = data.name;
        for (var i = 0; i < data.types.length; i++) {
            document.getElementById('pokemon-type').textContent += data.types[i].type.name;
        }
        document.getElementById('pokemon-id').textContent = data.id;
        document.getElementById('pokemon-weight').textContent = data.weight;
        document.getElementById('pokemon-height').textContent = data.height;
        document.getElementById('pokemon-artwork').src = pokemonApiImage;
        document.getElementById('hp').textContent = data.stats[0].base_stat;
        document.getElementById('attack').textContent = data.stats[1].base_stat;
        document.getElementById('defence').textContent = data.stats[2].base_stat;
        document.getElementById('special-attack').textContent = data.stats[3].base_stat;
        document.getElementById('special-defence').textContent = data.stats[4].base_stat;
        for (var i = 0; i < data.moves.length; i++) {
            const moveList = document.getElementById('move-list');
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(data.moves[i].move.name));
            moveList.appendChild(li);            
        }
        getPokemonID (data.id);
    });
});

function getPokemonID (id) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        getPokemonEvolutions (data.evolution_chain.url);
    });
}

function getPokemonEvolutions (url) {
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.chain.evolves_to.length === 0) {
            document.getElementById('evolvesTo').textContent = 'This pokemon does not evolve';
        }
        else if (data.chain.evolves_to[0].species.name === document.getElementById('pokemon-name').textContent) {
            document.getElementById('evolvesTo').textContent = data.chain.evolves_to[0].evolves_to[0].species.name;
        
        }
        else if (data.chain.evolves_to[0].evolves_to[0].species.name === document.getElementById('pokemon-name').textContent) {
            document.getElementById('evolvesTo').textContent = `Evolves from ${data.chain.evolves_to[0].species.name}`;
        }
        else {
            document.getElementById('evolvesTo').textContent = data.chain.evolves_to[0].species.name;
        }
    });
}