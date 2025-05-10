import React, { useState } from "react";
import axios from "axios"; // Import Axios

const SearchWikipedia = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (event) => {
        const queryValue = event.target.value;
        setQuery(queryValue);

        if (queryValue.length < 3) return; // Prevent unnecessary API calls for short input

        try {
            const response = await axios.get("/search/", {
                params: { query: queryValue, limit: 5 }
            });
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search Wikipedia..."
                value={query}
                onChange={handleSearch}
            />
            <div>
                {results.map((item) => (
                    <p key={item.pageid}>
                        <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </a>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SearchWikipedia;
