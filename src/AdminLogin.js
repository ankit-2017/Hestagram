import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import {Button, Col, Grid, Row, Panel, Form, FormControl, FormGroup, Alert} from 'react-bootstrap';
import ip from './env'

class AdminLogin extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            wrong:false
        }
    }
    Auser=(event)=>{
        const user = event.target.value;
        this.setState({username:user})
    };

    Apass=(event)=>{
        const pas = event.target.value;
        this.setState({password:pas})
    };

    ADMIN=(event)=>{
        event.preventDefault();
        const self=this;
        axios.post(`${ip}/api/AdminLogin`,{
            username:self.state.username,
            password:self.state.password
        })
            .then(function (response) {
                console.log(response);
                if(response.data.loginData!== null){
                    self.props.history.push('/adminPanel');
                }
                else{
                    self.setState({wrong:true});
                    self.props.history.push('/admin');
                }
            })
            .catch(error=>{
                console.log(error)
            })
    };

    render(){

        return(
            <section id="main">
                <Grid>
                    <Row>
                        <Col md={6} mdOffset={4}>
                            <Col md={8}>
                                <section id="login">
                                    <Panel bsStyle="default">
                                        <Panel.Body>
                                            <h2 id="appname">Admin Login</h2>
                                            <section id="loginForm">
                                                {this.state.wrong?<Alert bsStyle="danger">
                                                    Username and password not matched
                                                </Alert>:null}

                                                <Form onSubmit={this.ADMIN} >
                                                    <FormGroup>
                                                        <FormControl type="text" name="Aemail" id="aemail" onChange={this.Auser} placeholder="Enter Username "/>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <FormControl type="password" name="Afullname" id="afullname" onChange={this.Apass} placeholder="Enter password"/>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Button id="login-btn" type="submit"  bsStyle="success" block>Login</Button>
                                                    </FormGroup>

                                                </Form>

                                            </section>

                                            <FormGroup id="forgot">
                                                <Link  to="#">Forgot password</Link>
                                            </FormGroup>



                                        </Panel.Body> {/* end of panel-body */}
                                    </Panel> {/* end of panel */}
                                </section>
                            </Col> {/* end of col-md-8 */}
                        </Col> {/* end of col-md-6 */}
                    </Row> {/* end of row */}
                </Grid> {/* end of container */}
            </section>
        );
    }
}
export default AdminLogin