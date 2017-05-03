class PunditPolicy {
  constructor(type = 'undefined') {
    this.punditModelType = type;
  }

  get modelType() {
    return this.punditModelType;
  }

  addAction(name, func) {
    if (typeof name !== 'string') {
      throw new Error('Action name has to be a string');
    }
    if (typeof func !== 'function') {
      throw new Error('Action value has to be a function');
    } else {
      this[name] = func.bind(this);
    }
  }
}

export default PunditPolicy;
