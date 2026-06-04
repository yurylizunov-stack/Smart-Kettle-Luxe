import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import BlankPage from './BlankPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlankPage />
  </React.StrictMode>,
);
