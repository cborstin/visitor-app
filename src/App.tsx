import React, { useState, useEffect } from 'react';
import './App.scss';
import SearchBar from './SearchBar';
import VisitorContainer from './VisitorContainer';
import {_} from 'lodash';
import {Visitor} from './VisitorUtil';

interface AppState {
  visitors: Visitor[];
}

export class App extends React.Component<{},  AppState> {
  constructor(props){
    super(props);
  }

  
  private getAllUsers(): Promise<Visitor[]> {
    return fetch('/entries')
            .then(res => res.json())
            .then(res => {
                    /*TODO: Is this the right way to typecast*/
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    console.log(res, res["visitors"]);
                    return visitors;
            })
  }

  private changeVisitor(visitor: Visitor): Promise<Visitor[]> {
    return fetch('/entries', {
      method: 'POST',
      body: JSON.stringify({visitor})
      })
            .then(res => res.json())
            .then(res => {
                    /*TODO: Is this the right way to typecast*/
                    return res as Visitor[]
            })
  }

  // private filterUser(): Promise<Visitor[]> {
  //   // For now, consider the data is stored on a static `users.json` file
  //   return fetch('/sample_data')
  //           // the JSON body is taken from the response
  //           .then(res => res.json())
  //           .then(res => {
  //                   // The response has an `any` type, so we need to cast
  //                   // it to the `User` type, and return it from the promise
  //                   console.log(res);
  //                   return res as Visitor[]
  //           })
  // }

  async componentDidMount() {
    const users = await this.getAllUsers();
    const visitor1 = users[0];
    // visitor1.firstName = "New first name";
    // await this.changeVisitor(visitor1);
    console.log(users);
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