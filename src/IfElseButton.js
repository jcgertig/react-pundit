import React from 'react';
import PropTypes from 'prop-types';
import PunditComponent from './PunditComponent';
import omit from 'lodash.omit';

class IfElseButton extends PunditComponent {

  static displayName = 'IfElseButton';

  static propTypes = {
    ...PunditComponent.propTypes,
    className: PropTypes.string,
    ifClick: PropTypes.func,
    elseClick: PropTypes.func,
    element: PropTypes.element,
  };

  static defaultProps = {
    ...PunditComponent.defaultProps,
    className: '',
    ifClick: () => {},
    elseClick: () => {},
    element: React.DOM.button,
  };

  handleClick = (e) => {
    if (this.passesPermissions()) {
      this.props.ifClick(e);
    } else {
      this.props.elseClick(e);
    }
  };

  render() {
    const { element: Button, children, className, rest } = this.props;
    const passProps = omit(this.props, Object.keys(IfElseButton.propTypes));
    return (
      <Button className={`IfElseButton ${className}`.trim()} onClick={this.handleClick} {...passProps}>
        {children}
      </Button>
    );
  }
}

export default IfElseButton;
