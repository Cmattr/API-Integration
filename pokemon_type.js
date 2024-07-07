document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    const typeColors = {
        grass: '#78C850',
        fire: '#F08030',
        water: '#6890F0',
        // Add more type colors as needed
    };

    const createTypeContainer = (type) => {
        const div = document.createElement('div');
        div.className = `type-container ${type}`;
        div.style.borderColor = typeColors[type] || '#ddd';
        
        const title = document.createElement('div');
        title.className = 'type-title';
        title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        
        div.appendChild(title);
        return div;
    };

    const fetchPokemonData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const data = await response.json();
            const pokemonList = data.results;

            const typeContainers = {};

            for (const pokemon of pokemonList) {
                const res = await fetch(pokemon.url);
                const pokeData = await res.json();

                pokeData.types.forEach(typeInfo => {
                    const type = typeInfo.type.name;

                    if (!typeContainers[type]) {
                        typeContainers[type] = createTypeContainer(type);
                    }

                    const pokeDiv = document.createElement('div');
                    pokeDiv.className = 'pokemon';

                    const pokeImg = document.createElement('img');
                    pokeImg.src = pokeData.sprites.front_default;

                    const pokeName = document.createElement('div');
                    pokeName.className = 'pokemon-name';
                    pokeName.textContent = pokeData.name;

                    pokeDiv.appendChild(pokeImg);
                    pokeDiv.appendChild(pokeName);

                    typeContainers[type].appendChild(pokeDiv);
                });
            }

            Object.values(typeContainers).forEach(container.appendChild.bind(container));

        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    fetchPokemonData();
});