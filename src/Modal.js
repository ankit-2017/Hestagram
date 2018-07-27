import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Panel, Modal, Button, ModalBody, ModalHeader} from 'react-bootstrap';

class Example extends Component {

    render() {
        return (
            <div>

                <Modal >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>

                        <hr />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Example