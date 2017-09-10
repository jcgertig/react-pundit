import React from 'react';
import { shallow } from 'enzyme';
import { PunditTypeSet } from '../src/index';

describe('PunditTypeSet', () => {
  describe('static attributes', () => {
    it('have displayName "PunditTypeSet"', () => {
      expect(PunditTypeSet.displayName).toEqual('PunditTypeSet');
    });
    it('have propTypes with keys (type, model, element)', () => {
      expect(Object.keys(PunditTypeSet.propTypes)).toEqual([
        'type', 'model', 'element'
      ]);
    });
    it('have defaultProps (type: "", model: null, element: "span")', () => {
      expect(PunditTypeSet.defaultProps).toEqual({
        type: '',
        model: null,
        element: 'span',
      });
    });
    it('have childContextTypes with keys (punditType, punditModel)', () => {
      expect(Object.keys(PunditTypeSet.childContextTypes)).toEqual([
        'punditType', 'punditModel'
      ]);
    });
  });
  describe('render', () => {
    it('return children', () => {
      const comp = new PunditTypeSet({ children: 'test return children'}, {});
      expect(comp.render()).toEqual('test return children');
    });
    it('return wrapper span by default if more then one child', () => {
      const wrapper = shallow((
        <PunditTypeSet>
          <div></div>
          <div></div>
        </PunditTypeSet>
      ));
      expect(wrapper.find('span.PunditTypeSet').length).toEqual(1);
    });
  });
});
