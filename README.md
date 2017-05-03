# react-pundit

[![build status](https://img.shields.io/travis/jcgertig/react-pundit/master.svg?style=flat-square)](https://travis-ci.org/jcgertig/react-pundit)
![Downloads](https://img.shields.io/npm/dm/react-pundit.svg)
![Downloads](https://img.shields.io/npm/dt/react-pundit.svg)
![npm version](https://img.shields.io/npm/v/react-pundit.svg)
![dependencies](https://img.shields.io/david/jcgertig/react-pundit.svg)
![dev dependencies](https://img.shields.io/david/dev/jcgertig/react-pundit.svg)
![License](https://img.shields.io/npm/l/react-pundit.svg)

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
          <VisibleIf type="Post" action="Create" model={post}>
            <button>create will not show</button>
          </VisibleIf>
          <VisibleIf type="Post" action="Create" model={post} user={userTwo}>
            <button>create will show</button>
          </VisibleIf>
          <VisibleIf type="Post" action="Create" model={post} user={userAdmin}>
            <button>create will show</button>
          </VisibleIf>

          <VisibleIf type="Post" action="Edit" model={post}>
            <button>edit will not show</button>
          </VisibleIf>
          <VisibleIf type="Post" action="Edit" model={post} user={userOneActivated}>
            <button>edit will show</button>
          </VisibleIf>
          <VisibleIf type="Post" action="Edit" model={post} user={userAdmin}>
            <button>edit will show</button>
          </VisibleIf>
        </HexGrid>
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

export default toPolicyObject([PostPolicy]);
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

export default toPolicyObject([new PostPolicy()]);

```

## API reference
```javascript
// Available components
import {
  PunditContainer,
  VisibleIf
} from 'react-pundit';

// Available helpers
import {
  PunditPolicy,
  createPolicy,
  toPolicyObject
} from 'react-pundit';
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
