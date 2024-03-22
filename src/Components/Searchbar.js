import React, { useState } from 'react';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value.trim());
    };

    const handleSearch = () => {
        if (searchInput === "") {
            alert("Please enter a valid search term.");
            return;
        }

        // Simulate searching class list
        const searchResultsData = searchClassList(searchInput);
        setSearchResults(searchResultsData);
    };

    const searchClassList = (query) => {
        // Simulate searching class list based on query
        // This can be replaced with actual data retrieval logic
        const results = [
            { title: "Lecture Slides", url: "lecture_slides.pdf" },
            { title: "Assignments", url: "assignments.html" },
            // Other search results...
        ].filter(result => result.title.toLowerCase().includes(query.toLowerCase()));
        
        return results;
    };

    return (
        <div>
            <input
                id="searchInput"
                type="text"
                value={searchInput}
                onChange={handleInputChange}
            />
            <button id="searchButton" onClick={handleSearch}>Search</button>
            <div id="searchResults">
                {searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    searchResults.map(result => (
                        <div key={result.title}>
                            <p><a href={result.url} className="list-group-item list-group-item-action">{result.title}</a></p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchBar;