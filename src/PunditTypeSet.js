import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class PunditTypeSet extends Component {

  static displayName = 'PunditTypeSet';

  static propTypes = {
    type: PropTypes.string,
    model: PropTypes.any,
    element: PropTypes.any,
  };

  static defaultProps = {
    type: '',
    model: null,
    element: 'span',
  };

  static childContextTypes = {
    punditType: PropTypes.string,
    punditModel: PropTypes.any,
  };

  getChildContext() {
    return { punditType: this.props.type, punditModel: this.props.model };
  }

  render() {
    if (Children.count(this.props.children) > 1) {
      return React.createElement(this.props.element, {
        className: 'PunditTypeSet'
      }, this.props.children);
    }
    return this.props.children;
  }
}

export default PunditTypeSet;
