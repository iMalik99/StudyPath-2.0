import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onFavorite, favorites, aiData }) => {
  return (
    <div className="book-list">
      {books.map((book, index) => {
        // We find the specific insight by its position in the array
        const specificInsight = aiData?.insights ? aiData.insights[index] : null;
        
        return (
          <BookCard 
            key={book.id} 
            book={book} 
            onFavorite={onFavorite}
            isFavorite={favorites.some(f => f.id === book.id)}
            aiInsight={specificInsight} 
          />
        );
      })}
    </div>
  );
};

export default BookList;