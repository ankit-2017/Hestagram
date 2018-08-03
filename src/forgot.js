import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {Col, Alert, Panel,Button, Form, FormGroup, FormControl} from 'react-bootstrap';
import ip from './env'

class Forgot extends Component{
    constructor(props){
        super(props);
        this.state={
            user_email:'',
            wrongEmail:false,
            sendMail:false
        }
    }
    Email1=(event)=>{
      let email=event.target.value;
      this.setState({user_email:email})
    };

    HandleEmail =(event)=>{
        event.preventDefault();
        const self =this;
        console.log(this.state.user_email);
        axios.post(`${ip}/api/forgot`, {
            Femail:self.state.user_email
        })
            .then(function (response) {
                console.log(response);
                if(response.data.error === true){
                    self.setState({wrongEmail:true})
                }
                else{
                    self.setState({sendMail:true, wrongEmail:false})
                }
            })

    };
    render(){
        return(
            <div id="forgot" >
                <Col md={4} mdOffset={4} >
                    <Panel bsStyle="default" >
                        <Panel.Body>
                            { this.state.wrongEmail?
                            <Alert bsStyle="danger">
                                Email Id not registered!!
                            </Alert>
                                :

                             this.state.sendMail?
                                <Alert bsStyle="success">
                                    An Email with password reset link is send to {this.state.user_email}, Click on link to Reset password.
                                </Alert>
                                : null }

                        <h5>Enter your registered email Id to get password reset link</h5>
                        <Form onSubmit={this.HandleEmail} >
                            <FormGroup>
                                <FormControl type="email" onChange={this.Email1} placeholder="Enter email" name="email" />

                            </FormGroup>
                            <Col >
                            <FormGroup  >
                                <Button type="submit" name="submit">Submit</Button>
                            </FormGroup>
                            </Col>
                        </Form>
                        </Panel.Body>
                    </Panel>
                </Col>
            </div>
        );
    }
}
export default Forgot