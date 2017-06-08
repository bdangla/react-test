import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './fileUpload';
import './App.css';
//import Container from './Container.js';
class App extends Component {
  constructor(){
      super()
      this.state={
        user:null,
        pictures:[],
        uploadValue:0
      };
      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleUpload=this.handleUpload.bind(this);
  };
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({user});
    });
    firebase.database().ref('pictures').on('child_added',snapshot=>{
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
    }
    handleAuth(){
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(result=>console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error=>console.log(`Error ${error.code}:${error.message}`));
    }
    handleLogout(){
      firebase.auth().signOut()
      .then(result=>console.log(`${result.user.email} ha salido`))
      .catch(error=>console.log(`Error ${error.code}:${error.message}`));
    }
    handleUpload(event){
      const file = event.target.files[0]
      const storageRef = firebase.storage().ref(`fotos/${file.name}`)
      const task = storageRef.put(file);
      task.on('state_changed', snapshot =>{
      let percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
      this.setState({
        uploadValue:percentage
      })
    },error=>{
      console.log(error.message)
    },()=>{
      const record={
        photoURL:this.state.user.photoURL,
        displayName:this.state.user.displayName,
        image:task.snapshot.downloadURL
      };
      const dbRef= firebase.database().ref('pictures');
      const newPicture= dbRef.push();
      newPicture.set(record);
    });
  }
    renderLoginButton(){
      if(this.state.user){
        return(
            <div>
              <img className="user_photo" src={this.state.user.photoURL} alt={this.state.user.displayName} />
              <p> hola {this.state.user.displayName}!</p>
              <button onClick={this.handleLogout}>Salir</button>
              <FileUpload onUpload={this.handleUpload} percentage={this.state.uploadValue}/>
              {
                this.state.pictures.map(picture=>(
                  <div key={picture.image}>
                    <img src={picture.image} alt="" />
                    <br/>
                    <img src={picture.photoURL} alt={picture.displayName} />
                    <br/>
                    <span>{picture.displayName}</span>
                  </div>
                )).reverse()
              }
            </div> 
          )
      }else{
        return(
          <button onClick={this.handleAuth}>Login</button>
        );
      }
    }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h2>App</h2>
        </div>
        <div className="App-intro">
            {this.renderLoginButton()}
        </div>
      </div>
    );
  }
}

export default App;
