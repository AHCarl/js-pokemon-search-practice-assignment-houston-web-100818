document.addEventListener('DOMContentLoaded', () => {
  parsePokemon(POKEMON)
  
  window.document.querySelector("#pokemon-search-input").addEventListener("keydown", filterPokemon)

})

function parsePokemon(pokemon_json) {
    let pokeArray = []
    for (let poke of pokemon_json) {
        let card = pokemonCard(poke)
        card.querySelector(".sprite-box").addEventListener("click", flipCard)
        pokeArray.push(card)

    }

    let card_container = document.getElementById("pokemon-container")
    for (let card of pokeArray) {
        card_container.appendChild(card)
    }
}

function pokemonCard(pokemon) {
    let name = pokemon.name
    let frontUrl = pokemon.sprites.front
    let id = pokemon.id

    let topDiv = document.createElement('div')
    topDiv.className = "pokemon-container"

    let pokeFrame = document.createElement('div')
    pokeFrame.className = "pokemon-frame"
    topDiv.appendChild(pokeFrame)

    let pokeName = document.createElement('h1')
    pokeName.className = "center-text"
    pokeName.innerText = name
    pokeFrame.appendChild(pokeName)

    let spriteContainer = document.createElement('div')
    spriteContainer.className = "sprite-container"
    pokeFrame.appendChild(spriteContainer)

    let spriteBox = document.createElement('div')
    spriteBox.className = "sprite-box"
    spriteContainer.appendChild(spriteBox)

    let spriteImg = document.createElement('img')
    spriteImg.className = "toggle-sprite"
    spriteBox.appendChild(spriteImg)
    spriteImg.dataset.action = "flip"
    spriteImg.dataset.id = id
    spriteImg.dataset.flipped = "front"
    spriteImg.setAttribute('src', frontUrl)

    return topDiv
}

function flipCard(event) {
    let card = event.currentTarget
    let image = card.querySelector("img")

    let pokeId = image.dataset.id
    let pokeFlipped = image.dataset.flipped

    let pokeHash = getPokemon(pokeId)
    if (pokeFlipped === "back") {
        image.src = pokeHash.sprites.front
        image.dataset.flipped = "front"
    } else {
        image.src = pokeHash.sprites.back
        image.dataset.flipped = "back"
    } 
}
function getPokemon(idToFind) {
    for (let pokemon of POKEMON) {
        if (pokemon.id == idToFind ) {
            return pokemon
        }
    }
}

function filterPokemon(event) {
    let searchQuery = event.currentTarget.value.toLowerCase()
    let all_containers = document.querySelectorAll(".pokemon-container")
    for (let container of all_containers) {
        if (container.querySelector("h1").innerText.includes(searchQuery)) {
            container.style.display = "block"
        } else {
            container.style.display = "none"
        }
    }
}

