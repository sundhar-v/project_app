import React from 'react';
import "./Divider.css"

import DividerPropTypes from './Divider.propTypes';

const Divider = ({leftColumn, rightColumn}) => {
  return <div className="columns">
    <div className="column col-6 text-center">
      <div className="content">{leftColumn}</div>
    </div>
    <div className="divider-vert" data-content="OR"></div>
    <div className="column col-5 text-center">
      <div className="content">{rightColumn}</div>
    </div>
  </div>
}

Divider.propTypes = DividerPropTypes;

export default Divider