import { PunditPolicy } from '../src/index';

describe('PunditPolicy', () => {
  describe('constructor', () => {
    it('creates an instanceof PunditPolicy', () => {
      expect((new PunditPolicy('')) instanceof PunditPolicy).toBe(true);
    });
    it('set punditModelType to "Test"', () => {
      const Test = new PunditPolicy('Test');
      expect(Test.punditModelType).toEqual('Test');
    });
  });
  describe('modelType', () => {
    it('get punditModelType as "Test"', () => {
      const Test = new PunditPolicy('Test');
      expect(Test.modelType).toEqual('Test');
    });
  });
  describe('addAction', () => {
    it('throw an error if action name is not a string', () => {
      const Test = new PunditPolicy('Test');
      try {
        Test.addAction(0);
      } catch (e) {
        expect(e.toString()).toEqual('Error: Action name has to be a string');
      }
    });

    it('throw an error if action value is not a function', () => {
      const Test = new PunditPolicy('Test');
      try {
        Test.addAction('test', 'fail');
      } catch (e) {
        expect(e.toString()).toEqual('Error: Action value has to be a function');
      }
    });

    it('add a method with name "testAction" to the class', () => {
      const Test = new PunditPolicy('Test');
      expect(typeof Test.testAction).toEqual('undefined');
      Test.addAction('testAction', () => {});
      expect(typeof Test.testAction).toEqual('function');
    });
  });
});
