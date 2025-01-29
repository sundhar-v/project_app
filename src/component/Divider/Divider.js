import React from 'react';

import DividerPropTypes from './Divider.propTypes';

const Divider = ({leftColumn, rightColumn}) => {
  return <div className="columns">
    <div className="column col-6 text-center">
      {leftColumn}
    </div>
    <div className="divider-vert" data-content="OR"></div>
    <div className="column col-5 text-center">
      {rightColumn}
    </div>
  </div>
}

Divider.propTypes = DividerPropTypes;

export default Divider