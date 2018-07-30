import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import gmail from './gmail.png';
import './App.css';
import axios from 'axios';
import LocalStorage from 'localstorage';
import ip from './env'

import {Button, Col, Grid, Row, Panel, Form, FormControl, FormGroup, Alert, Image} from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            token3:'',
            email1:'',
            email2:'',
            name:'',
            city:'',
            id:'',
            verified:false,
            login_success:false,
            loginFail:false,
            homePage:'',
            suggestion:'',
            loginData:''
        };


    }

    componentWillMount(){
        let token3 = this.props.match.params.token;
        const email = this.props.match.params.email;
        this.setState({token3:token3, email1:email});

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({loginData: abc[1]});


    }

    componentDidMount(){

        console.log(this.state.token3);
        const self=this;
        axios.post(`${ip}/api/auth`,{
            token:this.state.token3,
            email:this.state.email1
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data);
                    if(response.data==="") {
                        self.setState({verified: true})
                    }


                });
        try {
            if(this.state.loginData.data2.username!==null){
                this.props.history.push('/Home')
            }
        }
        catch (error) {
            this.props.history.push('/')
        }

    }

    username1=(event)=>{
        let username = event.target.value;
        this.setState({username:username})
    };
    Password1=(event)=>{
        let pass1 = event.target.value;
        this.setState({password:pass1})
    };
    Login1=(event)=>{

        event.preventDefault();
        const self = this;
        axios.post(`${ip}/api/Login`,{
            username:this.state.username,
            password:this.state.password
        })
            .then(function (response) {
                console.log(response);

                if(response.data.data===true && response.data.verify===true){

                    const UserData= new LocalStorage('UserData');
                    UserData.put("UserData", response.data);
                    self.setState({login_success:true,
                        email2:response.data.email,
                        name:response.data.name,
                        city:response.data.city,
                        id:response.data.id

                    });
                    // console.log('city of users', response.data.data2.city);
                    if(response.data.data2.city!==""){
                       // self.setState({homePage:true})
                        self.props.history.push('/Home')
                    }
                    else if( response.data.data2.city===""){
                        // self.setState({suggestion:true})
                        self.props.history.push('/suggestion')
                    }
                }
                else
                {
                    self.setState({loginFail:true});
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    };

    render(){

        // console.log('login check',this.state.loginData);
        return(
    <section id="main">
        <Grid>
            <Row>
                <Col md={6}>
                    <div id="main-side">
                        <h2>Welcome to Hestagram</h2>
                        <h4>A photo sharing Application</h4>
                        <Image id="main-img" src={gmail} alt="Login image" />
                    </div>

                </Col>
                <Col md={6}>
                    <Col md={8}>
                        <section id="login">
                            <Panel bsStyle="default">
                                <Panel.Body>

                                    {this.state.loginFail?<Alert bsStyle="danger">
                                        invalid user!!
                                    </Alert>:null}
                                    <h2 id="appname">Hestagram</h2>
                                    <section id="loginForm">

                                        <Form onSubmit={this.Login1}>
                                            <FormGroup>
                                                <FormControl type="text" required onChange={this.username1} placeholder="Enter Email or Username "/>
                                            </FormGroup>

                                            <FormGroup>
                                                <FormControl type="password" required onChange={this.Password1} placeholder="Enter password"/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Button id="login-btn" type="submit"  bsStyle="success" block>Login</Button>
                                            </FormGroup>

                                        </Form>

                                    </section>

                                    <FormGroup>
                                        <FormGroup id="forgot">
                                            <Link  to="/forgot">Forgot password</Link>
                                        </FormGroup>
                                    </FormGroup>
                                    <Panel bsStyle="default">

                                            <p id="signup-link">Not have an account <Link  to="/SignUp" >Sign up</Link> </p>

                                    </Panel>

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


export default Login