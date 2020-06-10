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
    this.state = {
      visitors: []
    }
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

  private searchUsers(params: any): Promise<Visitor[]> {
    const paramString = new URLSearchParams(params);
    return fetch(`/entries?${paramString.toString()}`)
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    console.log(res);
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    return visitors;
            });
  }

  async componentDidMount() {
    const visitors = await this.getAllUsers();
    this.setState({visitors: visitors});
    return Promise.resolve();
  }

  render() {
    const {visitors} = this.state;
    return (
      <div className="container mx-auto mt-12 p-8 border  min-h-screen max-w-3xl">
        <div className="flex-grow h-screen overflow-y-scroll">
            <SearchBar/>
            <VisitorContainer visitors={visitors}/>
        </div>
      </div>
    );
  }

}

export default App;