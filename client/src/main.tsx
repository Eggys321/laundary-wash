import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx';
import AppProviders from '@/providers/AppProviders.tsx';
import "@/styles/globals.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>

    <App />
    </AppProviders>
  </StrictMode>,
)
