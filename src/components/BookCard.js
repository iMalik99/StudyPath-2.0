import React from 'react';

const BookCard = ({ book, onFavorite, isFavorite, aiInsight }) => {
  const info = book.volumeInfo;

  // Use Google's description as a fallback if AI hasn't loaded
  const fallbackDescription = info.description 
    ? info.description.substring(0, 160) + "..." 
    : "No description available for this resource.";

  return (
    <div className="book-card">
      <div className="book-image">
        <img 
          src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'} 
          alt={info.title} 
        />
      </div>
      <div className="book-details">
        <h4>{info.title}</h4>
        <p className="author">{info.authors?.join(', ') || 'Unknown Author'}</p>

        <div className="book-description">
          <p>{fallbackDescription}</p>
        </div>

        {/* AI Section: ONLY shows if aiInsight actually exists */}
        {aiInsight && (
          <div className="ai-content">
            <p className="brief-desc">
              <strong>AI Summary:</strong> {aiInsight.description}
            </p>
            <p className="relevance">
              ✨ <em>{aiInsight.relevance}</em>
            </p>
          </div>
        )}

        <div className="book-actions">
          <a href={info.previewLink} target="_blank" rel="noreferrer" className="read-btn">
            View Details →
          </a>
          <button 
            onClick={() => onFavorite(book)} 
            className={`fav-button ${isFavorite ? 'active' : ''}`}
          >
            {isFavorite ? '❤️ Saved' : '🤍 Save to Path'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;