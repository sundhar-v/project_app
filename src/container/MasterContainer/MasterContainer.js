import React from 'react';

import MasterContainerPropTypes from './MasterContainer.propTypes';

const MasterContainer = ({currentPage}) => {
  return (
    <div>
      {currentPage}
    </div>
  )
}

MasterContainer.propTypes = MasterContainerPropTypes;

export default MasterContainer