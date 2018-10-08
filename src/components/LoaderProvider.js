import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export const loaderShape = PropTypes.shape({});

export class LoaderProvider extends Component {

  getChildContext() {
    const {loader} = this.props;
    return { loader };
  }

  render() {
    const {children} = this.props;
    return Children.only(children);
  }
}


LoaderProvider.propTypes = {
  loader: loaderShape.isRequired,
  children: PropTypes.element.isRequired,
};
LoaderProvider.childContextTypes = {
  loader: loaderShape.isRequired
};

export default LoaderProvider;
