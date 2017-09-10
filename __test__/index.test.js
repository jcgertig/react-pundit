import { PunditPolicy, createPolicy, toPolicyObject } from '../src/index';

describe('Index', () => {
  describe('createPolicy', () => {
    it('returns an instance of PunditPolicy', () => {
      expect(createPolicy() instanceof PunditPolicy).toBe(true);
    });
  });

  describe('toPolicyObject', () => {
    it('returns for no policies', () => {
      expect(toPolicyObject()).toEqual({});
    });

    it('returns for policy called "Test"', () => {
      const Test = createPolicy('Test');
      expect(toPolicyObject([Test])).toEqual({ "Test": { "punditModelType": "Test" } });
    });
  });
});
