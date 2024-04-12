document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const wordDetails = document.getElementById('wordDetails');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchWord = searchForm.elements['searchWord'].value;
        console.log('Search word:', searchWord); // Log the search word

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log('API response:', data); // Log the API response
            displayWordDetails(data);
        } catch (error) {
            console.error('An error occurred:', error);
            wordDetails.innerHTML = 'The word searched for may have a spelling error, please make sure you have the correct spelling and try again.';
        }
    });

    function displayWordDetails(data) {
        // Clear previous results
        wordDetails.innerHTML = '';

        // Assuming the API returns data in a specific format, adjust the following code accordingly
        const word = data[0].word;
        const definition = data[0].meanings[0].definitions[0].definition;
        const phonetic = data[0].phonetic;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        

        const wordElement = document.createElement('h2');
        wordElement.textContent = `Word: ${word}`;

        const definitionElement = document.createElement('h2');
        definitionElement.textContent = `Definition: ${definition}`;

        const phoneticElement = document.createElement('h2');
        phoneticElement.textContent = `Phonetic: ${phonetic}`;

        const partOfSpeechElement = document.createElement('h2');
        partOfSpeechElement.textContent = `Part of speech: ${partOfSpeech}`;

        wordDetails.appendChild(wordElement);
        wordDetails.appendChild(definitionElement);
        wordDetails.appendChild(phoneticElement);
        wordDetails.appendChild(partOfSpeechElement);
    }
});
