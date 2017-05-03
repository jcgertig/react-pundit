export default {
  Post: (action, model, user) => {
    if (user.activated === false) { return false; }
    if (user.role === 'admin') { return true; }

    switch (action) {
      case 'Create':
        return true;
      case 'Edit':
        return (model.editable && user.id === model.user.id);
      default:
        return false;
    }
  }
};
