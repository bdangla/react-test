import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Container.js';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA1F9rySRQ4yGuaAtHRP-BwQPBPvgultrM",
  authDomain: "test-react-c888a.firebaseapp.com",
  databaseURL: "https://test-react-c888a.firebaseio.com",
  projectId: "test-react-c888a",
  storageBucket: "test-react-c888a.appspot.com",
  messagingSenderId: "273132129204"
};
firebase.initializeApp(config);
class App extends Component {
  constructor(){
    super()
    this.state={name:'javier'}
  }
  componentWillMount(){
    const nameRef = firebase.database().ref().child('name');
      nameRef.on('value', snapshot => {  
        this.setState({
          name: snapshot.val()
        });
      });
    }
  render(){
    return (
      <div className="App">
        < Container />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.name}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
