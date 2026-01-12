import React from 'react';

const BookCard = ({ book, onFavorite, isFavorite, aiInsight }) => {
  const info = book.volumeInfo;

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={info.imageLinks?.thumbnail || 'placeholder.jpg'} alt={info.title} />
      </div>
      <div className="book-details">
        <h4>{info.title}</h4>
        <p className="author">{info.authors?.join(', ')}</p>

        <div className="ai-content">
          {/* If aiInsight exists, show description. If not, show the loading text */}
          {aiInsight ? (
            <>
              <p className="brief-desc">
                <strong>AI Summary:</strong> {aiInsight.description}
              </p>
              <p className="relevance">
                ✨ <em>{aiInsight.relevance}</em>
              </p>
            </>
          ) : (
            <p className="loading-text">Analyzing book content...</p>
          )}
        </div>

        <div className="book-actions">
          <a href={info.previewLink} target="_blank" rel="noreferrer" className="read-btn">View Book →</a>
          <button onClick={() => onFavorite(book)} className={`fav-button ${isFavorite ? 'active' : ''}`}>
            {isFavorite ? '❤️ Saved' : '🤍 Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;