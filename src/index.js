import PunditContainer from './PunditContainer';
import PunditComponent from './PunditComponent';
import PunditTypeSet from './PunditTypeSet';
import VisibleIf from './VisibleIf';
import IfElseButton from './IfElseButton';

import PunditPolicy from './PunditPolicy';

const createPolicy = (type) => {
  return new PunditPolicy(type)
};

const toPolicyObject = (arrayOfPolicyClasses = []) => {
  return arrayOfPolicyClasses.reduce((obj, klass) => ({ ...obj, [klass.modelType]: klass }), {});
};

export {
  PunditContainer,
  PunditTypeSet,
  VisibleIf,
  IfElseButton,
  createPolicy,
  toPolicyObject,
  PunditPolicy,
  PunditComponent
};
