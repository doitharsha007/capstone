import { Component } from 'react';
import {BrowserRouter as Router,Route,Switch}from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import Exchange from './components/Exchange';
import Client from './components/Client';
import './App.css';
import Home from './components/Home';
import Instrument from './components/Instrument';
import FinalComponent from './components/FinalComponent';
//import FooterComponent from './components/FooterComponent';
import Custodian from './components/Custodian';
import Output from './components/Output';
import Settlement from './components/Settlement';
import LoginComponent from './components/LoginComponent';
class App extends Component{
  render(){
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <Switch>    
            <Route path="/" exact component={LoginComponent}/>
            <Route path="/home" component={Home}/> 
             <Route path="/client" component={Client}/>
             <Route path="/instrument" component={Instrument} />
             <Route path="/exchange" component={Exchange}/>
             <Route path="/final" component={FinalComponent}/>
             <Route path="/custodian" component={Custodian}/>
             <Route path="/output" component={Output}/>
             <Route path="/settlement" component={Settlement}/>
          </Switch>
      </Router>
    </div>
  );
}
}

export default App;
