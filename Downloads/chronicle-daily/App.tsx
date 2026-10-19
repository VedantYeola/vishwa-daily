import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import About from './pages/About';

import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen flex flex-col selection:bg-red-100 selection:text-red-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/article/:articleId" element={<Article />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
