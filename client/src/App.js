import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import LandingPage from './components/LandingPage';
// import Navbar from './components/Navbar';
import StatsFunc from './components/Stats';
import './App.css'
import { useSelector } from 'react-redux';

export default function App() {
  const mode = useSelector((state) => state.ColorModeReducer)

  return (
    <div>
      <div className={mode === 1 ? 'App light-mode' : 'App dark-mode'}>
        <Router>
          
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/stats' element={<StatsFunc />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}
