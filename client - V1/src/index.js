import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);