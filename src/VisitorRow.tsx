import React from 'react';
import { Visitor, changeVisitor} from './VisitorUtil';


/*Fix these optional props*/
interface VisitorRowProps {
    id?: number;
    firstName?: string;
    lastName?: string;
    notes?: string;
    signedOut?: boolean | undefined;
    date?: string | undefined;
    processVisitorCallback: any; /// TODO: Type functions
}

interface VisitorRowState {
    signingOut: boolean;
}

export class VisitorRow extends React.Component<VisitorRowProps,  VisitorRowState> {
    constructor(props: VisitorRowProps){
        super(props);
        this.state = {
            signingOut: false,
        }
        this.signOutVisitor = this.signOutVisitor.bind(this);
    }

    private signOutVisitor = () => {
        const {
            id, 
            firstName,
            lastName,
            notes,
            processVisitorCallback,
        } = this.props;
        console.log("Signing out?");
        this.setState({signingOut: true}, () => {
            let date = new Date().toLocaleString()
            const visitorParams = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                notes: notes,
                isSignedOut: true,
                date: date,
            }
            let visitor = new Visitor(visitorParams);
            changeVisitor(visitor, processVisitorCallback);
            this.setState({signingOut: false});
        });
    }

    private getVisitedRow(signedOut: any, date: any) {
        const {signingOut} = this.state;
        if (signedOut && date) { // TODO: Change this date truthy value?
            return <td className="p-1 border-t border-grey-light font-mono text-xs">{date}</td>
        } else if (signingOut) {
            return (
                <td className="p-1 border-t border-grey-light font-mono text-xs">
                    <button className="btn disabled btn--smaller btn--outline">Signing out <i className="fas fa-spinner"></i></button>
                </td>
            );
        } else {
            return (<td className="p-1 border-t border-grey-light font-mono text-xs"><button className="btn btn--smaller btn--outline" onClick={this.signOutVisitor}>Sign out</button></td>);
        }  
    }

    render() {
        const {signedOut, firstName, lastName, notes, date} = this.props;
        const fullName = firstName + " " + lastName;
        console.log(signedOut, firstName, date);
      return <tr>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{fullName}</td>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{notes}</td>
                {this.getVisitedRow(signedOut, date)}
            </tr>;
    }
  }
export default VisitorRow;