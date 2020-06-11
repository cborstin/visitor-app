import React from 'react';
import {searchUsers} from './VisitorUtil';

interface SignedOutCheckboxProps {
    processVisitorCallback: any; //TODO type this
}

interface SignedOutCheckboxState {
    name: string;
    isSignedOutChecked: boolean;
}

export class SignedOutCheckbox extends React.Component<SignedOutCheckboxProps,  SignedOutCheckboxState> {
    constructor(props: SignedOutCheckboxProps){
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
            <input
                className="signout-checkbox"
                type="checkbox"
                defaultChecked={this.state.isSignedOutChecked}
                ref="complete"
                onChange={this.handleCheckedChange}
            />
      ) 
    }
  }
export default SignedOutCheckbox;