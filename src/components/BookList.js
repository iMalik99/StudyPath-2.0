import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onFavorite, favorites, aiData }) => {
  return (
    <div className="book-list">
      {books.map((book, index) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onFavorite={onFavorite}
          isFavorite={favorites.some(f => f.id === book.id)}
          // Pass the specific insight from the array using the index
          aiInsight={aiData?.insights ? aiData.insights[index] : null}
        />
      ))}
    </div>
  );
};

export default BookList;