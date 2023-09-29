import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';

const init = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
};

init();
