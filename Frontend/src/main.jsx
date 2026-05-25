import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ViewProvider } from './context/ViewContext'; // 👈 Import the new provider
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ViewProvider> {/* 👈 Wrap your App inside it */}
        <App />
      </ViewProvider>
    </AuthProvider>
  </React.StrictMode>
);