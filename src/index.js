import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './home.css';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import User from './UserProfile';
import EditProfile from './EditProfile';
import AdminPanel from './AdminPanel';
import UsersInfo from './UsersInfo';
import AdminLogin from './AdminLogin';
import Suggest from './suggestion';
import Forgot from './forgot';
import UserData from './UserData';
import Follow from './Follow';
import Follower from './Follower';
import PasswordReset from './passwordReset';
import UserSuggestion from './UserSuggestion';
// import Compress from './imageCompress'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import LocalStorage from "localstorage";
// import ip from "./env";
// import axios from "axios/index";
//
// import  fetchDefaults from "fetch-defaults"




// const foo = new LocalStorage('UserData');
// const abc = foo.get('UserData');
// if(abc[1]) {
//
//     const token = abc[1].tokenData.verification_token
//     setAuthToken(token);
// }
//
// function setAuthToken(token) {
//     axios.defaults.headers.common['Token'] = '';
//     delete axios.defaults.headers.common['Token'];
//
//     if (token) {
//         axios.defaults.headers.common['Token'] = `${token}`;
//     }
// }


const checkAuth=()=>{
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');

        if(abc[1]){
            // alert(abc[1].tokenData.verification_token )
            // axios.post(`${ip}/api/auth`, {
            //     token: abc[1].tokenData.verification_token,
            // })
            //     .then(function (response) {
            //         console.log(response);
            //         if (response.data.tokenData.verification_token === abc[1].tokenData.verification_token) {
            //             return true
            //         }
            //         else{
            //             return false
            //         }
            //     })
            //     .catch(error=>{
            //         console.log('not verified')
            //     })
                return true
        }
        return false
}

const AuthRoute= ({ component:Component , ...rest })=>(
    <Route {...rest} render={props=>(
        checkAuth()?(
            <Component {...props} />
        ):(
            <Redirect to={{pathname:'/'}} />
        )

    )} />
);






ReactDOM.render((
        <Router>
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/SignUp" component={SignUp}/>
                <AuthRoute exact path="/Home" component={Home}/>
                <AuthRoute exact path="/User_detail" component={User}/>
                <AuthRoute exact path="/Edit-profile" component={EditProfile} />
                <Route exact path="/admin" component={AdminLogin} />
                <Route exact path="/admin/Users/:id" component={UsersInfo} />
                <Route exact path="/admin/panel" component={AdminPanel} />
                <Route exact path="/auth/:token" component={Login}/>
                <AuthRoute exact path="/suggestion" component={Suggest}/>
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/passwordReset/:token" component={PasswordReset} />
                <AuthRoute exact path="/userData/:id" component={UserData} />
                <Route exact path="/adminPanel" component={AdminPanel} />
                <AuthRoute exact path="/UserSuggestion" component={UserSuggestion} />
                {/*<Route exact path="/compress" component={Compress}/>*/}
                <AuthRoute exact path="/Following" component={Follow}/>
                <AuthRoute exact path="/Follower" component={Follower}/>


            </div>
        </Router>
    ), document.getElementById('root'));
registerServiceWorker();
