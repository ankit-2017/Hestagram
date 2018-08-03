import React, {Component} from 'react';
import axios from 'axios';
import user from './images/user.png';
import './home.css';
import Header from './Header';
import {Link} from 'react-router-dom';
import LocalStorage from 'localstorage';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import {Button, Col, Grid, Row} from 'react-bootstrap';
import ip from './env'

class UserData extends Component{
    constructor(props){
        super(props);
        this.state={
            followId:'',
            userInfo:[],
            userData1:'',
            followStatus:true,
            follow:false,
            image:[],
            visible: false,
            fdata:[]
        }

    }
    componentWillMount(){
        const follow_id = this.props.match.params.id;

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData1:abc[1]});
        // console.log(abc[1]);

        this.setState({followId:follow_id});
        if(!abc[1]){
            window.location.href='/';
            return false

        }


    }
    componentDidMount(){
            const self = this;
            axios.post(`${ip}/api/ShowData`, {
                fid: self.state.followId
            })
                .then(function (response) {
                    console.log("show data", response);
                    if (response.data.data !== null) {
                        let data3 = response.data;
                        self.setState({userInfo: data3})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });


            axios.post(`${ip}/api/CheckFollow`, {
                userid: self.state.userData1.data2._id,
                following_id: self.state.followId
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data.data === null) {

                        self.setState({followStatus: true, follow: false})
                    }
                    else {
                        self.setState({followStatus: false, follow: true})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.get(`${ip}/api/ShowUserImage/` + self.state.followId)
                .then(function (response) {
                    console.log("file response", response);
                    self.setState({image: response.data.data})
                })
                .catch(error => {
                    console.log(error);
                });


            axios.post(`${ip}/api/AdminFollow`, {
                userid: self.state.followId
            })
                .then(function (response) {
                    console.log("follow response", response);
                    self.setState({fdata: response.data})
                })
                .catch(error => {
                    console.log(error);
                });
    }
    Follow = ()=>{
        const self=this;
        axios.post(`${ip}/api/follow`,{
            userid:self.state.userData1.data2._id,
            fid:self.state.followId
        })
            .then(function (response) {
                console.log(response);
                if(response.data.error===false){
                    self.setState({followStatus:false, follow:true})
                }
                else {
                    self.setState({followStatus:true, follow:false})
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    };

    UnFollow = ()=>{
        const self=this;
        axios.post(`${ip}/api/UnFollow`,{
            userid:self.state.userData1.data2._id,
            fid:self.state.followId
        })
            .then(function (response) {
                console.log(response);
                if(response.data.error===false){
                    self.setState({followStatus:true, follow:false})
                }
                else {
                    self.setState({followStatus:false, follow:true})
                }

            })
            .catch(function (error) {
                console.log(error)
            })
    };

    render(){
        const image5=[];
        this.state.image.map((item, i)=>{
            item.images.map((item2, i2)=>{
                image5.push({src:`${ip}/upload/assets/`+item2, alt:'hestagram'});
            })
        });



        return(
            <div>
                <Header/>
                <Grid id="usermain" >
                    <Row>

                    <Col md={3}>
                        <div id="userdataImageDiv">

                            {this.state.userInfo.profile_img === "" ?
                                <img className="img-circle"
                                     src={user}
                                     id="userdataImage"
                                     alt="Profile pic"/>
                                :
                                <img src={`${ip}/upload/assets/profile/`+this.state.userInfo.profile_img}
                                     className="img-circle"
                                     id="userdataImage"
                                     alt="profile "
                                />
                            }
                        </div>
                    </Col>
                    <Col md={9} >
                        <div id="userData">
                            <ul>
                                <li><span><strong>{this.state.userInfo.username}</strong></span></li>
                                <li><span>{this.state.userInfo.fullname}</span></li>

                            </ul>

                            <ul id="secondul" >
                                <li><span> {this.state.image.length} posts</span></li>
                                <li><span>0 followers</span></li>
                                <li><span>{this.state.fdata.length} following</span></li>

                            </ul>
                            <div id="thirdul">
                                <table border="0">
                                    <tbody>
                                    <tr  >
                                        <td><strong>City</strong></td>
                                        <td>{this.state.userInfo.city}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Studied at</strong></td>
                                        <td>{this.state.userInfo.school}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Graduate from:</strong></td>
                                        <td>{this.state.userInfo.college}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>


                            <div id="buttondiv">
                                {this.state.followStatus?<Button bsStyle="primary" onClick={this.Follow} >Follow</Button>: null}
                                {this.state.follow?<Button bsStyle="success" onClick={this.UnFollow} >Unfollow</Button>: null}

                            </div>



                        </div>
                    </Col>

                    </Row>
                    <Col className="user-post">
                        <h3> User posts </h3>
                        <Row>
                            {this.state.image.map((item, i)=>{
                                return <span key={i}>
                                        {item.images.map((image, i)=>{
                                            return <Col md={3} key={i}>
                                                        <span>
                                                            <img src={`${ip}/upload/assets/`+image}
                                                                 id="userdataIMG"
                                                                 className="img-rounded"
                                                                 onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                 alt="Users posts"
                                                            />
                                                            <Viewer
                                                                visible={this.state.visible}
                                                                onClose={() => { this.setState({visible: false }); } }
                                                                images={image5}
                                                            />
                                                        </span>
                                                    </Col>
                                        })}

                                </span>
                            })}
                        </Row>
                    </Col>
                </Grid>

            </div>
        );
    }
}
export default UserData;