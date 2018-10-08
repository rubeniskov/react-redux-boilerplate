import React from 'react';
import { connect } from 'react-redux';
import withReduxLoader from '@local/utils/withReduxLoader';

export const UserLoadButton = ({loading, ...props}, context) => (
  <button type="button" {...props} disabled={loading}>{loading ? 'cargando pecador' : 'load'}</button>
);

export default connect(
  null,
  dispatch => ({
    onClick: event => dispatch({type: 'USER_LOAD'})
  })
)(withReduxLoader(['USER_LOADING'])(UserLoadButton));
