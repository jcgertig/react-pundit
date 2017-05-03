import React, { Component } from 'react';
import { PunditContainer, VisibleIf } from 'react-pundit';
import policies from './policies';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const userOne = { id: 1, role: 'basic', activated: false };
    const userTwo = { id: 2, role: 'basic', activated: true };
    const userAdmin = { id: 3, role: 'admin', activated: true };
    const userOneActivated = { id: 1, role: 'basic', activated: true };

    const post = { user: { id: 1 }, body: 'test', editable: true };

    return (
      <PunditContainer policies={policies} user={userOne}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React Pundit - Function based Policies</h2>
          </div>
          <p className="App-intro">
            <VisibleIf type="Post" action="Create" model={post}>
              <button>create will not show 1</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Create" model={post} user={userTwo}>
              <button>create will show 2</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Create" model={post} user={userAdmin}>
              <button>create will show 3</button>
            </VisibleIf>

            <VisibleIf type="Post" action="Edit" model={post}>
              <button>edit will not show 1</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Edit" model={post} user={userOneActivated}>
              <button>edit will show 2</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Edit" model={post} user={userAdmin}>
              <button>edit will show 3</button>
            </VisibleIf>

            <VisibleIf type="Post" action="Delete" model={post}>
              <button>delete will not show 1</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Delete" model={post} user={userOneActivated}>
              <button>delete will not show 2</button>
            </VisibleIf>
            <VisibleIf type="Post" action="Delete" model={post} user={userAdmin}>
              <button>delete will show 3</button>
            </VisibleIf>
          </p>
        </div>
      </PunditContainer>
    );
  }
}

export default App;
