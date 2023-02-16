import React from 'react';
import './App.css';
import Footer from './components/elements/Footer';
import Navbar from './components/elements/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div id='app'>
      <header>
        <Navbar />
      </header>
      <main>
        <HomePage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
