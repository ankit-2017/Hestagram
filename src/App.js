import React, { Component } from 'react';
import {Row, Col, Grid} from 'react-bootstrap';

import './App.css';




class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            signup:false,
            login:true

        };
        this.form_type = this.form_type.bind(this);

    };
    form_type() {
        let login = this.state.login;
        let sign = this.state.signup;

        return this.setState({login:!login, signup:!sign});

    };

  render() {
    return (
      <section id="main">
          <Grid>
              <Row>
                  <Col md={6}>
                       <img id="main-img" src={third} className="img-responsive" />
                  </Col>
                  <Col md={6}>
                      <Col md={8}>

                          {this.state.login?<Login  /> : null}
                          {this.state.signup?<SignUp /> : null}


                      </Col>
                  </Col>
              </Row> {/* end of row */}
          </Grid> {/* end of container */}
      </section>
    );
  }
}




export default App;
