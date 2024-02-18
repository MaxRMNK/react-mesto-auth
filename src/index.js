import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-mesto-auth">
      {/*
      Параметр `basename="/react-mesto-auth"` добавлен для того, чтобы на GitHub Pages приложение работало нормально.
      GitHub Pages дает репозитариям бесплатные адреса, где проект находится в директории: "maxrmnk.github.io/react-mesto-auth/",
      а без параметра "basename" Реакт Роутер считает домашней корневую директорию, в итоге все работает криво.
      */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
