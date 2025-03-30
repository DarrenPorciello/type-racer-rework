import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Start from './Start';
import Start2 from './Start2';
import Instruction from './Instruction';
import Game from './Game';
import EndPage from './EndPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/start" element={<Start />} />
        <Route path="/start-2" element={<Start2 />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/game" element={<Game />} />
        <Route path="/end" element={<EndPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
