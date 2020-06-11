import React from 'react';
import { Visitor, changeVisitor} from './VisitorUtil';
import { Button } from 'react-bootstrap';


/*Fix these optional props*/
interface VisitorSignOutComponentProps {
    visitor: Visitor
    processVisitorCallback: any; /// TODO: Type functions
}

interface VisitorSignOutComponentState {
    signingOut: boolean;
}

export class VisitorSignOutComponent extends React.Component<VisitorSignOutComponentProps,  VisitorSignOutComponentState> {
    constructor(props: VisitorSignOutComponentProps){
        super(props);
        this.state = {
            signingOut: false,
        }
        this.signOutVisitor = this.signOutVisitor.bind(this);
    }

    private signOutVisitor = () => {
        const {
            visitor,
            processVisitorCallback
        } = this.props;
        this.setState({signingOut: true}, () => {
            let date = new Date().toLocaleString()
            visitor.date = date;
            visitor.isSignedOut = true;
            changeVisitor(visitor, processVisitorCallback);
            this.setState({signingOut: false});
        });
    }

    private getVisitedRow() {
        const {visitor} = this.props;
        const {signingOut} = this.state;
        if (visitor.isSignedOut && visitor.date) { // TODO: Change this date truthy value?
            return visitor.date;
        } else if (signingOut) {
            return (
                <button className="btn disabled btn--smaller btn--outline">Signing out <i className="fas fa-spinner"></i></button>
            );
        } else {
            return (<button className="btn btn--smaller btn--outline" onClick={this.signOutVisitor}>Sign out</button>);
        }  
    }

    render() {
      const {visitor} = this.props;
      const {signingOut} = this.state;
      if (visitor.isSignedOut && visitor.date) { // TODO: Change this date truthy value?
          return visitor.date;
      } else if (signingOut) {
          return (
              <Button variant="outline-secondary">Signing out <i className="fas fa-spinner"></i></Button>
          );
      } else {
          return (
          <Button variant="outline-secondary" onClick={this.signOutVisitor}>Sign out</Button>
          );
      }  
  }
    }
export default VisitorSignOutComponent;