import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './home.css';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import User from './User_profile';
import EditProfile from './EditProfile';
import Admin_panel from './Admin_panel';
import UsersInfo from './UsersInfo';
import Admin_login from './Admin_login';
import Suggest from './suggestion';
import Forgot from './forgot';
import UserData from './UserData';
import PasswordReset from './passwordReset';
import UserSuggestion from './UserSuggestion';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';




ReactDOM.render((
        <Router>
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/User_detail" component={User}/>
                <Route exact path="/Edit-profile" component={EditProfile} />
                <Route exact path="/admin" component={Admin_login} />
                <Route exact path="/admin/Users/:id" component={UsersInfo} />
                <Route exact path="/admin/panel" component={Admin_panel} />
                <Route exact path="/auth/:token/:email" component={Login}/>
                <Route exact path="/suggestion" component={Suggest}/>
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/passwordReset/:user_email" component={PasswordReset} />
                <Route exact path="/userData/:id" component={UserData} />
                <Route exact path="/adminPanel" component={Admin_panel} />
                <Route exact path="/UserSuggestion" component={UserSuggestion} />


            </div>
        </Router>
    ), document.getElementById('root'));
registerServiceWorker();
