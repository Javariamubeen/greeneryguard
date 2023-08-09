import React from 'react';


const Crumbs = ({ path }) => {

  return (
    <div>
      <div className="burg-path">{path}</div>
      <div className="orange-bar"></div>
    </div>
  );
}

export default Crumbs;