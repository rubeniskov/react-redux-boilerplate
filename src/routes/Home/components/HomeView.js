import React, {Fragment} from 'react';
import UserLoadButton from './UserLoadButton';
import UserViewData from './UserViewData';

export default props => (
  <Fragment>
    <UserLoadButton pepe="juas" />
    <br />
    <UserViewData />
  </Fragment>
);
