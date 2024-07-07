async function searchPokemon() {
    const input = document.getElementById('pokemon-input').value.toLowerCase();
    const infoDiv = document.getElementById('pokemon-info');
    infoDiv.innerHTML = ''; 

    if (!input) {
        infoDiv.innerHTML = '<p class="error">Please enter a Pokémon name or ID.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        infoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayPokemonInfo(data) {
    const infoDiv = document.getElementById('pokemon-info');

    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const imgSrc = data.sprites.front_default;
    const height = data.height / 10; 
    const weight = data.weight / 10; 
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    infoDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${imgSrc}" alt="${name}">
        <p><strong>Height:</strong> ${height} m</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Types:</strong> ${types}</p>
    `;
}