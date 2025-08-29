import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('[ENV] VITE_GEMINI_API_KEY =', import.meta.env.VITE_GEMINI_API_KEY)
console.log('[ENV] VITE_FSQ_API_KEY    =', import.meta.env.VITE_FSQ_API_KEY)
console.log('[ENV] MODE                =', import.meta.env.MODE)

// Basic PWA service worker registration
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch(() => {});
//   });
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
