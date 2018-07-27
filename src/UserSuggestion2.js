import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Image, Button} from 'react-bootstrap';
import user from './user.png';
import axios from 'axios';
import LocalStorage from "localstorage";


class UserSuggestion2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            matchData:[]
        }
    }
    componentWillMount(){

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});


    }
    componentDidMount(){
        console.log('user city',this.state.userData.data2.city);
        const self=this;
        axios.post('http://localhost:4000/api/userSuggestion',{
            username:self.state.userData.data2.username,

        })
            .then(response=>{
                console.log(response);
                self.setState({matchData:response.data.data})
            })
            .catch(error=>{
                console.log(error);
            })
    }


    render() {
        const style={
            textAlign:'center',
            border:'1px solid #eaecef',
            borderRadius:'3px',
            padding:'20px',
            lineHeight:'12px'
        };
        return (
            <div>
                <div style={{marginTop:'30px'}}>
                    <Grid>
                        <Row>
                            <h3 style={{textAlign:'center'}} >Suggestion for you</h3>
                            {this.state.matchData.map((item,i)=>{
                                return <Col md={3}>
                                    <div id="sBox" style={style}>
                                        <Link to={'/userData/' + item._id} >
                                            <Image src={user} circle width="120" height="120" />
                                        </Link>
                                        <p><strong>{item.fullname}</strong></p>
                                        <p>{item.college}</p>
                                        <p>{item.city}</p>
                                        <Link to={'/userData/'+ item._id}>
                                            <Button bsStyle="primary" block >View Profile</Button>
                                        </Link>
                                    </div>
                                </Col>
                            })}


                        </Row>
                    </Grid>
                </div>
            </div>
        )

    }
}
export default UserSuggestion2