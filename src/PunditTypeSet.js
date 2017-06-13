import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class PunditTypeSet extends Component {

  static displayName = 'PunditTypeSet';

  static propTypes = {
    type: PropTypes.string,
    model: PropTypes.any,
    element: PropTypes.element,
  };

  static defaultProps = {
    type: '',
    model: null,
    element: React.DOM.span,
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
      const Wrapper = this.props.element;
      return <Wrapper className="PunditTypeSet">{this.props.children}</Wrapper>;
    }
    return this.props.children;
  }
}

export default PunditTypeSet;
