import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo1 from './images/logo1.png';
import './home.css';
import {Grid, Col, Form, Row, FormControl} from 'react-bootstrap';
// import ip from './env'

class Admin extends Component {

    render(){
        return(
            <header>
                <Grid>
                    <Row>
                        <Col md={3}>
                            <div id="left-heading">
                                <img id="logo1" src={logo1} alt="Hestagram Logo" />
                                <p id="logoText" >Hestagram</p>
                            </div>
                        </Col> {/* end of col-md-6 */}
                        <Col md={6}>
                            <Form>
                                <Col md={6} mdOffset={3} className="search-input">
                                    <FormControl type="text" id="search" name="search" placeholder="Search..."/>
                                </Col>
                            </Form>
                        </Col>

                        <Col md={3}>
                            <div className="header-icons">
                                <ul>
                                    <li>
                                        <Link to="#" onClick={this.Notif}  >
                                            <span  className="fa fa-gear"></span></Link>
                                    </li>
                                </ul>
                            </div>
                        </Col> {/* end of col-md-6 */}

                    </Row> {/* end of row */}
                </Grid>{/* end of container */}
            </header>
        );
    }
}
export default Admin