import React from 'react';


/*Fix these optional props*/
interface VisitorRowProps {
    firstName?: string;
    lastName?: string;
    notes?: string;
    signedOut?: boolean | undefined;
    date?: string | undefined;
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
    }

    /*TODO: Why the fuck do these types break down oh my fucking god*/
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
            return (<td className="p-1 border-t border-grey-light font-mono text-xs"><button className="btn btn--smaller btn--outline">Sign out</button></td>);
        }  
    }

    render() {
        const {signedOut, firstName, lastName, notes, date} = this.props;
        const fullName = firstName + " " + lastName;
      return <tr>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{fullName}</td>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{notes}</td>
                {this.getVisitedRow(signedOut, date)}
            </tr>;
    }
  }
export default VisitorRow;