import React from 'react';
import VisitorHeader from './VisitorHeader';
import VisitorRow from './VisitorRow';
import ScrollBar from './Scrollbar';

interface VisitorContainerProps {
}

interface VisitorContainerState {
}
export class VisitorContainer extends React.Component<VisitorContainerProps,  VisitorContainerState> {
    constructor(props: VisitorContainerProps){
        super(props);
    }

    render() {
      return <div className="mx-auto">

      <div className="mt-8">
        <table className="w-full">
        <VisitorHeader/>
          <tbody className="align-baseline">
            {
            <VisitorRow
                name={"Esteban Arango"}
                notes={"Frisbee and Vegan food"}
                signedOut={true}
                date={"04 / 24 / 2019 11:00pm"}
            />
            /* <tr>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Esteban Arango</td>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Frisbee and Vegan food</td>
              <td className="p-1 border-t border-grey-light font-mono text-xs">04 / 24 / 2019 11:00pm</td>
            </tr>
            <tr>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Ryan Labouve</td>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Everything about Oklahoma</td>
              <td className="p-1 border-t border-grey-light font-mono text-xs"><button className="btn btn--smaller btn--outline">Sign out</button></td>
            </tr>
            <tr>
              <td className="p-2 border-t border-grey-light font-mono text-xs">David Kroondyk</td>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Tennis 🎾</td>
              <td className="p-1 border-t border-grey-light font-mono text-xs">
                <button className="btn disabled btn--smaller btn--outline">Signing out <i className="fas fa-spinner"></i></button>
                </td>
            </tr>
            <tr>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Bill Heaton</td>
              <td className="p-2 border-t border-grey-light font-mono text-xs">Motorcycles 🏍</td>
              <td className="p-1 border-t border-grey-light font-mono text-xs">04 / 24 / 2019 11:00pm</td>
            </tr> */}
          </tbody>
        </table> 
       <ScrollBar/>
    </div>
  </div>;
    }
  }
export default VisitorContainer;