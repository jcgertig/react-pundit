import { createPolicy } from 'react-pundit';

const PostPolicy = createPolicy('Post');

PostPolicy.addAction('Edit', (model, user) => {
  return user.activated && (user.role === 'admin' || (model.editable && user.id === model.user.id));
});

PostPolicy.addAction('Delete', (model, user) => {
  return user.activated && user.role === 'admin';
});

PostPolicy.addAction('Create', (model, user) => {
  return user.activated;
});

export default [PostPolicy];
