document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    searchButton.addEventListener("click", function () {
        const userInput = searchInput.value.trim();

        // Simulate checking account type
        // const isProfessor = confirm("Are you a professor?");

        if (userInput !== "") { //only display search results if the user entered a valid search term

            window.location.href = "Results.html?query=" + encodeURIComponent(userInput);

            // Simulate searching class list
            const searchResultsData = searchClassList(userInput);
            displaySearchResults(searchResultsData);
        }
    });
});