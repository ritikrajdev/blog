import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from './components/elements/Footer';
import Navbar from './components/elements/Navbar';
import Routing from './Routing';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div id='app'>
        <header>
          <Navbar />
        </header>
        <main>
          <Routing />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
