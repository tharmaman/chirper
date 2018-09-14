import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";

const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route exact Path="/" render={props => <Homepage {...props} />} />
            </Switch>
        </div>
    );
}

// accept state and return an object
// keys placed here will be placed onto props
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

// get props from router to component
// use history object to redirect
export default withRouter(connect(mapStateToProps, null)(Main));
