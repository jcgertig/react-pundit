import PunditContainer from './PunditContainer';
import PunditComponent from './PunditComponent';
import PunditTypeSet from './PunditTypeSet';
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

export {
  PunditContainer,
  PunditTypeSet,
  VisibleIf,
  createPolicy,
  toPolicyObject,
  PunditPolicy,
  PunditComponent
};
