import "../css/WikipediaArticleCard.css";
import { useBookmarkContext } from "../contexts/BookmarkContext";

function WikipediaArticleCard({ article }) {
    const { isBookmarked, addToBookmarks, removeFromBookmarks } = useBookmarkContext();
    const bookmarked = isBookmarked(article.title);

    function onBookmarkClick(e) {
        e.preventDefault();
        if (bookmarked) removeFromBookmarks(article.title);
        else addToBookmarks(article);
    }

    return (
        <div className="wiki-card">
                <h2>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </h2>
                <p>{article.summary}</p>
                <button className={`bookmark-btn ${bookmarked ? "active" : ""}`} onClick={onBookmarkClick}>
                    🔖
                </button>
        </div>
    );
}

export default WikipediaArticleCard;