import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import "./index.css"
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onLoaded={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <MainLayout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/team" element={<Team />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </MainLayout>
      )}
    </>
  );
}

export default App;
