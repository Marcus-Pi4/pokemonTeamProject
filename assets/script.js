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

//Content Container Constants
const contentP1 = document.getElementById("content-p1");
const contentP2 = document.getElementById("content-p2");
const contentP3 = document.getElementById("content-p3");

//Content Pokemon Constants
const contentPoke1 = document.getElementById("content-pokemon1");
const contentPoke2 = document.getElementById("content-pokemon2");
const contentPoke3 = document.getElementById("content-pokemon3");

//Content Container Constants
const contentMove1 = document.getElementById("content-move1");
const contentMove2 = document.getElementById("content-move2");
const contentMove3 = document.getElementById("content-move3");

//Gets Search buttons
const pokemonButton = document.getElementById("pokemon-button");
const moveButton = document.getElementById("move-button");

//Hides first content paragraph.
function hideContent1() {
    let p1Style = contentP1.getAttribute("style");

    if (p1Style==="display: none;"){
        contentButton1.childNodes[1].textContent = "expand_less"
        contentP1.setAttribute("style", "display: content;");
        contentContainer1.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
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
        contentContainer2.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
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
        contentContainer3.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
    } else{
        contentButton3.childNodes[1].textContent = "expand_more"
        contentP3.setAttribute("style", "display: none;");
        contentContainer3.setAttribute("style", "border-top: 2px dotted gray;");
    }

}

contentButton1.addEventListener("click", hideContent1);
contentButton2.addEventListener("click", hideContent2);
contentButton3.addEventListener("click", hideContent3);

const selectSearchButton = document.querySelector('#search-button');

//This is the function for taking queries from the search bar and displaying the information on the pokemon page

function pokemonSearch (search) {
    contentHeader1.children[0].textContent = "Pokemon Information";
    contentHeader2.children[0].textContent = "Pokemon Stats";
    contentHeader3.children[0].textContent = "Moves They Learn";

    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Shows pokemon content if hidden on search. 
        contentButton1.childNodes[1].textContent = "expand_less"
        contentP1.setAttribute("style", "display: content;");
        contentPoke1.setAttribute("style", "display: content;");
        contentContainer1.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
        contentButton2.childNodes[1].textContent = "expand_less"
        contentP2.setAttribute("style", "display: content;");
        contentPoke2.setAttribute("style", "display: content;");
        contentContainer2.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
        contentButton3.childNodes[1].textContent = "expand_less"
        contentP3.setAttribute("style", "display: content;");
        contentPoke3.setAttribute("style", "display: content;");
        contentContainer3.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");

        //Hides Move content if shown.
        contentMove1.setAttribute("style", "display: none;");
        contentMove2.setAttribute("style", "display: none;");
        contentMove3.setAttribute("style", "display: none;");

        let pokemonApiImage = data.sprites.other["official-artwork"].front_default;
        //Changes first content div.
        document.getElementById("pokemon-name").textContent = data.name;
        document.getElementById('pokemon-id').textContent = data.id;
        document.getElementById('pokemon-weight').textContent = data.weight;
        document.getElementById('pokemon-height').textContent = data.height;
        document.getElementById('pokemon-artwork').src = pokemonApiImage;

        getPokemonID(data.id); 

        let typeDiv = document.getElementById("pokemon-type")
        let typeContainer = document.createElement("div");
        typeContainer.setAttribute("id","type-container");
        let typesEl = document.createElement("h3");
        if (typeDiv.childElementCount>0){
            typeDiv.children[0].remove();
            typeDiv.append(typeContainer);
            for (var i=0; i<data.types.length; i++){
                typesEl = document.createElement("h3");
                typesEl.setAttribute("id","type");
                typesEl.textContent = data.types[i].type.name;
                typeContainer.appendChild(typesEl);
            }
        } else {
            typeDiv.append(typeContainer);
            for (var i=0; i<data.types.length; i++){
                typesEl = document.createElement("h3");
                typesEl.setAttribute("id","type");
                typesEl.textContent = data.types[i].type.name;
                typeContainer.appendChild(typesEl);
            }            
        }        

        //Changes 2nd content div.
        document.getElementById('hp').textContent = data.stats[0].base_stat; 
        document.getElementById('attack').textContent = data.stats[1].base_stat;
        document.getElementById('defense').textContent = data.stats[2].base_stat;
        document.getElementById('special-attack').textContent = data.stats[3].base_stat;
        document.getElementById('special-defense').textContent = data.stats[4].base_stat;

        //Places Moves into 3rd content div.
        let moveList = document.createElement("ul");
        moveList.className = "move-list";
        if (contentPoke3.childElementCount>0){
            contentPoke3.children[0].remove();
            contentPoke3.append(moveList);
            for (var i = 0; i < data.moves.length; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(data.moves[i].move.name));
                moveList.appendChild(li);
            }  
        } else {
            contentPoke3.appendChild(moveList)
            for (var i = 0; i < data.moves.length; i++) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(data.moves[i].move.name));
                moveList.appendChild(li);
            }  
        }       
    });
};

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

