import React, {Component} from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

const actionTypesCheckers = {
  string: value => actionTypesCheckers.regexp(new RegExp(`^${value}$`)),
  regexp: regexp => action => regexp.test(action.type)
};

const parseValidators = validators => (validators && validators.map ? validators : [validators])
  .map(v => v.type || v)
  .map(v => actionTypesCheckers[typeof (v)](v) || v);

const validatorArray = validators => (action) => {
  for (let i = 0; i < validators.length; i++) {
    if (validators[i](action)) return true;
  }
  return false;
};

export default (validators = []) => (Cmp) => {
  class WrapperComponent extends Component {

    constructor(props) {
      super(props);
      this.unsubscribe = noop => noop;
      this.state = {loading: false};
      this.validate = validatorArray(parseValidators(validators));
    }

    componentWillMount() {
      this.unsubscribe();
    }

    componentDidMount() {
      const {loader} = this.context;
      this.unsubscribe = loader.subscribe((action) => {
        this.setState((prevState, props) => ({loading: this.validate(action)}));
      });
    }

    render() {
      const {loading} = this.state;
      return (<Cmp {...this.props} loading={loading} />);
    }
  }

  WrapperComponent.contextTypes = {
    loader: PropTypes.shape({})
  };
  WrapperComponent.displayName = `withLoader(${Cmp.displayName || Cmp.name})`;
  WrapperComponent.WrappedComponent = Cmp;

  // if (__DEV__) {
  //   // C.propTypes = {
  //   //   wrappedComponentRef: PropTypes.func
  //   // };
  // }

  return hoistStatics(WrapperComponent, Cmp);
};
