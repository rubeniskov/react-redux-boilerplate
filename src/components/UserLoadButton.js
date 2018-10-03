import React from 'react';
import { connect } from 'react-redux';

export const UserLoadButton = ({loading, ...props}, context) => {
    return (
      <button {...props}>{loading ? 'cargando pecador' : 'load'}</button>
    )
  }

export default connect( (state) => ({loading: state.user.loading}), (dispatch) => ({
    onClick: (event) => { dispatch({type: 'USER_LOAD'}) }
  })
  )(UserLoadButton)