import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import ip from './env'

import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import {Grid, Row, Col, Well, Form, FormControl, ControlLabel, Button, FormGroup} from 'react-bootstrap';
import LocalStorage from "localstorage";

class Suggest extends Component{
    constructor(props){
        super(props);
        this.state={
            city:'',
            uemail:'',
            value1:'',
            display:'',
            schoolName:'',
            profession:'',
            collageName:'',
            hobbies:'',
            userData:'',
            collage:[
                "ABES institute of Technology, Ghaziabad, U.P",
                "JSS Academy , Noida, U.P",
                "AKJ Engineering college, Ghaziabad",
                "Krishna Institute of Engineering and Technology, Ghaziabad",
                "Galgotia College of Engineering, Greater Noida, U.P",
                "Krishna Engineering Collage, Mohan Nagar, Ghaziabad",
                "Hi Tech Engineering College, Ghaziabad"
            ],
            search:'',
            value:'',
            school:[
                "Jawahar Navodaya Vidyalaya, Kanpur",
                "Kendriya vidyalaya delhi",
                "Loyla convent school, Noida",
                "Rose vally school, Gurugram",
                "Delhi Public School, preet vihar , Delhi",
                "Ryan International, Ghaziabad, U.P",
                "Saraswati Vidya mandir, Lucknow, U.P",
                "The Gurukul, Saket, Delhi",
                "Sarvodya Kanya Vidyalaya, West Vinod nagar, Delhi"
            ]
        }

    }
    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});

    }


    AddDetail=(event)=>{
        event.preventDefault();
      const schoolName=document.getElementById('school').value;
      const collageName=document.getElementById('collage').value;
      const prof = document.getElementById('prof').value;
      const hobbies = document.getElementById('hobby').value;

        const self=this;
        axios.post(`${ip}/api/suggestion`,{
        city:self.state.value,
        school1:schoolName,
        collage:collageName,
        prof:prof,
        hobbies:hobbies,
        username:self.state.userData.data2.username
        })
            .then(function (response) {
                console.log(response);
                if(response.data.userdata.city!==null){
                    self.props.history.push('/Home');
                }
                else {
                    self.props.history.push('/suggestion');
                }

            })
            .catch(error=>{
                console.log(error);
            })

    };
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value, Plocation:e.target.value})
    };

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction);
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    };

    render(){
        const buttonStyle1={
          display:'inline-block'

        };

        const buttonStyle2={
            display:'inline-block',
            float:'right'

        };
        const Key= "AIzaSyAsqj2hZecaNhLJ4nAt4TQuW8j2d9B7lwQ";

        const style1={
            marginBottom:0
        };
        const {search, value} = this.state;

        return(
            <div >
                <Grid>
                    <Row>
                        <Col md={6} mdOffset={3}  >
                            <Well bsSize="large">


                                <div id="suggestion-heading" >
                                    <h4>Complete your profile for better experience</h4>
                                    <p> with friends and belongings</p>
                                </div>
                                <Form horizontal onSubmit={this.AddDetail} >
                                    <Well>
                                        <FormGroup style={style1} >
                                            <Col md={2} componentClass={ControlLabel} >City
                                            </Col>
                                            <Col md={10}>
                                                <ReactGoogleMapLoader
                                                    params={{
                                                        key: Key,
                                                        libraries: "places,geocode",
                                                    }}
                                                    render={googleMaps =>
                                                        googleMaps && (
                                                            <ReactGooglePlacesSuggest
                                                                googleMaps={googleMaps}
                                                                autocompletionRequest={{
                                                                    input: search,
                                                                    // Optional options
                                                                    // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                                                                }}
                                                                // Optional props
                                                                onSelectSuggest={this.handleSelectSuggest}
                                                                textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                                                                customRender={prediction => (
                                                                    <div className="customWrapper">
                                                                        {prediction
                                                                            ? prediction.description
                                                                            : "My custom no results text"}
                                                                    </div>
                                                                )}
                                                            >
                                                                <FormGroup>
                                                                    <FormControl
                                                                        type="text"
                                                                        value={value}
                                                                        placeholder="Search Your city"
                                                                        autoComplete="off"
                                                                        required
                                                                        onChange={this.handleInputChange}
                                                                    />
                                                                </FormGroup>
                                                            </ReactGooglePlacesSuggest>
                                                        )
                                                    }
                                                />
                                            </Col>
                                        </FormGroup>

                                    </Well>

                                    <Well>
                                        <FormGroup style={style1} >
                                            <Col md={2} componentClass={ControlLabel} >School</Col>
                                            <Col md={10}>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Your School"
                                                    id="school"
                                                    list="schoolList"

                                                />

                                                <datalist id="schoolList">
                                                    {this.state.school.map((item,i)=> <option key={i} >
                                                        {item}
                                                    </option>)}
                                                </datalist>


                                            </Col>
                                        </FormGroup>

                                    </Well>

                                    <Well>
                                        <FormGroup style={style1} >
                                            <Col md={2} componentClass={ControlLabel} >Collage</Col>
                                            <Col md={10}>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Collage"
                                                    id="collage"
                                                    list="collage1"
                                                    onChange={this.AddCollage}
                                                />

                                                <datalist id="collage1">
                                                    {this.state.collage.map((item,i)=> <option key={i} >
                                                        {item}
                                                    </option>)}
                                                </datalist>
                                            </Col>
                                        </FormGroup>

                                    </Well>

                                    <Well>
                                        <FormGroup style={style1} >
                                            <Col md={2} componentClass={ControlLabel} >Profession</Col>
                                            <Col md={10}>
                                                <FormControl componentClass="select" id="prof"  placeholder="Select Profession">
                                                    <option value="student">Student</option>
                                                    <option value="Employee">Employee</option>
                                                    <option value="Business">Business man</option>
                                                    <option value="Trainer">Trainer</option>
                                                    <option value="teacher">Teacher</option>

                                                </FormControl>
                                            </Col>
                                        </FormGroup>

                                    </Well>

                                    <Well>
                                        <FormGroup style={style1} >
                                            <Col md={2} componentClass={ControlLabel} >Hobbies</Col>
                                            <Col md={10}>
                                                <FormControl
                                                    rows='3'
                                                     onChange={this.AddHobbies}
                                                     componentClass="textarea"
                                                     placeholder="Hobbies"
                                                    id="hobby"
                                                />
                                            </Col>
                                        </FormGroup>

                                    </Well>
                                    <Well>
                                        <Link to="/home"> <p style={buttonStyle1} >Skip</p></Link>
                                        <Button type="submit" bsStyle="primary"  style={buttonStyle2} >Next</Button>
                                    </Well>
                                </Form>


                            </Well>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}
export default Suggest