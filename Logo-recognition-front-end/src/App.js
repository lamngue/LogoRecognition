import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import LogoRecognition from './components/LogoRecognition/LogoRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Delete from './components/Delete/Delete';
import ErrorPage from './components/ErrorPage/ErrorPage';
import './App.css';
import Particles from 'react-particles-js';

const particle = {
                particles: {
                  number:{
                    value: 30,
                    density:{
                      enable:true,
                      value_area: 700
                    }
                  },
                  
                }
              }

  

class App extends Component {
  constructor(){
    super();
      this.state = {
        input: '',
        imageUrl:'',
        box:{},
        status: 'signIn',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
    }
  }

  addUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }


  calculateLogoLocation = (data) => {
    const clarifaiLogo = data.outputs["0"].data.regions["0"].region_info.bounding_box;
    const image = document.getElementById("logo");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return{
      leftCol: clarifaiLogo.left_col * width,
      topRow: clarifaiLogo.top_row * height,
      rightCol: width - (clarifaiLogo.right_col * width),
      bottomRow: height - (clarifaiLogo.bottom_row *height)
    }
  }
  displayLogoBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://thawing-dawn-92259.herokuapp.com/imageurl",{
      method: 'post',
      // headers is an object
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // send data to back end server
        input: this.state.input
      })
    }).then(response => response.json())
    .then(response => {
      if(response){
        fetch("https://thawing-dawn-92259.herokuapp.com/image",{
      method: 'put',
      // headers is an object
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // send data to back end server
        id: this.state.user.id
      })
    }).then(response => response.json()) // received from server
    .then(count => //increment the count property in user state
        this.setState(Object.assign(this.state.user,{entries: count}) 
    ))
      }
      this.displayLogoBox(this.calculateLogoLocation(response));
    })
    .catch(err =>console.log(err))
  }

  logIn = (status) => {
    this.setState({status: status});
    if(status ==='signout' || status === 'delete'){
      this.setState({isSignedIn: false})
    }
    else if(status === 'home'){
      this.setState({isSignedIn: true})
    }
  }

  render() {
    if (this.state.status === 'errorPage'){
      return (<div className = 'App'>
                <Particles className ="particles"
              params={particle}
                />
                <ErrorPage logIn = {this.logIn} />
              </div>
        )
    }
    else{
    return (
      <div className = 'App'>
      <Particles className ="particles"
              params={particle}
            />
        <Navigation logIn = {this.logIn} isSignedIn={this.state.isSignedIn} />
        {this.state.status === 'home'?
        (<div>
          <Logo />
          <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
          <ImageLinkForm onInputChange = {this.onInputChange}
           onButtonSubmit={this.onButtonSubmit} />
          <LogoRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        </div>): 
        (this.state.status === 'delete' ?
            <Delete logIn = {this.logIn} /> :
            (this.state.status === 'signIn' ?
            <SignIn addUser= {this.addUser} logIn = {this.logIn} /> :
            <Register addUser = {this.addUser} logIn = {this.logIn} />
          )
            )
      }
      </div>
    );
  }
}
}

export default App;