function moveSearch (search) {
    contentHeader1.children[0].textContent = "Move Information";
    contentHeader2.children[0].textContent = "Move Stats";
    contentHeader3.children[0].textContent = "Pokemon that can Learn It";

    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/move/${search}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Shows pokemon content if hidden on search. 
            contentButton1.childNodes[1].textContent = "expand_less"
            contentP1.setAttribute("style", "display: content;");
            contentMove1.setAttribute("style", "display: content;");
            contentContainer1.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
            contentButton2.childNodes[1].textContent = "expand_less"
            contentP2.setAttribute("style", "display: content;");
            contentMove2.setAttribute("style", "display: content;");
            contentContainer2.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");
            contentButton3.childNodes[1].textContent = "expand_less"
            contentP3.setAttribute("style", "display: content;");
            contentMove3.setAttribute("style", "display: content;");
            contentContainer3.setAttribute("style", "border: 1px solid gray; border-radius: 15px; background-color: white;");

            //Hides Pokemon content if shown.
            contentPoke1.setAttribute("style", "display: none;");
            contentPoke2.setAttribute("style", "display: none;");
            contentPoke3.setAttribute("style", "display: none;");

            //Jose wrote this block of code.
            document.getElementById("move-name").textContent = data.name;
            document.getElementById("move-description").textContent = data.flavor_text_entries[0].flavor_text;
            document.getElementById("move-type").textContent = data.type.name;
            document.getElementById("move-category").textContent = data.damage_class.name;
            document.getElementById("move-pp").textContent = data.pp;
            document.getElementById("move-power").textContent = data.power;
            document.getElementById("move-accuracy").textContent = data.accuracy;
            

            let pokemonList = document.createElement("ul");
            pokemonList.className = "pokemon-list";

            if (contentMove3.childElementCount>0){
                contentMove3.children[0].remove();
                contentMove3.append(pokemonList);
                for (var i = 0; i < data.learned_by_pokemon.length; i++) {
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(data.learned_by_pokemon[i].name));
                    pokemonList.appendChild(li);
                }  
            } else {
                contentMove3.appendChild(moveList)
                for (var i = 0; i < data.learned_by_pokemon.length; i++) {
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(data.learned_by_pokemon[i].name));
                    pokemonList.appendChild(li);
                }  
            }
        })
}

function handleSubmit(event){
    let selectSearchElement = document.querySelector('#gsc-i-id1');
    let userSearchResult = selectSearchElement.value;
    if (pokemonButton.classList.contains("is-checked")){
        pokemonSearch(userSearchResult);
    } else if (moveButton.classList.contains("is-checked")){
        moveSearch(userSearchResult);
    }
    
}

selectSearchButton.addEventListener('click', handleSubmit);