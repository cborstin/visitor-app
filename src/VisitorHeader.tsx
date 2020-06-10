import React from 'react';

interface VisitorHeaderProps {
    
}

interface VisitorHeaderState {
}
export class VisitorHeader extends React.Component<VisitorHeaderProps,  VisitorHeaderState> {
    constructor(props: VisitorHeaderProps){
        super(props);
    }

    render() {
      return (<thead>
                <tr>
                    <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Name</th>
                    <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Notes</th>
                    <th className="text-sm font-semibold text-grey-darker p-1 bg-grey-lightest">Signed out</th>
                </tr>
            </thead>
      );
    }
  }
export default VisitorHeader;