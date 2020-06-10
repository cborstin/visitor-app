import React, { useState, useEffect } from 'react';
import './App.scss';
import SearchBar from './SearchBar';
import VisitorContainer from './VisitorContainer';
import {_} from 'lodash';
import {Visitor, getAllUsers} from './VisitorUtil';

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