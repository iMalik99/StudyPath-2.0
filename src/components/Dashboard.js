import React, { useState, useEffect } from 'react';

const Dashboard = ({ favorites, onRemove, onClearAll, history, onHistoryClick}) => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const quotes = [
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
    { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "Investment in knowledge pays the best interest.", author: "Benjamin Franklin" }
  ];

  useEffect(() => {
    // Selects a random quote on component load
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Calculate the most frequent category
  const categories = favorites.map(b => b.volumeInfo.categories?.[0] || "General");
  const topCategory = categories.length > 0 ? 
    categories.sort((a,b) => categories.filter(v => v===a).length - categories.filter(v => v===b).length).pop() 
    : "Discovery";

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats">
        {/* Stat 1: Library Size */}
        <div className="stat-card">
          <h4>Library Size</h4>
          <p className="stat-number">{favorites.length}</p>
          <span>Saved Resources</span>
        </div>

        {/* Stat 2: Top Subject */}
        <div className="stat-card">
          <h4>Top Focus</h4>
          <p className="stat-number" style={{fontSize: '1.6rem', marginTop: '20px'}}>
            {topCategory}
          </p>
          <span>Based on your saves</span>
        </div>

        {/* NEW Stat 3: Quote of the Day */}
        <div className="stat-card quote-card">
          <h4>Daily Inspiration</h4>
          <div className="quote-content">
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">— {quote.author}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="recent-activity">
          <h3>Your Collection</h3>
          {favorites.length > 0 ? (
            <div className="mini-book-grid">
              {favorites.map(book => (
                <div key={book.id} className="mini-card">
                  <img src={book.volumeInfo.imageLinks?.thumbnail} alt="cover" />
                  <div className="mini-card-info">
                    <h5>{book.volumeInfo.title}</h5>
                    <button onClick={() => onRemove(book)}>Remove from Path</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Your StudyPath is currently empty. Start by searching for a topic above!</p>
            </div>
          )}
        </section>

        <aside className="dashboard-sidebar">
          <div className="stat-card">
            <h4>Quick Jump</h4>
            <div className="history-tags">
              {history.map((term, i) => (
                <span key={i} className="history-tag" onClick={() => onHistoryClick(term)}>
                  {term}
                </span>
              ))}
            </div>
          </div>

        <div className="stat-card settings-card" style={{marginTop: '30px', background: '#fffafa'}}>
           <h4>Account Control</h4>
           <p style={{fontSize: '0.8rem', color: '#64748b'}}>Reset your library and clear cached data.</p>
           <button className="clear-btn" onClick={onClearAll}>Reset Library</button>
        </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;