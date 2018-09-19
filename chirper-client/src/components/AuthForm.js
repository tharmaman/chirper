import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';

// for cloudinary api
require('dotenv').config();



class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state =  {
            email: "",
            username: "",
            password: "",
            profileImageURL: "",
            files: []
        };
    }

    /**
     * for uploading from dropzone to cloudinary
     */
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET); // Replace the preset name with your own
          formData.append("api_key", process.env.REACT_APP_API_KEY); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post("https://api.cloudinary.com/v1_1/tharmaman/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url // You should store this URL for future references in your app
            console.log(data);
            this.setState({
                profileImageURL: fileURL,
                files: files
            });
            // Once all the files are uploaded 
            axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
          });
          })
        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        // use this function for both signup and signin
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            })
    };

        handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { email, username, password } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;

        history.listen(() => {
            removeError();
        })

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            { errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
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
                                <div class="center-div">
                                    <br>
                                    </br>
                                        <Dropzone 
                                                onDrop={this.handleDrop.bind(this)} 
                                                multiple={false}
                                                activeClassName="active-dropzone"                                         
                                                accept="image/*" 
                                            >
                                            <p>Upload Your DP</p>
                                            <ul>
                                                {
                                                this.state.files.map(f => <li>{f.name} - {f.size} bytes</li>)
                                                }
                                            </ul>
                                        </Dropzone>
                                    <br>
                                    </br>
                                </div>
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