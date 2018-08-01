import React, {Component} from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import { Col, Grid, Row} from 'react-bootstrap';
import Header from './Header';
import EditProfilePage from './EditProfilePage';
import ChangePassword from './ChangePassword';
import LocalStorage from "localstorage";
class EditProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            edit:true,
            userData1:'',
            change_pass:false,
            bcolor:"#000000",
            paddingLeft:"10px",
            border:"3px solid #000000",
            borderStyle:"solid",
            forpass:{
                bcolor:"#777777",
                paddingLeft:0,
                border:0,
                borderStyle:"",
            }
        }
    }
    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData1:abc[1]});

        if(!abc[1]){
            window.location.href='/';
            return false

        }

    }


    EditPage=() =>{

      this.setState({edit:true, change_pass:false,
                bcolor:"#000000",
                paddingLeft:"10px",
                border:"3px solid #000000",
                borderStyle:"solid",
                forpass:{
                    bcolor:"#777777",
                    paddingLeft:0,
                    border:0,
                    borderStyle:"",
                }
      });
    };
    passwordPage=() =>{

        this.setState({change_pass:true, edit:false,
            bcolor:"#777777",
            paddingLeft:0,
            border:0,
            forpass:{
                bcolor:"#000000",
                paddingLeft:"10px",
                border:"3px solid #000000",
                borderStyle:"solid",
            }

        });
    };

    render(){
        const style ={
            borderLeft:this.state.border,
            paddingLeft:this.state.paddingLeft,
            color:this.state.bcolor
        };
        const style2 ={

                borderLeft: this.state.forpass.border,
                paddingLeft: this.state.forpass.paddingLeft,
                color: this.state.forpass.bcolor

        };
        return (
            <div>
                <Header />
                <Grid id="main-grid">
                    <Row className="show-grid">
                        <Col md={4}>
                            <div className="sidebar">
                                <ul>
                                     <li onClick={this.EditPage} ref="edit"  ><Link to="#" style={style}>Edit Profile</Link></li>
                                     <li onClick={this.passwordPage} ref="pas" ><Link to="#" style={style2} >Change password</Link></li>

                                </ul>
                            </div>
                        </Col>
                        <Col md={8}>

                            { this.state.edit?<EditProfilePage />: null}
                            { this.state.change_pass? <ChangePassword />: null }
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}


export default EditProfile