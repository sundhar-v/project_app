import React from 'react';

import RouteNavPropTypes from './RouteNav.propTypes';

const RouteNav = ({ finalNumberOfRoutes, currentRoute, setCurrentRoute }) => {
  return (
    <ul className="pagination">
      <li className={currentRoute === 1 ? "page-item disabled c-not-allowed" : "page-item c-hand"} key="prev">
        <a onClick={() => setCurrentRoute(currentRoute-1)} tabIndex="-1">Previous</a>
      </li>
      {Array.from({length: finalNumberOfRoutes}).map((e, i) => (
        <li className={currentRoute === i+1 ? "page-item active c-hand" : "page-item c-hand"} key={"Route "+(i+1)}>
          <a onClick={() => setCurrentRoute(i+1)}>{"Route "+(i+1)}</a>
        </li>
      ))}
      <li className={currentRoute === finalNumberOfRoutes ? "page-item disabled c-not-allowed" : "page-item c-hand"} key="next">
        <a onClick={() => setCurrentRoute(currentRoute+1)}>Next</a>
      </li>
    </ul>
  )
}

RouteNav.propTypes = RouteNavPropTypes

export default RouteNav