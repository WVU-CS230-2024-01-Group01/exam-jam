document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the search query parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    if (query) {
        // Simulate searching class list
        const searchResultsData = searchClassList(query);
        displaySearchResults(searchResultsData);
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
    // Clear previous search results
    searchResults.innerHTML = "";

    if (results.length === 0) {
        searchResults.innerHTML = "<p style='margin: 20px;'>No results found.</p>";
        return;
    }

    // Display search results
    results.forEach(result => {
        const resultElement = document.createElement("div");
        resultElement.innerHTML = `<p><a href="${result.url}" class="list-group-item list-group-item-action">${result.title}</a></p>`;
        searchResults.appendChild(resultElement);


    });
}