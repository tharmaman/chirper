import React, { Component } from "react";

class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state =  {
            email: "",
            username: "",
            password: "",
            profileImageURL: ""
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // use this function for both signup and signin
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                console.log("LOGGED IN SUCCESSFULLY");
            });
    };

        handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { email, username, password, profileImageURL } = this.state;
        const { heading, buttonText, signUp } = this.props;

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor="email">Email:</label>
                            <input
                                autoComplete="off" 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                name="email" 
                                onChange={this.handleChange} 
                                value={email}
                            />
                            <label htmlFor="password">Password:</label>
                            <input 
                                autoComplete="off"
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                onChange={this.handleChange} 
                                value={password}
                            />
                            {/* signUp passed in as prop at Main.js */}
                            {signUp && (
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    autoComplete="off" 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    name="username" 
                                    onChange={this.handleChange} 
                                    value={username}
                                />
                                {/* Refactor later to include image uploades with Cloudinary */}
                                <label htmlFor="image-url">Image URL</label>
                                <input 
                                    autoComplete="off"
                                    type="text" 
                                    className="form-control" 
                                    id="image-url"
                                    name="profileImageURL" 
                                    onChange={this.handleChange}
                                    value={profileImageURL}
                                /> 
                            </div>
                            )}
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg"
                            >
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthForm;