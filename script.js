document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const suggestions = document.getElementById('suggestions');
    const results = document.getElementById('results');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length > 2) {
            fetchSuggestions(query);
        } else {
            suggestions.innerHTML = '';
        }
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            searchRecipes(query);
        }
    });

    function fetchSuggestions(query) {
        // Mock API call for suggestions
        const mockSuggestions = ['Pizza', 'Pasta', 'Pancakes', 'Pudding'];
        const filteredSuggestions = mockSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        displaySuggestions(filteredSuggestions);
    }

    function displaySuggestions(suggestionsList) {
        suggestions.innerHTML = '';
        suggestionsList.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.classList.add('suggestion-item');
            div.addEventListener('click', () => {
                searchInput.value = item;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(div);
        });
    }

    function searchRecipes(query) {
        // Mock API call for searching recipes
        const mockResults = [
            { name: 'Pizza', ingredients: 'Flour, Cheese, Tomato Sauce', recipe: 'Bake at 200C for 20 minutes' },
            { name: 'Pasta', ingredients: 'Pasta, Tomato Sauce, Cheese', recipe: 'Boil pasta and mix with sauce' }
        ];
        const filteredResults = mockResults.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        displayResults(filteredResults);
    }

    function displayResults(resultsList) {
        results.innerHTML = '';
        resultsList.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('result-item');
            div.innerHTML = `<h3>${item.name}</h3><p>Ingredients: ${item.ingredients}</p><p>Recipe: ${item.recipe}</p>`;
            results.appendChild(div);
        });
    }
});
