import React, { useState, useEffect } from 'react';
import './App.scss';
import SearchBar from './SearchBar';
import VisitorContainer from './VisitorContainer';
import {_} from 'lodash';
import {Visitor, getAllUsers} from './VisitorUtil';
import "bootstrap/dist/css/bootstrap.min.css";

interface AppState {
  visitors: Visitor[];
}

export class App extends React.Component<{},  AppState> {
  constructor(props){
    super(props);
    this.state = {
      visitors: []
    }
    this.updateVisitorState = this.updateVisitorState.bind(this)
  }

  updateVisitorState = (visitors: Visitor[]) => {
    this.setState({visitors: visitors});
  }

  async componentDidMount() {
    await getAllUsers(this.updateVisitorState);
    return Promise.resolve();
  }

  render() {
    const {visitors} = this.state;
    return (
      <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
        <div className="flex-grow h-screen overflow-y-scroll">
        <img src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg" alt="Envoy Logo" width="31" className="py3 block"/> 
        <SearchBar processVisitorCallback={this.updateVisitorState}/>
            <VisitorContainer 
              visitors={visitors} 
              processVisitorCallback={this.updateVisitorState}
            />
        </div>
      </div>
    );
  }

}

export default App;