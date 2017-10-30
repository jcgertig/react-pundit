import React from 'react';
import omit from 'lodash.omit';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import { IfElseButton, PunditContainer, PunditComponent } from '../src/index';

configure({ adapter: new Adapter() });

describe('IfElseButton', () => {
  describe('static attributes', () => {
    it('have displayName "IfElseButton"', () => {
      expect(IfElseButton.displayName).toEqual('IfElseButton');
    });
    it('have propTypes with keys (className, ifClick, elseClick, element)', () => {
      expect(Object.keys(omit(IfElseButton.propTypes, Object.keys(PunditComponent.propTypes)))).toEqual([
        'className', 'ifClick', 'elseClick', 'element'
      ]);
    });
    it('have defaultProps (className: "", ifClick: noop, elseClick: noop, element: "button")', () => {
      expect(omit(IfElseButton.defaultProps, [...Object.keys(PunditComponent.defaultProps), 'ifClick', 'elseClick'])).toEqual({
        className: '',
        element: 'button',
      });
    });
  });
  describe('render', () => {
    it('return children', () => {
      const wrapper = shallow((
        <IfElseButton>
          test return children
        </IfElseButton>
      ));
      expect(wrapper.find('button.IfElseButton').text()).toEqual('test return children');
    });
    it('return wrapper span by default if more then one child', () => {
      const wrapper = shallow((
        <IfElseButton>
          <div></div>
          <div></div>
        </IfElseButton>
      ));
      expect(wrapper.find('button.IfElseButton').length).toEqual(1);
    });
  });
  describe('handle click', () => {
    it('call if click', () => {
      const handleIf = jest.fn();
      const handleElse = jest.fn();
      const wrapper = mount((
        <PunditContainer policies={{ Test: () => true }}>
          <IfElseButton ifClick={handleIf} elseClick={handleElse} type="Test">
            If click
          </IfElseButton>
        </PunditContainer>
      ));
      wrapper.find('button').simulate('click');
      expect(handleIf).toHaveBeenCalled();
      expect(handleElse).not.toHaveBeenCalled();
    });
    it('call else click', () => {
      const handleIf = jest.fn();
      const handleElse = jest.fn();
      const wrapper = mount((
        <PunditContainer policies={{ Test: () => false }}>
          <IfElseButton ifClick={handleIf} elseClick={handleElse} type="Test">
            Else click
          </IfElseButton>
        </PunditContainer>
      ));
      wrapper.find('button').simulate('click');
      expect(handleIf).not.toHaveBeenCalled();
      expect(handleElse).toHaveBeenCalled();
    });
  });
});
