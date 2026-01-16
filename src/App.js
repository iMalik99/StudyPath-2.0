import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Favorites from './components/Favorites';
import AIInsights from './components/AIInsights';
import Dashboard from './components/Dashboard';
import { getAIProcessing } from './services/aiService';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('dashboard');
  // --- NEW: Search History State ---
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('studyPath_favs')) || [];
    setFavorites(savedFavs);

    // Load History from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('studyPath_history')) || [];
    setHistory(savedHistory);
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;

    // --- NEW: Update History Logic ---
    const updatedHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('studyPath_history', JSON.stringify(updatedHistory));

    setView('search');
    setLoading(true);
    setAiData(null); 
    
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`);
      const data = await res.json();
      const fetchedBooks = data.items || [];
      setBooks(fetchedBooks);

      if (fetchedBooks.length > 0) {
        const aiResult = await getAIProcessing(query, fetchedBooks);
        setAiData(aiResult);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (book) => {
    const isFav = favorites.find(f => f.id === book.id);
    const updated = isFav ? favorites.filter(f => f.id !== book.id) : [...favorites, book];
    setFavorites(updated);
    localStorage.setItem('studyPath_favs', JSON.stringify(updated));
  };

  const clearFavorites = () => {
    if (window.confirm("Are you sure you want to clear your entire library?")) {
      setFavorites([]);
      localStorage.removeItem('studyPath_favs');
    }
  };

  const deleteHistoryItem = (e, termToDelete) => {
  e.stopPropagation(); // Prevents the search from triggering when clicking 'X'
  const updatedHistory = history.filter(item => item !== termToDelete);
  setHistory(updatedHistory);
  localStorage.setItem('studyPath_history', JSON.stringify(updatedHistory));
};

const recommendedTopics = ["Artificial Intelligence", "Quantum Physics", "World History", "Psychology", "Sustainable Energy"];

  return (
    <div className="App">
      <header className="hero">
        <h1 onClick={() => setView('dashboard')} style={{cursor: 'pointer'}}>
          StudyPath <span>Explorer</span>
        </h1>
        <SearchBar onSearch={handleSearch} />
        <div className="topic-suggestions">
  {recommendedTopics.map((topic, index) => (
    <button 
      key={index} 
      className="topic-pill"
      onClick={() => handleSearch(topic)}
    >
      {topic}
    </button>
  ))}
</div>
      </header>

      <main className="container">
        {loading ? (
          <div className="loader">Searching for the best resources...</div>
        ) : (
          <>
            {view === 'dashboard' ? (
              <Dashboard 
                favorites={favorites} 
                onRemove={toggleFavorite} 
                onClearAll={clearFavorites}
                // --- Pass history to dashboard if you want it there too ---
                history={history}
                onHistoryClick={handleSearch}
              />
            ) : (
              <div className="layout">
                <section className="main-content">
                  <button className="back-btn" onClick={() => setView('dashboard')}>
                    ← Back to Dashboard
                  </button>
                  {aiData && <AIInsights aiData={aiData} />}
                  <BookList 
                    books={books} 
                    onFavorite={toggleFavorite} 
                    favorites={favorites} 
                    aiSummaries={aiData?.summaries}
                    aiRelevance={aiData?.relevance}
                  />
                </section>
                <aside className="sidebar">
                  {/* --- NEW: History Section in Sidebar --- */}
                  <div className="history-container">
                    <h3>Recent Searches</h3>
                    {history.length > 0 ? (
                      <ul className="history-list">
  {history.map((term, index) => (
    <li key={index} onClick={() => handleSearch(term)} className="history-item">
      <span>🔍 {term}</span>
      <button 
        className="delete-history-btn" 
        onClick={(e) => deleteHistoryItem(e, term)}
      >
        ×
      </button>
    </li>
  ))}
</ul>
                    ) : (
                      <p className="empty-text">No recent searches</p>
                    )}
                  </div>
                  <Favorites favorites={favorites} onRemove={toggleFavorite} />
                </aside>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;