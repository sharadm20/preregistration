import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import '../node_modules/bulma/css/bulma.css';
import CollegeForm from './components/CollegeForm';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <header className="title has-text-white App-header">
        Registration Form
        </header>
        <div className="container is-fluid">
        <CollegeForm/>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;
