import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LearningModule from './pages/LearningModule';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/learning">Learning Module</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning" element={<LearningModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;