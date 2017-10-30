import React from 'react';
import omit from 'lodash.omit';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render, configure } from 'enzyme';
import { VisibleIf, PunditContainer, PunditComponent } from '../src/index';

configure({ adapter: new Adapter() });

describe('VisibleIf', () => {
  describe('static attributes', () => {
    it('have displayName "VisibleIf"', () => {
      expect(VisibleIf.displayName).toEqual('VisibleIf');
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
      it('and does not return a wrapper span by default if more then one child', () => {
        const wrapper = mount((
          <PunditContainer policies={{ Test: () => true }}>
            <VisibleIf type="Test">
              <div></div>
              <div></div>
            </VisibleIf>
          </PunditContainer>
        ));
        expect(wrapper.find('span.VisibleIf').length).toEqual(0);
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
