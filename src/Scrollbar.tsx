import React from 'react';

interface ScrollbarProps {
    
}

interface ScrollbarState {
}
export class Scrollbar extends React.Component<ScrollbarProps,  ScrollbarState> {
    constructor(props: ScrollbarProps){
        super(props);
    }

    render() {
      return ( 
      <div className="mt-8 mb-8">
        <p className="mt-2">
            <div className="flex">
            <a href="#" className="mr-4 px-1"> <i className="fas fa-angle-left"></i> </a>
            <div className="flex text-center mr-4">
                <span className="w-20">
            1
        </span>
                <span className="w-20">&nbsp;/&nbsp;</span>
                <span className="w-20">
            2
        </span>
            </div>
            <a href="#" className="mr-4 px-1"><i className="fas fa-angle-right"></i></a>
            </div>
        </p>
        </div>
      );
    }
  }
export default Scrollbar;