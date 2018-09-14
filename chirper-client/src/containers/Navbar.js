import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
    rennder() {
        return (
            <nav className="navbar navbar-expand">
                <div>
                    <Link to="/" className="navbar-brand">
                        <img src="" alt="Chirper Home" />
                    </Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Log In</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, null)(Navbar);