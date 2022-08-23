import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './components/Admin';
import Home from './components/Home';
import QuizPage from './components/QuizPage';
import Score from './components/Score';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/quiz/:id" element={<QuizPage/>}></Route>
        <Route path="/score" element = {<Score/>}></Route>
        <Route path="/admin" element = {<Admin/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
