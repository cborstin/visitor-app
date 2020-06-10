import React from 'react';
import VisitorSignOutComponent from './VisitorSignOutComponent';
import {Visitor} from './VisitorUtil';
import BootstrapTable from 'react-bootstrap-table-next'; 
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';   
import paginationFactory from 'react-bootstrap-table2-paginator'; 


interface VisitorContainerProps {
    visitors: Visitor[];
    processVisitorCallback: any; //TODO type this
}

interface VisitorContainerState {
    columns: any;
    signedOutChecked: boolean;
}
export class VisitorContainer extends React.Component<VisitorContainerProps,  VisitorContainerState> {
    constructor(props: VisitorContainerProps){
        super(props);
        this.cellButton = this.cellButton.bind(this);
        this.state = {
            signedOutChecked: false,
            columns: [
            {  
                dataField: 'Name',
                text: 'Name',
                filter: textFilter(),
            }, 
            {  
                dataField: 'Notes',
                text: 'Notes',
            },
            {  
                dataField: 'visitor',
                formatter: this.cellButton,
                text: 'Signed Out',
            }
            ]
        }
    }
     
    cellButton = (cell, row) => {
        const {processVisitorCallback} = this.props;
            return (
                <VisitorSignOutComponent 
                    visitor={cell}
                    processVisitorCallback={processVisitorCallback}
                />
             );
      }

    getVisitorData(){
        const {visitors} = this.props;
        return visitors.map(visitor => {
            return {
                Name: visitor.firstName + " " + visitor.lastName,
                Notes: visitor.notes,
                Date: visitor.date,
                visitor: visitor,
            }
        });
    }

    render() {
        const {processVisitorCallback} = this.props;
        let visitorData = this.getVisitorData();
        console.log(visitorData);
        // visitorData = []
        const options = {  
            page: 2,   
            sizePerPageList: [ {  
                text: '5', value: 5  
                }, {  
                text: '10', value: 10  
                }, {  
                text: 'All', value: visitorData.length
                } ],    
                sizePerPage: 5,   
                pageStartIndex: 0,   
                paginationSize: 3,    
                prePage: 'Prev',   
                nextPage: 'Next',   
                firstPage: 'First',   
                lastPage: 'Last',   
            };
      return (
          <div>
            <BootstrapTable   
                hover  
                keyField='id'   
                data={visitorData}   
                columns={ this.state.columns } 
                filter={filterFactory()}
                pagination={paginationFactory(options)}/>
            </div>
      );
      
    }
  }
export default VisitorContainer;