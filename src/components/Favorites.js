import React from 'react';

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="favorites-panel">
      <h3>My Library ({favorites.length})</h3>
      {favorites.length === 0 ? <p>No books saved yet.</p> : (
        <ul>
          {favorites.map(book => (
            <li key={book.id}>
              <span>{book.volumeInfo.title}</span>
              <button onClick={() => onRemove(book)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;