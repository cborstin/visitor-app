import React from 'react';

interface VisitorRowProps {
    name: string;
    notes: string;
    signedOut: boolean;
    date?: string;
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

    private getVisitedRow(signedOut: boolean, date: string | undefined) {
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
        const {signedOut, name, notes, date} = this.props;
      return <tr>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{name}</td>
                <td className="p-2 border-t border-grey-light font-mono text-xs">{notes}</td>
                {this.getVisitedRow(signedOut, date)}
            </tr>;
    }
  }
export default VisitorRow;