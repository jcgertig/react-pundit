import { PunditComponent } from '../src/index';

describe('PunditComponent', () => {
  describe('static attributes', () => {
    it('have displayName "PunditComponent"', () => {
      expect(PunditComponent.displayName).toEqual('PunditComponent');
    });
    it('have propTypes with keys (type, action, method, model, user)', () => {
      expect(Object.keys(PunditComponent.propTypes)).toEqual([
        'type', 'action', 'method', 'model', 'user'
      ]);
    });
    it('have defaultProps (type: "", action: "", method: "", model: undefined, user: null)', () => {
      expect(PunditComponent.defaultProps).toEqual({
        type: '',
        action: '',
        method: '',
        model: undefined,
        user: null,
      });
    });
    it('have contextTypes with keys (punditCheck, punditType, punditModel)', () => {
      expect(Object.keys(PunditComponent.contextTypes)).toEqual([
        'punditCheck', 'punditType', 'punditModel'
      ]);
    });
  });
  describe('render', () => {
    it('return null', () => {
      const comp = new PunditComponent({}, {});
      expect(comp.render()).toEqual(null);
    });
  });
  describe('passesPermissions', () => {
    it('call punditCheck', () => {
      let a = jest.fn(() => 'called');
      const comp = new PunditComponent({}, { punditCheck: a });
      expect(comp.passesPermissions()).toEqual('called');
    });
  });
});
