import React, { useState } from "react";

const SavedArticles = ({ savedArticles }) => {
    const [filterCategory, setFilterCategory] = useState("");

    const uniqueCategories = [...new Set(savedArticles.map(article => article.category))];

    return (
        <div>
            <h2>Saved Articles</h2>
            
            {/* Category Filter */}
            <label>Filter by Category: </label>
            <select onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All</option>
                {uniqueCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {/* Display Saved Articles */}
            <div>
                {savedArticles.filter(article => filterCategory === "" || article.category === filterCategory).map((article) => (
                    <p key={article.pageid}>
                        <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a> ({article.category})
                    </p>
                ))}
            </div>
        </div>
    );
};

export default SavedArticles;