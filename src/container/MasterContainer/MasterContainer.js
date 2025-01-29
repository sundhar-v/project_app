import React from 'react';

import { PAGE_DETAIL } from '../../utils/constants';

import Home from '../Home/Home';
import GetStarted from '../GetStarted/GetStarted';
import About from '../About/About';

import NotFound from '../../component/NotFound/NotFound';

import MasterContainerPropTypes from './MasterContainer.propTypes';

const MasterContainer = ({currentPage}) => {
  return currentPage === PAGE_DETAIL[0].id 
    ? <Home /> 
    : currentPage === PAGE_DETAIL[1].id
      ? <GetStarted />
      : currentPage === PAGE_DETAIL[2].id
        ? <About />
        : <NotFound />
}

MasterContainer.propTypes = MasterContainerPropTypes;

export default MasterContainer