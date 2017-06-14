import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';

class VisibleIf extends PunditComponent {

  static displayName = 'VisibleIf';

  static propTypes = {
    ...PunditComponent.propTypes,
    element: PropTypes.any,
  };

  static defaultProps = {
    ...PunditComponent.defaultProps,
    element: 'span',
  };

  render() {
    if (this.passesPermissions()) {
      if (React.Children.count(this.props.children) > 1) {
        return React.createElement(this.props.element, {
          className: 'VisibleIf'
        }, this.props.children);
      }
      return this.props.children;
    }
    return null;
  }
}

export default VisibleIf;
