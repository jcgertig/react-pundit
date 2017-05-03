import { PunditPolicy } from 'react-pundit';

class PostPolicy extends PunditPolicy {
  constructor() {
    super('Post');
  }

  Edit(model, user) {
    return user.activated && (user.role === 'admin' || (model.editable && user.id === model.user.id));
  }

  Delete(model, user) {
    return user.activated && user.role === 'admin';
  }

  Create(model, user) {
    return user.activated;
  }
}

export default PostPolicy;
