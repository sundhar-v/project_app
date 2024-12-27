import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Algorithm from './container/Algorithm/Algorithm';
import AppHeader from './container/AppHeader/AppHeader';

import { PAGE_IDS } from './utils/constants';

const App = () => {

  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(PAGE_IDS[0])
  }, [])

  return (
    <>
      <AppHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Algorithm 
        currentPage={currentPage}
      />
    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

