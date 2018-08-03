import React, {Component} from 'react';
import './admin.css';
import Admin from './AdminHeader';
import user from './images/user.png';
import axios from 'axios';
import { Grid, Row, Col, Button, Image, FormGroup} from 'react-bootstrap';
import ip from './env'

class UsersInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            uid:'',
            udata:'',
            image:[],
            fdata:[]
        }
    }
    componentWillMount(){
        const uid = this.props.match.params.id;
        this.setState({uid:uid})
    }
    componentDidMount(){
        const self=this;
        axios.post(`${ip}/api/ShowData`,{
            fid:self.state.uid
        })
            .then(function (response) {
                console.log(response.data);
                self.setState({udata:response.data})
            })
            .catch(error=>{
                console.log(error)
            });

        axios.get(`${ip}/api/ShowUserImage/` + self.state.uid)
            .then(function (response) {
                console.log("file response", response);
                self.setState({image:response.data.data})
            })
            .catch(error=>{
                console.log(error);
            });

        axios.post(`${ip}/api/AdminFollow`,{
            userid:self.state.uid
        })
            .then(function (response) {
                console.log("follow response", response);
                self.setState({fdata:response.data})
            })
            .catch(error=>{
                console.log(error);
            });
    }
    render(){
        return(
            <div>
                <Admin/>
                <div id="main-div">
                    <Grid>
                        <Row>
                            <Col md={4}>
                                <Image src={user} id="user_profile" circle alt="Profile pic" />
                            </Col>
                            <Col md={8}>
                                <div id="info">
                                    <ul>
                                        <li>{this.state.udata.username}</li>
                                        <li>{this.state.udata.Email}</li>
                                        <li>{this.state.udata.fullname}</li>
                                    </ul>
                                    <ul>
                                        <li>{this.state.image.length} posts</li>
                                        <li>{this.state.fdata.length} following</li>
                                    </ul>
                                    <Col md={4} mdOffset={1}>
                                        <FormGroup>
                                            <Button bsStyle="danger" block>Block Account</Button>
                                        </FormGroup>
                                    </Col>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <h3 id="post-heading">Users posts</h3>
                            {this.state.image.map((item, i)=>{


                            return <Col md={3}>
                                <div id="post-detail">
                                    <Image id="userImg" src={item.image} rounded responsive/>
                                    {/*<Link to="/delete" title="Delete"  id="delete-post">&times;</Link>*/}
                                </div>
                            </Col>
                            })}


                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}
export default UsersInfo