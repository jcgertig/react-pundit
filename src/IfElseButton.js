import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';
import omit from 'lodash.omit';

/* istanbul ignore next */
let noop = () => {};

class IfElseButton extends PunditComponent {

  static displayName = 'IfElseButton';

  static propTypes = {
    ...PunditComponent.propTypes,
    className: PropTypes.string,
    ifClick: PropTypes.func,
    elseClick: PropTypes.func,
    element: PropTypes.any
  };

  static defaultProps = {
    ...PunditComponent.defaultProps,
    className: '',
    ifClick: noop,
    elseClick: noop,
    element: 'button',
  };

  handleClick = (e) => {
    if (this.passesPermissions()) {
      this.props.ifClick(e);
    } else {
      this.props.elseClick(e);
    }
  };

  render() {
    const { element, children, className, rest } = this.props;
    const passProps = omit(this.props, Object.keys(IfElseButton.propTypes));
    return React.createElement(element, {
      className: `IfElseButton ${className}`.trim(),
      onClick: this.handleClick,
      ...passProps
    }, children);
  }
}

export default IfElseButton;
