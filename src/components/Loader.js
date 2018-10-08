import React from 'react';

export default ({loading, children}) => {
  if (loading) {
    return (<div>Loading</div>);
  }
  return children;
};
