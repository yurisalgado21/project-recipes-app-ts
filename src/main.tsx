import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DataProvider from './context/DataProvider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>,
  );
