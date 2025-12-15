import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import GlobalStyles from "./styles/GlobalStyles";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <GlobalStyles />
      <App />
    </Router>
  </StrictMode>,
)
