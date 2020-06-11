import React from 'react';
import VisitorSignOutComponent from './VisitorSignOutComponent';
import {Visitor} from './VisitorUtil';
import NewVisitorComponent from './NewVisitorComponent';
import SignedOutCheckbox from './SignedOutCheckbox';
import BootstrapTable, {TableHeaderColumn} from 'react-bootstrap-table-next'; 
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';   
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';


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
        this.customSignedOutHeader = this.customSignedOutHeader.bind(this);
        this.state = {
            signedOutChecked: false,
            columns: [
            {  
                dataField: 'Name',
                text: 'Name:',
                filter: textFilter(),
            }, 
            {  
                dataField: 'Notes',
                text: 'Notes',
            },
            {  
                dataField: 'visitor',
                formatter: this.cellButton,
                headerFormatter: this.customSignedOutHeader,
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

    customSignedOutHeader() {
        const {processVisitorCallback} = this.props;
        return (
            <div>
            Signed Out
            <SignedOutCheckbox processVisitorCallback={processVisitorCallback}/>
        </div>
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
        const options = {
            custom: true,
            totalSize: visitorData.length
          };
      return (
            <PaginationProvider
                pagination={ paginationFactory(options) }
            >
            {
                ({
                paginationProps,
                paginationTableProps
                }) => (
                <div>
                    <BootstrapTable   
                        keyField='id'   
                        classes="visitor-table borderless"
                        headerWrapperClasses="visitor-table-header"
                        bordered={false} 
                        data={visitorData}   
                        columns={ this.state.columns } 
                        filter={filterFactory()}
                        { ...paginationTableProps }>
                        </BootstrapTable>
                        <div className="float-left">
                            <NewVisitorComponent processVisitorCallback={processVisitorCallback}/>
                        </div>
                        <div className="float-right">
                            <PaginationListStandalone
                                
                            { ...paginationProps }
                        />
                    </div>
                </div>
                )
            }
            </PaginationProvider>
                
      );
    }
  }
export default VisitorContainer;