import PunditContainer from './PunditContainer';
import VisibleIf from './VisibleIf';

import PunditPolicy from './PunditPolicy';

const createPolicy = (type) => {
  return new PunditPolicy(type)
};

const toPolicyObject = (arrayOfPolicyClasses) => {
  const obj = {};
  arrayOfPolicyClasses.forEach(klass => obj[klass.modelType] = klass);
  return obj;
};

export { PunditContainer, VisibleIf, createPolicy, toPolicyObject, PunditPolicy };
