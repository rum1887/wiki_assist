// import React, { useState } from "react";
// import axios from "axios";

// const SearchWikipedia = () => {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);
//     const [suggestions, setSuggestions] = useState([]);
    
//     const handleInputChange = async (event) => {
//         const queryValue = event.target.value;
//         setQuery(queryValue);
        
//         if (queryValue.length < 3) {
//             setSuggestions([]);
//             return;
//         }

//         try {
//             const response = await axios.get("/search/", { params: { query: queryValue, limit: 5 } });
//             setSuggestions(response.data);
//         } catch (error) {
//             console.error("Error fetching autocomplete suggestions:", error);
//         }
//     };

//     const handleSelectSuggestion = (title) => {
//         setQuery(title);
//         fetchSearchResults(title);
//         setSuggestions([]); // Hide suggestions
//     };

//     const fetchSearchResults = async (searchQuery) => {
//         try {
//             const response = await axios.get("/search/", { params: { query: searchQuery, limit: 5 } });
//             setResults(response.data);
//         } catch (error) {
//             console.error("Error fetching search results:", error);
//         }
//     };

//     return (
//         <div>
//             <input type="text" placeholder="Search Wikipedia..." value={query} onChange={handleInputChange} />
            
//             {/* Autocomplete Dropdown */}
//             {suggestions.length > 0 && (
//                 <ul>
//                     {suggestions.map((item) => (
//                         <li key={item.pageid} onClick={() => handleSelectSuggestion(item.title)}>
//                             {item.title}
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* Search Results */}
//             <div>
//                 {results.map((item) => (
//                     <p key={item.pageid}>
//                         <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">
//                             {item.title}
//                         </a>
//                     </p>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchWikipedia;

import React, { useState } from "react";
import SearchWikipedia from "./components/SearchWiki";
import SavedArticles from "./components/savedArticles";

const App = () => {
    const [SavedArticles, setSavedArticles] = useState([]);

    const handleSaveArticle = (article) => {
        const category = prompt("Enter category for this article:");
        if (category) {
            setSavedArticles([...SavedArticles, { ...article, category }]);
        }
    };

    return (
        <div>
            <h1>Wikipedia Search</h1>
            <SearchWikipedia onSave={handleSaveArticle} />
            <SavedArticles SavedArticles={SavedArticles} />
        </div>
    );
};

export default App;

