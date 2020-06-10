import React from 'react';
import VisitorHeader from './VisitorHeader';
import VisitorRow from './VisitorRow';
import NewVisitorComponent from './NewVisitorComponent';
import {Visitor} from './VisitorUtil';

interface VisitorContainerProps {
    visitors: Visitor[];
    processVisitorCallback: any; //TODO type this
}

interface VisitorContainerState {
}
export class VisitorContainer extends React.Component<VisitorContainerProps,  VisitorContainerState> {
    constructor(props: VisitorContainerProps){
        super(props);
    }

    renderVisitorRows(){
        const {visitors, processVisitorCallback} = this.props;
        return visitors.map(visitor => {
            return <VisitorRow
                id={visitor.id}
                firstName={visitor.firstName}
                lastName={visitor.lastName}
                notes={visitor.notes}
                signedOut={visitor.isSignedOut}
                date={visitor.date}
                processVisitorCallback={processVisitorCallback}
            />
        });
    }

    render() {
        const {processVisitorCallback} = this.props;
      return (
        <div className="mx-auto">
            <div className="mt-8">
                <table className="w-full">
                <img src="https://dashboard.envoy.com/assets/images/logo-small-red-ba0cf4a025dd5296cf6e002e28ad38be.svg" alt="Envoy Logo" width="31" className="py3 block"/> 
                {<NewVisitorComponent processVisitorCallback={processVisitorCallback}/>}
                <VisitorHeader/>
                <tbody className="align-baseline">
                    {this.renderVisitorRows()}
                </tbody>
                </table> 
            </div>
        </div>
      );
      
    }
  }
export default VisitorContainer;