import React from 'react';
import Header from "../../component/Header/Header"

import AppHeaderPropTypes from './AppHeader.propTypes';

const AppHeader = ({ currentPage, setCurrentPage }) =>{
  return <Header 
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  />
}

AppHeader.propTypes = AppHeaderPropTypes;

export default AppHeader