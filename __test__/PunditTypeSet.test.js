import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { PunditTypeSet } from '../src/index';

configure({ adapter: new Adapter() });

describe('PunditTypeSet', () => {
  describe('static attributes', () => {
    it('have displayName "PunditTypeSet"', () => {
      expect(PunditTypeSet.displayName).toEqual('PunditTypeSet');
    });
    it('have propTypes with keys (type, model, element)', () => {
      expect(Object.keys(PunditTypeSet.propTypes)).toEqual([
        'type', 'model'
      ]);
    });
    it('have defaultProps (type: "", model: null, element: "span")', () => {
      expect(PunditTypeSet.defaultProps).toEqual({
        type: '',
        model: null
      });
    });
    it('have childContextTypes with keys (punditType, punditModel)', () => {
      expect(Object.keys(PunditTypeSet.childContextTypes)).toEqual([
        'punditType', 'punditModel'
      ]);
    });
    it('have childContextTypes with keys (punditType, punditModel)', () => {
      expect(Object.keys(new PunditTypeSet({}).getChildContext())).toEqual([
        'punditType', 'punditModel'
      ]);
    });
  });
  describe('render', () => {
    it('return children', () => {
      const comp = new PunditTypeSet({ children: 'test return children'}, {});
      expect(comp.render()).toEqual('test return children');
    });
    it('return no wrapper span by default if more then one child', () => {
      const wrapper = shallow((
        <PunditTypeSet>
          <div></div>
          <div></div>
        </PunditTypeSet>
      ));
      expect(wrapper.find('span.PunditTypeSet').length).toEqual(0);
    });
  });
});
