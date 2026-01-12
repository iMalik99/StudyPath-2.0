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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('studyPath_favs')) || [];
    setFavorites(saved);
  }, []);

  const handleSearch = async (query) => {
    setView('search');
    setLoading(true);
    setAiData(null); 
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`);
      const data = await res.json();
      const fetchedBooks = data.items || [];
      setBooks(fetchedBooks);

      if (fetchedBooks.length > 0) {
        const insights = await getAIProcessing(query, fetchedBooks);
        setAiData(insights);
      }
    } catch (err) {
      console.error(err);
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

  return (
    <div className="App">
      <header className="hero">
        <h1 onClick={() => setView('dashboard')} style={{cursor: 'pointer'}}>
          StudyPath <span>Explorer</span>
        </h1>
        <SearchBar onSearch={handleSearch} />
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