import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './components/Quiz/Quiz';
import './index.css';
import questions from './questions.json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Quiz questions={questions} />
  </React.StrictMode>
);
