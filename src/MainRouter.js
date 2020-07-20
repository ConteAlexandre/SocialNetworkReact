import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./core/Home";
import Signup from "./Users/Signup";
import Signin from "./Users/Signin";
import Menu from "./core/Menu";
import Profile from "./Users/Profile";
import Users from "./Users/Users";
import EditProfile from "./Users/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./Users/FindPeople";
import NewPost from "./Posts/NewPost";
import SinglePost from "./Posts/SinglePost";
import EditPost from "./Posts/EditPost";
import ForgotPassword from "./Users/ForgotPassword";
import ResetPassword from "./Users/ResetPassword";


class MainRouter extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path={'/signup/'} component={Signup}/>
                    <Route exact path={'/signin/'} component={Signin}/>
                    <Route exact path={'/forgot-password/'} component={ForgotPassword}/>
                    <Route exact path={'/reset-password/:resetPasswordToken'} component={ResetPassword}/>
                    <Route exact path={'/users'} component={Users}/>
                    <Route exact path={'/posts/:_id'} component={SinglePost}/>
                    <PrivateRoute exact path={"/user/edit/:_id"} component={EditProfile}/>
                    <PrivateRoute exact path={'/profile/:_id/'} component={Profile}/>
                    <PrivateRoute exact path={'/findpeople'} component={FindPeople}/>
                    <PrivateRoute exact path={'/post/create'} component={NewPost}/>
                    <PrivateRoute exact path={'/post/edit/:_id'} component={EditPost}/>
                </Switch>
            </div>
        );
    }
}

export default MainRouter;