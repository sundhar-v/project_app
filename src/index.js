import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Algorithm from './container/Algorithm/Algorithm';
import Header from './container/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <Algorithm />
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

