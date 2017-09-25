import React from 'react';
import omit from 'lodash.omit';
import { shallow, mount, render } from 'enzyme';
import { VisibleIf, PunditContainer, PunditComponent } from '../src/index';

describe('VisibleIf', () => {
  describe('static attributes', () => {
    it('have displayName "VisibleIf"', () => {
      expect(VisibleIf.displayName).toEqual('VisibleIf');
    });
    it('have propTypes with keys (element)', () => {
      expect(Object.keys(omit(VisibleIf.propTypes, Object.keys(PunditComponent.propTypes)))).toEqual([
        'element'
      ]);
    });
    it('have defaultProps (element: "span")', () => {
      expect(omit(VisibleIf.defaultProps, Object.keys(PunditComponent.defaultProps))).toEqual({
        element: 'span',
      });
    });
  });
  describe('render', () => {
    describe('does render', () => {
      it('and returns children', () => {
        const wrapper = mount((
          <PunditContainer policies={{ Test: () => true }}>
            <VisibleIf type="Test">
              <span>test return children</span>
            </VisibleIf>
          </PunditContainer>
        ));
        expect(wrapper.text()).toEqual('test return children');
      });
      it('and returns wrapper span by default if more then one child', () => {
        const wrapper = mount((
          <PunditContainer policies={{ Test: () => true }}>
            <VisibleIf type="Test">
              <div></div>
              <div></div>
            </VisibleIf>
          </PunditContainer>
        ));
        expect(wrapper.find('span.VisibleIf').length).toEqual(1);
      });
    });
    it('does not render if returns false', () => {
      const wrapper = render((
        <PunditContainer policies={{ Test: () => false }}>
          <VisibleIf type="Test">
            test return children
          </VisibleIf>
        </PunditContainer>
      ));
      expect(wrapper.text()).toEqual('');
    });
  });
});
