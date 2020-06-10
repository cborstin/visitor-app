import React from 'react';

interface SearchBarProps {
}

interface SearchBarState {
}
export class SearchBar extends React.Component<SearchBarProps,  SearchBarState> {
    constructor(props: SearchBarProps){
        super(props);
    }

    render() {
      return <div className="clearfix">
                <button className="btn  btn--brand float-right ml-2"><i className="fas fa-user"></i>&nbsp;&nbsp;New visitor</button>
                <input type="text" className="p-2 text-sm border float-right max-w-xs w-full" placeholder="Search"/>
                <img src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg" alt="Envoy Logo" width="31" className="py3 block"/> 
            </div>
    }
  }
export default SearchBar;