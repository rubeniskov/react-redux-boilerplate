import React from 'react';
import { connect } from 'react-redux';

export const UserViewData = ({user = {}}, context) => (
  <span>
    {`${user.surname || ''}, ${user.name || ''}`}
  </span>
);

export default connect(state => ({
  user: state.home.user
}))(UserViewData);
