# react-pundit

![Downloads](https://img.shields.io/npm/dm/react-pundit.svg)
![Downloads](https://img.shields.io/npm/dt/react-pundit.svg)
![npm version](https://img.shields.io/npm/v/react-pundit.svg)
![dependencies](https://img.shields.io/david/jcgertig/react-pundit.svg)
![dev dependencies](https://img.shields.io/david/dev/jcgertig/react-pundit.svg)
![License](https://img.shields.io/npm/l/react-pundit.svg)
[![Build Status](https://travis-ci.org/jcgertig/react-pundit.svg?branch=master)](https://travis-ci.org/jcgertig/react-pundit)
[![Code Climate](https://codeclimate.com/github/jcgertig/react-pundit/badges/gpa.svg)](https://codeclimate.com/github/jcgertig/react-pundit)
[![Test Coverage](https://codeclimate.com/github/jcgertig/react-pundit/badges/coverage.svg)](https://codeclimate.com/github/jcgertig/react-pundit/coverage)

React components to build permission controlled ui's.

> With inspiration from
[Pundit](https://github.com/elabs/pundit).

## Pre-requisites

You should be familiar with Node + NPM, React and ES6 to use this library.

## Getting Started

Install it via npm:

```shell
npm install --save react-pundit
```

## Other Components

> Pundit based routes
[react-router Pundit](https://github.com/jcgertig/react-router-pundit).

## Example

```html
import { PunditContainer, VisibleIf } from 'react-pundit';
import policies from './policies.js';
import './App.css';

class App extends Component {
  render() {
    const userOne = { id: 1, role: 'basic', activated: false };
    const userTwo = { id: 2, role: 'basic', activated: true };
    const userAdmin = { id: 3, role: 'admin', activated: true };
    const userOneActivated = { id: 1, role: 'basic', activated: true };

    const post = { user: { id: 1 }, body: 'test', editable: true };

    return (
      <div className="App">
        <PunditContainer policies={policies} user={userOne}>
          <PunditTypeSet type="Post">
            <VisibleIf action="Create">
              <button>create will not show</button>
            </VisibleIf>
            <VisibleIf action="Create" user={userTwo}>
              <button>create will show</button>
            </VisibleIf>
            <VisibleIf action="Create" user={userAdmin}>
              <button>create will show</button>
            </VisibleIf>

            <VisibleIf action="Edit" model={post}>
              <button>edit will not show</button>
            </VisibleIf>
            <VisibleIf action="Edit" model={post} user={userOneActivated}>
              <button>edit will show</button>
            </VisibleIf>
            <VisibleIf action="Edit" model={post} user={userAdmin}>
              <button>edit will show</button>
            </VisibleIf>

            <VisibleIf type="Comment" action="Create" user={userOneActivated}>
              <button>comment create will show</button>
            </VisibleIf>
          </PunditTypeSet>
        </PunditContainer>
      </div>
    );
  }
}
```

```javascript
// policies.js

// Simple example
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
  },
  Comment: (action, model, user) => {
    if (user.activated === false) { return false; }
    if (user.role === 'admin') { return true; }

    switch (action) {
      case 'Create':
        return true;
      default:
        return false;
    }
  }
};

// Function based example

import { createPolicy, toPolicyObject } from 'react-pundit';

const PostPolicy = createPolicy('Post');

PostPolicy.addAction('Edit', (model, user) => {
  return user.activated && (user.role === 'admin' || (model.editable && user.id === model.user.id));
});

PostPolicy.addAction('Create', (model, user) => {
  return user.activated;
});

const CommentPolicy = createPolicy('Comment');

CommentPolicy.addAction('Create', (model, user) => {
  return user.activated;
});

export default toPolicyObject([PostPolicy, CommentPolicy]);

// OO example

import { PunditPolicy, toPolicyObject } from 'react-pundit';

class PostPolicy extends PunditPolicy {
  constructor() {
    super('Post');
  }

  Edit(model, user) {
    return user.activated && (user.role === 'admin' || (model.editable && user.id === model.user.id));
  }

  Create(model, user) {
    return user.activated;
  }
}

class CommentPolicy extends PunditPolicy {
  constructor() {
    super('Comment');
  }

  Create(model, user) {
    return user.activated;
  }
}

export default toPolicyObject([new PostPolicy(), new CommentPolicy()]);

```

## API reference
```javascript
// Available components
import {
  PunditContainer,
  PunditTypeSet,
  VisibleIf,
  IfElseButton
} from 'react-pundit';

// Available helpers
import {
  PunditPolicy,
  createPolicy,
  toPolicyObject,
  PunditComponent
} from 'react-pundit';
```

### PunditContainer

`PunditContainer` is the root of react-pundit and is where the policies are set.
You can pass a user into the container and have that act as the default user for
all children that use pundit. The container will only create DOM if there is
more then one child inside it. It creates a `'div'` by default in that case but you
can override with a `element` prop ie: `element="span"` or `element={Wrapper}`.

```html
<PunditContainer policies={policies} user={optionalDefaultUser}>
  <div className="App">
  </div>
</PunditContainer>
```

### PunditTypeSet

`PunditTypeSet` is a convenience tool. It allows you not have to set the type
prop on any children in side of it as well as the model. Those children that do have type set will
override this type, the same is true for model. The type set will only create DOM if there is
more then one child inside it. It creates a `'span'` by default in that case but you
can override with a `element` prop ie: `element="div"` or `element={Wrapper}`.

```html
<PunditTypeSet type="DefaultType" model={optionalDefaultModel}>
</PunditTypeSet>
```

### VisibleIf

`VisibleIf` is the base logic unit in react-pundit currently. It takes a
number of props.

- `type` : The policy class
- `action || method` : The method to check against
- `user` : The user whose permission are being checked
- `model` : If needed the model the permissions are being checked against

It works so that if the permissions are met then the child will be rendered
else it will not be

### IfElseButton
`IfElseButton` is a button that has two click handlers one `ifClick` that will trigger
if the user has permission and a `elseClick` if they do not. The button will always have
the class `IfElseButton` but you can add classes via the `className` prop.

All Props:

- `type` : The policy class
- `action || method` : The method to check against
- `user` : The user whose permission are being checked
- `model` : If needed the model the permissions are being checked against
- `ifClick` : Function triggered if the user has permission and has clicked the button
- `elseClick` : Function triggered if the user does not have permission and has clicked the button
- `className` : Extra custom class to add to the button element
- `element` : Optional component to use to override the default `'button'` element

**Any other props passed in will be passed to the rendering element.**

Example:
In this case the user has to be logged in and activated to do the action but the button is
on a public facing page. We also use a custom `Button` component to handle the render and a prop that will be passed to it.

```html
<IfElseButton
  type="Post"
  action="ToggleLike"
  model={post}
  ifClick={() => this.toggleLike(post)}
  elseClick={() => this.hasUser ? this.openModal('Please activate your account.') : this.openLogin)}
  element={Button}
  propSpecificToTheButton="Some Value"
>
  {count} Likes
</IfElseButton>
```

```javascript
class PostPolicy extends PunditPolicy {
  constructor() {
    super('Post');
  }

  ToggleLike(model, user) {
    return user !== null && user.activated;
  }

  ...
}
```

### PunditComponent

`PunditComponent` is a base react component that can be extended to create
child components that use pundits checks. It does this by haveing all the default
params needed to run the checks and exposing `passesPermissions` which return a
boolean `true` of `false` for if the user has the permissions required.

Look at the source for `VisibleIf` for reference. This is a bit cleaner not
handling the case of more than one child.

```javascript
class VisibleIf extends PunditComponent {

  static displayName = 'VisibleIf';

  render() {
    if (this.passesPermissions()) {
      return this.props.children;
    }
    return null;
  }
}
```
If you need to extended the prop types or default props its is easy.

```javascript
static propTypes = {
  ...PunditComponent.propTypes,
  newProp: PropTypes.any,
};

static defaultProps = {
  ...PunditComponent.defaultProps,
  newProp: 'some default',
};
```

> Work in progress

## Examples

See examples folder.

## Testing changes locally
You can test changes by importing the library directly from a folder:

1. Do changes to the library
2. On your test project: `npm install /path/to/your/react-pundit/ --save`
3. For easy development, you can `npm link react-pundit` on your application
4. And finally `npm run compile` the react-pundit to have the changes in your application

## License

MIT
