document.addEventListener('DOMContentLoaded', () => {
    const abilitiesContainer = document.getElementById('abilities-container');

    const createAbilityCard = (name, description) => {
        const card = document.createElement('div');
        card.className = 'ability-card';

        const abilityName = document.createElement('div');
        abilityName.className = 'ability-name';
        abilityName.textContent = name;

        const abilityDescription = document.createElement('div');
        abilityDescription.className = 'ability-description';
        abilityDescription.textContent = description;

        card.appendChild(abilityName);
        card.appendChild(abilityDescription);

        return card;
    };

    const fetchAbilityData = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/ability?limit=50');
            const data = await response.json();
            const abilityList = data.results;

            for (const ability of abilityList) {
                const res = await fetch(ability.url);
                const abilityData = await res.json();

                const name = abilityData.name;
                const description = abilityData.effect_entries.find(entry => entry.language.name === 'en').effect;

                const abilityCard = createAbilityCard(name, description);
                abilitiesContainer.appendChild(abilityCard);
            }
        } catch (error) {
            console.error('Error fetching abilities data:', error);
        }
    };

    fetchAbilityData();
});