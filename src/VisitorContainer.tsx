import React from 'react';
import VisitorHeader from './VisitorHeader';
import VisitorRow from './VisitorRow';
import ScrollBar from './Scrollbar';
import {Visitor} from './VisitorUtil';

interface VisitorContainerProps {
    visitors: Visitor[];
}

interface VisitorContainerState {
}
export class VisitorContainer extends React.Component<VisitorContainerProps,  VisitorContainerState> {
    constructor(props: VisitorContainerProps){
        super(props);
    }

    renderVisitorRows(){
        const {visitors} = this.props;
        return visitors.map(visitor => {
            return <VisitorRow
                firstName={visitor.firstName}
                lastName={visitor.lastName}
                notes={visitor.notes}
                signedOut={visitor.isSignedOut}
                date={visitor.date}
            />
        });
    }

    render() {
      return <div className="mx-auto">

      <div className="mt-8">
        <table className="w-full">
        <VisitorHeader/>
          <tbody className="align-baseline">
            {this.renderVisitorRows()}
          </tbody>
        </table> 
       <ScrollBar/>
    </div>
  </div>;
    }
  }
export default VisitorContainer;