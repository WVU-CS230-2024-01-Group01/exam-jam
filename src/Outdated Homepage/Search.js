/* We may want to simulate checking account type before searching
    -.i.e. const isProfessor = confirm("Are you a professor?");*/

const homepageURL = "file:///C:/Users/hayde/source/repos/exam-jam/src/Outdated%20Homepage/home.html";

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    //This function simulates updates the displayed search results when the
    function updateSearchResults(query) {
        const searchResultsData = searchClassList(query);
        displaySearchResults(searchResultsData);
    }

    //Hide class box and display "Search results" text
    function configurePageForSearch() {
        document.getElementById("classesBox").style.display = "none"; //hide classes box
        document.getElementById("searchResultsText").style.display = "block"; //show "Search results" text
    }

    function configureDefaultHomePage() {
        document.getElementById("classesBox").style.display = "block"; //hide classes box
        document.getElementById("searchResultsText").style.display = "none"; //show "Search results" text
    }

    // Clears the HTML content of the search results container
    function clearSearchResults() {
        searchResults.innerHTML = ""; 
    }

    //This event listener handles changes when forward/backward buttons are clicked.
    window.addEventListener("popstate", function (event) {
        const urlParams = new URLSearchParams(window.location.search); //
        const query = urlParams.get("q") || "";

        if (query !== "") { //if returning to page with search results
            updateSearchResults(query);
            searchInput.value = query;
            configurePageForSearch();
        } else { //if returning to homepage
            configureDefaultHomePage();
            clearSearchResults();
        }
    });

    searchButton.addEventListener("click", function () {
        const userInput = searchInput.value.trim();

        if (userInput !== "") { //only display search results if the user entered a valid search term

            if (window.location.href === homepageURL) { //if leaving from homepage, hide classbox and display "Search Results" text
                configurePageForSearch();

            }

            updateSearchResults(userInput);  
            const url = new URL(window.location.href); //create new URL based on current URL
            url.searchParams.set("q", userInput); //sets new URL's query parameter to "q" (reads "q=<parameters>" in URL)
            history.pushState({ query: userInput }, "", url.toString()); //pushes new URL onto browswer without reloading page/changing title ("")
        }
    });

    function searchClassList(query) {
        // Simulate searching class list based on query and account type
        // This can be replaced with actual data retrieval logic
        let results = [];
        // if (isProfessor) {
        // Simulate professor search results
        results = [
            { title: "Lecture Slides", url: "lecture_slides.pdf" },
            { title: "Assignments", url: "assignments.html" },
            { title: "Study Guide", url: "study_guide.pdf" },
            { title: "Video Lectures", url: "video_lectures.html" },
            { title: "CS230", url: "assignments.html" },
            { title: "CS320", url: "assignments.html" },
            { title: "CS330", url: "assignments.html" },
            { title: "CS345", url: "assignments.html" },
            { title: "CS340", url: "assignments.html" },
            { title: "CS450", url: "assignments.html" },
            { title: "CS210", url: "assignments.html" },
            { title: "MATH251", url: "assignments.html" },
            { title: "MATH200", url: "assignments.html" },
            { title: "MATH210", url: "assignments.html" },
            { title: "MATH59050", url: "assignments.html" },
            { title: "MATH400", url: "assignments.html" },
            { title: "MATH300", url: "assignments.html" },
            { title: "MATH100", url: "assignments.html" },
            { title: "CPE350", url: "assignments.html" },
            { title: "CPE271", url: "assignments.html" },
            { title: "CPE412", url: "assignments.html" },
            { title: "CPE450", url: "assignments.html" },
            { title: "CPE310", url: "assignments.html" },
            { title: "CPE312", url: "assignments.html" },
            { title: "CPE600", url: "assignments.html" }
        ].filter(result => result.title.toLowerCase().includes(query.toLowerCase()));
        return results;
    }

    function displaySearchResults(results) {
        //Clear previous search results
        searchResults.innerHTML = "";

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        // Display search results
        results.forEach(result => {
            const resultElement = document.createElement("div");
            resultElement.innerHTML = `<p><a href="${result.url}" class="list-group-item list-group-item-action">${result.title}</a></p>`;
            searchResults.appendChild(resultElement);
        });
    }
});


