import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './admin.css';
import user from './images/user.png';
import Admin from './AdminHeader';
import axios from 'axios';
import Timestamp from 'react-timestamp';
import { Grid, Row, Col, Table, Image, Badge} from 'react-bootstrap';
import ip from './env'

class AdminPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            adminData:[]
        }
    }
    componentDidMount(){
        const self = this;
        axios.post(`${ip}/api/userDataAdmin`)
            .then(function (response) {
                console.log(response);
                self.setState({adminData:response.data})
            })
            .catch(error=>{
                console.log(error);
            })
    }
    UserDetail=(event)=>{
        let key = event.target;
        console.log("key value",key);
      // this.props.history.push('/admin/Users')
    };
    render(){
        console.log("admin data",this.state.adminData);
        return(
            <div>
                <Admin />
                <Grid>
                    <Row>
                        <Col md={3}>
                            <div id="admin-sidebar">
                                <ul>
                                    <li><Link to="/adminPanel">Dashboard</Link></li>
                                    <li><Link to="#">Total users <Badge>{this.state.adminData.length}</Badge> </Link></li>
                                    {/*<li><Link to="#">Blocked Users <Badge>12</Badge> </Link></li>*/}
                                    {/*<li><Link to="#">Deleted Posts <Badge>20</Badge> </Link></li>*/}
                                    {/*<li><Link to="#">Profile</Link></li>*/}
                                    {/*<li><Link to="#">Change password</Link></li>*/}
                                </ul>
                            </div>
                        </Col>

                        <Col md={9}>
                            <div id="admin-table">
                                <Table responsive striped>
                                    <thead>
                                    <tr>
                                        <th>Profile pic</th>
                                        <th>Username</th>
                                        <th>Email id</th>

                                        <th>Joining date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.adminData.map((item, i)=>{


                                       return <tr onClick={this.UserDetail} >

                                            <td >
                                               <Image src={user} responsive circle id="admin-pic" />
                                            </td>

                                            <td>

                                                <strong><Link to={"/admin/Users/"+item._id}>{item.username}</Link></strong>
                                            </td>
                                            <td>
                                                {item.Email}
                                            </td>

                                            <td>

                                                <span><Timestamp time={item.time1} format='date' /></span>
                                            </td>

                                        </tr>;



                                    })}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default AdminPanel