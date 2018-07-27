import React, {Component} from 'react';
import axios from 'axios';
import user from './user.png';
import './home.css';
import Header from './Header';
import {Link} from 'react-router-dom';
import LocalStorage from 'localstorage';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import {Button, Col, Grid, Row} from 'react-bootstrap';

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


    }
    componentDidMount(){
        const self=this;
        axios.post('http://localhost:4000/api/ShowData',{
            fid:self.state.followId
        })
            .then(function (response) {
                console.log("show data",response);
                if(response.data.data!==null){
                    let data3 = response.data;
                    self.setState({userInfo:data3})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            console.log("user id", self.state.userData1.data2._id);
            console.log("following id", self.state.followId);
        axios.post('http://localhost:4000/api/CheckFollow',{
            userid:self.state.userData1.data2._id,
            following_id:self.state.followId
        })
            .then(function (response) {
                console.log(response);
                if(response.data.data===null){

                    self.setState({followStatus:true, follow:false})
                }
                else {
                    self.setState({followStatus:false, follow:true})
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/api/ShowImage/' + self.state.followId)
            .then(function (response) {
                console.log("file response", response);
                self.setState({image:response.data.image})
            })
            .catch(error=>{
                console.log(error);
            });
        axios.post('http://localhost:4000/api/AdminFollow',{
            userid:self.state.followId
        })
            .then(function (response) {
                console.log("follow response", response);
                self.setState({fdata:response.data})
            })
            .catch(error=>{
                console.log(error);
            });
    }
    Follow = ()=>{
        const self=this;
        axios.post('http://localhost:4000/api/follow',{
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

    render(){
        const image5=[];
        this.state.image.map((item, i)=>{
            image5.push({src:item.image1, alt:'hestagram'});
            image5.push({src:item.image2, alt:'hestagram'});
            image5.push({src:item.image3, alt:'hestagram'});
            image5.push({src:item.image4, alt:'hestagram'});
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
                                <img src={'http://localhost:4000/upload/assets/profile/'+this.state.userInfo.profile_img}
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
                                <table border="0"   >
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
                                {this.state.followStatus?<Link id="follow" to="#" onClick={this.Follow} >Follow</Link>: null}
                                {this.state.follow?<Button bsStyle="success" >Following</Button>: null}

                            </div>



                        </div>
                    </Col>

                    </Row>
                    <Col className="user-post">
                        <h3> User posts </h3>
                        <Row>
                            {this.state.image.map((item, i)=>{
                                return <span>
                                <Col md={3}>
                                    {item.image1!== undefined?
                                        <span>
                                    <img src={item.image1} id="userdataIMG" className="img-rounded" onClick={() => { this.setState({ visible: !this.state.visible }); } } alt="Users posts" />
                                    <Viewer
                                        visible={this.state.visible}
                                        onClose={() => { this.setState({visible: false }); } }
                                        images={image5}
                                    />
                                    <h5>{item.caption}</h5>
                                        </span>
                                        :null
                                    }
                                </Col>

                                    <Col md={3}>
                                    {item.image2!== undefined?
                                        <span>
                                    <img src={item.image2} id="userdataIMG" className="img-rounded" onClick={() => { this.setState({ visible: !this.state.visible }); } } alt="Users posts" />
                                    <Viewer
                                        visible={this.state.visible}
                                        onClose={() => { this.setState({visible: false }); } }
                                        images={image5}
                                    />
                                    <h5>{item.caption}</h5>
                                        </span>
                                        :null
                                    }
                                </Col>

                                    <Col md={3}>
                                    {item.image3!== undefined?
                                        <span>
                                    <img src={item.image3} id="userdataIMG" className="img-rounded" onClick={() => { this.setState({ visible: !this.state.visible }); } } alt="Users posts" />
                                    <Viewer
                                        visible={this.state.visible}
                                        onClose={() => { this.setState({visible: false }); } }
                                        images={image5}
                                    />
                                    <h5>{item.caption}</h5>
                                        </span>
                                        :null
                                    }
                                </Col>

                                    <Col md={3}>
                                    {item.image4!== undefined?
                                        <span>
                                    <img src={item.image4} id="userdataIMG" className="img-rounded" onClick={() => { this.setState({ visible: !this.state.visible }); } } alt="Users posts" />
                                    <Viewer
                                        visible={this.state.visible}
                                        onClose={() => { this.setState({visible: false }); } }
                                        images={image5}
                                    />
                                    <h5>{item.caption}</h5>
                                        </span>
                                        :null
                                    }
                                </Col>
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