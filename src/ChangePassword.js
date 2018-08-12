import React, {Component} from 'react';

import {Button, Col, Form, FormControl, FormGroup, ControlLabel, Alert} from 'react-bootstrap';
import axios from 'axios';
import LocalStorage from "localstorage";
import ip from './env'

import Popup from 'react-popup';
import './Css/PopupStyle.css'

class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            message:'',
            showMsg:false,
            Userdata:'',
            success:false

        }

    }
    componentWillMount(){
        const foo= new LocalStorage('UserData');
        const abc= foo.get('UserData');
        this.setState({UserData: abc[1]})
    }
    ChangePass=(event)=>{
        event.preventDefault();
        const oldpas= document.getElementById('pass').value;
        const newpas = document.getElementById('newpas').value;
        const cpas = document.getElementById('cpas').value;
        if(oldpas==="" && newpas==="" && cpas===""){
            Popup.create({
                title:'Null value alert',
                content:"Fields cannot be empty",
                buttons:{
                    right:[{
                        text:'Cancel',
                        className:'danger',
                        action:function () {
                            Popup.close();
                        }

                    }]
                }
            })
            return false
        }
        if(newpas!==cpas){
            this.setState({showMsg:true,success:false,message:'password and confirm password not matched'});

        }
        else {
            const self=this;
            axios.post(`${ip}/api/ChangePassword`,{
                username: self.state.UserData.data2.username,
                oldpas:oldpas,
                newpas:newpas,
                cpas:cpas
            })
                .then(response=>{
                    console.log(response)
                    if(response.data.matchStatus===false){
                        self.setState({showMsg:true,success:false,message:'Old password not correct'})
                    }
                    else{
                        self.setState({success:true, showMsg:false})
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }
    render(){
        return(
            <div>
                <Popup />
                {this.state.success?<Alert bsStyle='success'>Password updated successfully</Alert>:null}
                {this.state.showMsg?<Alert bsStyle='danger'>{this.state.message}</Alert>:null}
                <Form horizontal onSubmit={this.ChangePass} >
                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>Old Password</ControlLabel>
                        </Col>
                        <Col md={5}>
                            <FormControl type="password"  id='pass' placeholder="Enter Old password"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>New Password</ControlLabel>
                        </Col>
                        <Col md={5}>
                            <FormControl type="password"  id="newpas" placeholder="Enter New password"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={2}>
                            <ControlLabel>Confirm Password</ControlLabel>
                        </Col>
                        <Col md={5}>
                            <FormControl type="password"  id="cpas" placeholder="Confirm password"/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col md={5} mdOffset={2} >
                            <Button type='submit' bsStyle="primary" block>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
export default ChangePassword;