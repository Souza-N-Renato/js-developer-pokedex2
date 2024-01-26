
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');


const maxRecords = 151;
const limit = 6;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <a href="pokemon-status.html?id=${pokemon.number}">
            
            <li class="pokemon ${pokemon.type}">
            <span class="number" id="number">${formatOrder(pokemon.number)}</span>
            <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}" />
                    
                </div>
            </li>
        </a>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join(''));
}
loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})
