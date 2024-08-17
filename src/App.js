
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default class App extends Component {

  state={
    progress:0,
} 
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  pageSize=6;
  render() {

    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={4}
        progress={this.state.progress}
    
      />
     
      <Switch>
          <Route exact path="/" ><News setProgress={this.setProgress} key="1" pageSize={this.pageSize} countyr='in' category="general"/></Route>
          <Route exact path="/business" ><News setProgress={this.setProgress} key="2" pageSize={this.pageSize} countyr='in' category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} key="3" pageSize={this.pageSize} countyr='in' category="entertainment"/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} key="4" pageSize={this.pageSize} countyr='in' category="general"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} key="5" pageSize={this.pageSize} countyr='in' category="health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} key="6" pageSize={this.pageSize} countyr='in' category="science"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} key="7" pageSize={this.pageSize} countyr='in' category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} key="8" pageSize={this.pageSize} countyr='in' category="technology"/></Route>
        </Switch>
      </Router>
      </div>
    )
  }
} 

  