import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Modal, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import hobit from './hobbit.jpg';


class Crop extends Component{
    constructor(props){
        super(props);
        this.state= {
            open1: false,
            crop: {
                x: 20,
                y: 10,
                width: 30,
                height: 10
            }
        }
    }
    closeModal=()=>{
        document.getElementById('mymodal').style.display="none";
    };

    handleCrop=(crop)=>{

            this.setState({ crop });
    };
    render(){

        return(
            <div>


                <div id="mymodal">
                    <span onClick={this.closeModal} className="close"
                          title="Close Modal">&times;</span>
                    <div id="modal-content">
                        <ReactCrop src={hobit} id="cropimg" onChange={this.handleCrop} crop={this.state.crop} />
                    </div>
                    <Button bsStyle="success" bsSize="large" >Crop</Button>
                </div>

            </div>
        );
    }
}
export default Crop