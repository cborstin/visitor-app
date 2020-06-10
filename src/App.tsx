import React, { useState, useEffect } from 'react';
import './App.scss';
import SearchBar from './SearchBar';
import VisitorContainer from './VisitorContainer';

interface Visitor {
  firstName: string;
  lastName: string;
  date: string;
  signedOut: boolean;
}

interface AppState {
  visitors: Visitor[];
}

export class App extends React.Component<{},  AppState> {
  constructor(props){
    super(props);
  }
  private getUsers(): Promise<Visitor[]> {
    // For now, consider the data is stored on a static `users.json` file
    return fetch('/sample_data')
            // the JSON body is taken from the response
            .then(res => res.json())
            .then(res => {
                    // The response has an `any` type, so we need to cast
                    // it to the `User` type, and return it from the promise
                    console.log(res);
                    return res as Visitor[]
            })
  }

  componentDidMount() {
    const visitors = this.getUsers();
  }

  render() {
    return (
      <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
        <div className="flex-grow h-screen overflow-y-scroll">
            <SearchBar/>
            <VisitorContainer/>
        </div>
      </div>
    );
  }

}

export default App;