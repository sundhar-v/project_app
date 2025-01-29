import React from 'react';
import "./Header.css"

import Logo from '../../assets/favicon.png'
import IIMALogo from '../../assets/IIMA_NewLOGO.jpg'

import HeaderPropTypes from "./Header.propTypes"

import { PAGE_DETAIL } from '../../utils/constants';

const Header = ({ currentPage, setCurrentPage }) => {
  return <header className="navbar bg-secondary">
    <section className="navbar-section ml-2">
      <img height={"35px"} width={"35px"} src={Logo} alt="IIMA" />
      <span className="text-dark m-2"><b>{"Vehicle Routing with Time Windows"}</b></span>
    </section>
    <section className="navbar-center">
      {PAGE_DETAIL.map(page => 
        <a
          key={page.id}
          className={
            page.id === currentPage ?
              "btn btn-link text-primary mr-2 ml-2" :
              "btn btn-link text-dark mr-2 ml-2"
          }
          onClick={() => setCurrentPage(page.id)}
        >
          {page.name}
        </a>
      )}
    </section>
    <section className="navbar-section mr-2">
      <img height={"35px"} width={"35px"} src={IIMALogo} alt="IIMA" />
    </section>
  </header>
}

Header.propTypes = HeaderPropTypes;

export default Header