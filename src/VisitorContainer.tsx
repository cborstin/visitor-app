import React from 'react';
import VisitorHeader from './VisitorHeader';
import VisitorSignOutComponent from './VisitorSignOutComponent';
import NewVisitorComponent from './NewVisitorComponent';
import {Visitor} from './VisitorUtil';
import BootstrapTable from 'react-bootstrap-table-next';  

interface VisitorContainerProps {
    visitors: Visitor[];
    processVisitorCallback: any; //TODO type this
}

interface VisitorContainerState {
    columns: any;
}
export class VisitorContainer extends React.Component<VisitorContainerProps,  VisitorContainerState> {
    constructor(props: VisitorContainerProps){
        super(props);
        this.cellButton = this.cellButton.bind(this);
        this.state = {
            columns: [
            {  
                dataField: 'Id',
                text: 'Id',
            }, 
            {  
                dataField: 'Name',
                text: 'Name',
            }, 
            {  
                dataField: 'Notes',
                text: 'Notes',
            },
            {  
                dataField: 'visitor',
                text: 'Signed Out',
                formatter: this.cellButton
            }]
        }
    }
     
    cellButton = (cell, row) => {
        const {processVisitorCallback} = this.props;
        if (cell) {
            console.log("Returned component");
            return (
                <VisitorSignOutComponent 
                    visitor={cell}
                    processVisitorCallback={processVisitorCallback}
                />
             );
        }
        console.log("NOT COMPONENT", cell);
         
      }

    getVisitorData(){
        const {visitors, processVisitorCallback} = this.props;
        return visitors.map(visitor => {
            return {
                Id: visitor.id,
                Name: visitor.firstName + " " + visitor.lastName,
                Notes: visitor.notes,
                Date: visitor.date,
                visitor: visitor,
            }
        });
    }

    render() {
        const {processVisitorCallback} = this.props;
      return (
        <div className="mx-auto">
            <div className="mt-8">
                    <BootstrapTable   
                    hover  
                    keyField='id'   
                    data={ this.getVisitorData()}   
                    columns={ this.state.columns } />
            </div>
        </div>
      );
      
    }
  }
export default VisitorContainer;