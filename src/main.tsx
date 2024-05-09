import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/root/root.css'
import './styles/root/rules.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom'
import { BasketProvider } from './context/BasketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BasketProvider>
        <App />
      </BasketProvider>
    </BrowserRouter>,
  </React.StrictMode>,
)
