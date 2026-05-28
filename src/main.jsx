import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import MotionPage from './testing/MotionPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionPage />
  </React.StrictMode>,
);
