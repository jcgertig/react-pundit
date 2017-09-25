import React from 'react';
import { shallow } from 'enzyme';
import { PunditContainer, PunditPolicy } from '../src/index';

describe('PunditContainer', () => {
  describe('static attributes', () => {
    it('have displayName "PunditContainer"', () => {
      expect(PunditContainer.displayName).toEqual('PunditContainer');
    });
    it('have propTypes with keys (policies, user, element)', () => {
      expect(Object.keys(PunditContainer.propTypes)).toEqual([
        'policies', 'user', 'element'
      ]);
    });
    it('have defaultProps (type: "", action: "", method: "", model: undefined, user: null)', () => {
      expect(PunditContainer.defaultProps).toEqual({
        policies: {},
        user: null,
        element: 'div',
      });
    });
    it('have childContextTypes) with keys (punditCheck)', () => {
      expect(Object.keys(PunditContainer.childContextTypes)).toEqual([
        'punditCheck'
      ]);
    });
  });
  describe('render', () => {
    it('return children when singular', () => {
      const comp = new PunditContainer({ children: 'test' }, {});
      expect(comp.render()).toEqual('test');
    });
    it('return wrapper div by default if more then one child', () => {
      const wrapper = shallow((
        <PunditContainer>
          <div></div>
          <div></div>
        </PunditContainer>
      ));
      expect(wrapper.find('div.PunditContainer').length).toEqual(1);
    });
  });
  describe('getChildContext', () => {
    it('return punditCheck', () => {
      const comp = new PunditContainer({}).getChildContext();
      expect(typeof comp.punditCheck).toEqual('function');
    });
  });
  describe('punditCheck', () => {
    describe('handle array of policies', () => {
      describe('handle basic object for policy', () => {
        const comp = new PunditContainer({ policies: [{
          modelType: 'Test',
          test: (action, model, user) => {
            return true;
          }
        }] }).getChildContext();
        it('handle having the action', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual(true);
        });
        it('handle not having the action', () => {
          expect(comp.punditCheck('Test', 'test2')).toEqual(false);
        });
      });
      describe('handle PunditPolicy objects', () => {
        class TestPolicy extends PunditPolicy {
          constructor() {
            super('Test');
          }

          test(action, model, user) {
            return true;
          }
        }
        const comp = new PunditContainer({ policies: [new TestPolicy()] }).getChildContext();
        it('handle having the action', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual(true);
        });
        it('handle not having the action', () => {
          expect(comp.punditCheck('Test', 'test2')).toEqual(false);
        });
      });

      describe('handle functions', () => {
        function Test (action) {
          return action;
        }
        Test.modelType = 'Test';
        const comp = new PunditContainer({ policies: [Test] }).getChildContext();
        it('handle calling function', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual('test');
        });
      });

      it('handle not valid method', () => {
        const comp = new PunditContainer({ policies: [false] }).getChildContext();
        expect(comp.punditCheck('Test', 'test')).toEqual(false);
      });
    });

    describe('handle object of policies', () => {
      describe('handle function as policy', () => {
        const comp = new PunditContainer({ policies: {
          Test: () => true
        }}).getChildContext();
        it('handle calling function', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual(true);
        });
      });
      describe('handle basic object for policy', () => {
        const comp = new PunditContainer({ policies: {
          Test: { test: () => true }
        }}).getChildContext();
        it('handle having the action', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual(true);
        });
        it('handle not having the action', () => {
          expect(comp.punditCheck('Test', 'test2')).toEqual(false);
        });
      });
      describe('handle PunditPolicy objects', () => {
        class TestPolicy extends PunditPolicy {
          constructor() {
            super('Test');
          }
          test(action, model, user) {
            return true;
          }
        }
        const comp = new PunditContainer({ policies: { Test: new TestPolicy() } }).getChildContext();
        it('handle having the action', () => {
          expect(comp.punditCheck('Test', 'test')).toEqual(true);
        });
        it('handle not having the action', () => {
          expect(comp.punditCheck('Test', 'test2')).toEqual(false);
        });
      });
      it('handle not valid method', () => {
        const comp = new PunditContainer({ policies: { Test: false } }).getChildContext();
        expect(comp.punditCheck('Test', 'test')).toEqual(false);
      });
      it('handle no policy', () => {
        const comp = new PunditContainer({ policies: {} }).getChildContext();
        expect(comp.punditCheck('Test', 'test')).toEqual(false);
      });
    });
  });
});
