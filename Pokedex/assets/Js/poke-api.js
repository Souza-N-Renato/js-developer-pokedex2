// Api object
const pokeApi = {}

// Converts the output from the pokeapi to a better understandable class with variables.
function convertPokeApiDetailToPokemon(pokeDetail, pokeDetail2) {
    // Creates a new class Pokemon.
    const pokemon = new Pokemon();

    // Basic values PokemonModel for him.
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;
    
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    pokemon.gender = pokeDetail.gender_rate;//to implement


    // Abilities array
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.habilities = abilities;

    // Moves array
    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    const movesType = pokeDetail.moves.map((moveSlot) => moveSlot.move.type);
    pokemon.movesType = movesType.slice(0,2);
    const [move, move1, move2, move3] = moves;
    pokemon.moves = moves.slice(0, 6);
    

    // Move Powers array
    const movesPower = pokeDetail.stats.map((statSlot) => statSlot.base_stat);
    pokemon.movesPower = movesPower;

    // Calculating total power Base Status
    pokemon.totalPower = movesPower.reduce((total, power) => total + power, 0);

    
    // If the second fetch informations isn't undefined it won't be applied. 
    // Also prevents it from loading on the main page, causing some errors 
    // and not letting the pokemon list appear on the screen.


    // Create a second Base Status
    if(pokeDetail2)
    {
        // Pokemons group array
        const groups = pokeDetail2.egg_groups.map((group) => group.name);
        pokemon.groups = groups;

        // Pokemons specie details array
        const specie = pokeDetail2.genera.map((genera) => genera.genus);
        pokemon.specie = specie[7];


        pokemon.habitat = pokeDetail2.habitat.name;
        pokemon.color = pokeDetail2.color.name;

    }

    // Returns the pokemon with the values above for further use.
    return pokemon;
}

// HTTP Request for pokemon details 
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// HTTP Request for pokemon list
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))// Getting details
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// HTTP Request for pokemons information.
pokeApi.getPokemonInformation = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const url1 = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    const fetchPromise1 = fetch(url).then(response => response.json());
    const fetchPromise2 = fetch(url1).then(response => response.json());

    // Fetching the 2 datas and sending to one handler.
    return Promise.all([fetchPromise1, fetchPromise2])
        .then(([data1, data2]) => {return convertPokeApiDetailToPokemon(data1, data2);})
}