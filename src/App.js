import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexRouter from './router/IndexRouter';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
