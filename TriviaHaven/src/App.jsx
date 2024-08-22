import React from "react"
import './App.css'
import Home from './components/index.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionsList from './components/questions.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<QuestionsList />} />
      </Routes>
        
    </Router>
  )
}

export default App
