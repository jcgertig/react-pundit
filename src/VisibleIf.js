import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';

class VisibleIf extends PunditComponent {

  static displayName = 'VisibleIf';

  render() {
    if (this.passesPermissions()) {
      if (React.Children.count(this.props.children) > 1) {
        return <span className="VisibleIf">{this.props.children}</span>;
      }
      return this.props.children;
    }
    return null;
  }
}

export default VisibleIf;
