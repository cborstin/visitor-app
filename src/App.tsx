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

  // private getSampleData(): Promise<Visitor[]> {
  //   return fetch('/sample_data')
  //           .then(res => res.json())
  //           .then(res => {
  //                   /*TODO: Is this the right way to typecast*/
  //                   let visitors: Visitor[] = [];
  //                   res["visitors"].forEach(element => {
  //                     visitors.push(new Visitor(element));
  //                   });
  //                   return visitors;
  //           })
  // }

  /*TODO: Combine all these methods*/
  private getAllUsers(): Promise<Visitor[]> {
    return fetch('/entries')
            .then(res => res.json())
            .then(res => {
                    /*TODO: Is this the right way to typecast*/
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    return visitors;
            })
  }

  
  private changeVisitor(visitor: Visitor): Promise<Visitor[]> {
    return fetch('/entries', {
      method: 'PATCH',
      body: JSON.stringify({visitor})})
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    return visitors;
            })
  }


  private addUser(visitor: Visitor): Promise<Visitor[]> {
    return fetch('/entries', {
      method: 'POST',
      body: JSON.stringify({visitor})})
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    console.log(res);
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    return visitors;
            })
  }

  async componentDidMount() {
    const users = await this.getAllUsers();
    const visitor1 = users[0];
    visitor1.firstName = "NATA";
    let updatedList = await this.changeVisitor(visitor1);
    let data = {
      id: undefined,
      firstName: "Idk",
      lastName: "So tired",
      date: "SO tired",
      notes: "So tired",
      isSignedOut: false,
    }
    const newUser = new Visitor(data);
    updatedList = await this.addUser(newUser);
    console.log("New user", updatedList)
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