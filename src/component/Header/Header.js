import React from 'react';

import Logo from '../../assets/favicon.png'
import IIMALogo from '../../assets/IIMA_NewLOGO.jpg'

import { PAGE_DETAIL } from '../../utils/constants';

import HeaderPropTypes from "./Header.propTypes"

const Header = ({ currentPage, setCurrentPage }) =>{
  return <nav className="bg-gray-800">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        {/* Hamburger Menu for mobile view */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            
            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            
            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Normal View - Logo and Tabs */}
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
            <img className="h-8 w-auto" src={Logo} alt="Your Company" />
            <div className="px-3 py-2 font-mono text-base font-black text-white">Clarke-Wright with Time Windows</div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">      
              {PAGE_DETAIL.map(page => 
                <a
                  href="#"
                  key={page.id}
                  className={
                    page.id === currentPage ?
                      "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" :
                      "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  onClick={() => setCurrentPage(page.id)}
                >
                  {page.name}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="relative ml-3">
            <div>
              <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <img className="size-8" src={IIMALogo} alt="IIMA Logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile view - Tabs */}
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {PAGE_DETAIL.map(page => 
          <a
            href="#"
            key={page.id}
            className={
              page.id === currentPage ?
                "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" :
                "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            }
            onClick={() => setCurrentPage(page.id)}
          >
            {page.name}
          </a>
        )}
      </div>
    </div>
  </nav>
}

Header.propTypes = HeaderPropTypes;

export default Header