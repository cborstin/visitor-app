import React from 'react';
import { 
    Button, 
    Modal,
    ModalTitle, 
    ModalBody, 
    ModalFooter } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Visitor, addUser} from './VisitorUtil';

interface NewVisitorComponentProps {
    processVisitorCallback: any; // TODO type this
}

interface NewVisitorComponentState {
    firstName: string;
    lastName: string;
    notes: string;
    modal: boolean;
}
export class NewVisitorComponent extends React.Component<NewVisitorComponentProps,  NewVisitorComponentState> {
    constructor(props: NewVisitorComponentProps){
        super(props);
        this.state = { 
            modal: false,
            firstName: '',
            lastName: '' ,
            notes: '',
        };
        this.showModal = this.showModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showModal = () => {
        this.setState({modal: true});
    }
    handleCloseModal = () => {
        this.setState({modal: false});
    }
    handleChangeLastName(event: any) {
        this.setState({lastName: event.target.value});
    }
    handleChangeNotes(event: any) {
        this.setState({notes: event.target.value});
    }
    handleChangeFirstName(event: any) {
        this.setState({firstName: event.target.value});
    }
    
    handleSubmit(event: any) {
        const {processVisitorCallback} = this.props;
        this.setState({modal: false});
        event.preventDefault();
        const visitorParams = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            notes: this.state.notes,
        }
        const newVisitor = new Visitor(visitorParams);
        addUser(newVisitor, processVisitorCallback);     
    }

    renderModal() {
        return (
            <Modal show={this.state.modal}>
            <form onSubmit={this.handleSubmit}>
              <ModalTitle>New Visitor</ModalTitle>
              <ModalBody>
              <div className="row">
                <div className="form-group col-md-4">
                <label>First Name:</label>
                <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} className="form-control" />
                  </div>
                  </div>
                <div className="row">
                 <div className="form-group col-md-4">
                <label>Last Name:</label>
                    <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} className="form-control" />
                   </div>
                  </div>
                <div className="row">
                 <div className="form-group col-md-4">
                  <label>Notes:</label>
                    <input type="text" value={this.state.notes} onChange={this.handleChangeNotes} className="form-control" />
                   </div>
                  </div>
              </ModalBody>
              <ModalFooter>
                <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
                <Button variant="secondary" onClick={this.handleCloseModal}>Close</Button>
              </ModalFooter>
              </form>
            </Modal>
        );
    }

    render() {
      return (
        <div>
            <button className="btn  btn--brand float-right ml-2" onClick={this.showModal}>
                <i className="fas fa-user"></i>&nbsp;&nbsp;New visitor
            </button>
            {this.renderModal()}
        </div>
      );
    }
  }
export default NewVisitorComponent;