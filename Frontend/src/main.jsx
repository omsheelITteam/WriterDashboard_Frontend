// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import StoreProviders from './Context/StoreProviders.jsx'
// import { AppContext } from './Context/AppContext.jsx'
// createRoot(document.getElementById('root')).render(
//   <StoreProviders>
//   <StrictMode>
//     <App />
//   </StrictMode>
//   </StoreProviders>
// )
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./Context/AppContext.jsx";
import { Toaster } from 'react-hot-toast'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
  <AppContextProvider>
      <Toaster position="top-center" />
      <App />
    </AppContextProvider>
  </BrowserRouter>
    
  // </StrictMode>
);
