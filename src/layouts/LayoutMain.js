import React, {Fragment} from 'react';

export default ({children}) => (
  <Fragment>
    <header>This is the header</header>
    <section>{children}</section>
    <footer>This is the footer</footer>
  </Fragment>
);
