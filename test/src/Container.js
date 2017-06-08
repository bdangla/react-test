import React , { Component } from 'react';
import * as firebase from 'firebase';
import FileUpload from './fileUpload';

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
class Container extends Component{
	constructor(){
	    super()
	    this.state={user:null};
      this.handelAuth = this.handelAuth.bind(this);
      this.handelLogout = this.handelLogout.bind(this);
  };
	componentWillMount(){
    /*const nameRef = firebase.database().ref().child('name');
      nameRef.on('value', snapshot => {  
        this.setState({
          name: snapshot.val()
        });
      });*/
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({user});
    });
    }
    handelAuth(){
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(result=>console.log('${result.user.email} ha iniciado sesion'))
      .catch(error=>console.log('Error ${error.code}:${error.message}'));
    }
    handelLogout(){
      firebase.auth().signOut()
      .then(result=>console.log('${result.user.email} ha salido'))
      .catch(error=>console.log('Error ${error.code}:${error.message}'));
    }
    renderLoginButton(){
      if(this.state.user){
        return(
            <div>
              <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
              <p> hola {this.state.user.displayName}!</p>
              <button onClick={this.handelLogout}>Salir</button>
              <FileUpload />
            </div> 
          )
      }else{
        return(
          <button onClick={this.handelAuth}>Login</button>
        );
      }
    }
	render() {
		return (
			/*<div>
				<h1>{this.state.name}!!!</h1>
			</div>*/
      <div className="App">
        <div className="App-header">
          <h2>Login</h2>
        </div>
        <p className="App-intro">
        {this.renderLoginButton()}
        </p>
      </div>
		);
	}
}

export default Container;