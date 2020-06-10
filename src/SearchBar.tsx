import React from 'react';
import {searchUsers} from './VisitorUtil';

interface SearchBarProps {
    processVisitorCallback: any; //TODO type this
}

interface SearchBarState {
    name: string;
    isSignedOutChecked: boolean;
}

export class SearchBar extends React.Component<SearchBarProps,  SearchBarState> {
    constructor(props: SearchBarProps){
        super(props);
        this.filterSearch = this.filterSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
        this.state = {
            name: '',
            isSignedOutChecked: false,
        }
    }

    handleCheckedChange = (event) => {
        // TODO: Combine this and filterSearch
        const {processVisitorCallback} = this.props;
        let {isSignedOutChecked} = this.state;
        isSignedOutChecked = !isSignedOutChecked;
        this.setState({isSignedOutChecked: isSignedOutChecked});
        const params = {
            name: this.state.name,
            isSignedOut: isSignedOutChecked,
        }
        console.log(params);
        searchUsers(params, processVisitorCallback);
        
    }

    onChange = (event) => {
        this.setState({name: event.target.value});
    }

    filterSearch = (event) => {
        const {processVisitorCallback} = this.props;
        const {isSignedOutChecked} = this.state;
        const params = {
            name: this.state.name,
            isSignedOut: isSignedOutChecked,
        }
        searchUsers(params, processVisitorCallback);
        event.preventDefault();
    }

    render() {
      return (
        <div>
            <form onSubmit={this.filterSearch}>
                <input type="text" onChange = {this.onChange} value={this.state.name} className="p-2 text-sm border float-right max-w-xs w-full" placeholder="Search by name"/>
                <input type="submit" value="Submit" />
            </form>
            <label>
                <input
                    type="checkbox"
                    defaultChecked={this.state.isSignedOutChecked}
                    ref="complete"
                    onChange={this.handleCheckedChange}
                />
                {"Only show signed out visitors"}
            </label>
        </div>
      ) 
    }
  }
export default SearchBar;