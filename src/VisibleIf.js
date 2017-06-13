import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';

class VisibleIf extends PunditComponent {

  static displayName = 'VisibleIf';

  static propTypes = {
    ...PunditComponent.propTypes,
    element: PropTypes.element,
  };

  static defaultProps = {
    ...PunditComponent.defaultProps,
    element: React.DOM.span,
  };

  render() {
    if (this.passesPermissions()) {
      if (React.Children.count(this.props.children) > 1) {
        const Wrapper = this.props.element;
        return <Wrapper className="VisibleIf">{this.props.children}</Wrapper>;
      }
      return this.props.children;
    }
    return null;
  }
}

export default VisibleIf;
