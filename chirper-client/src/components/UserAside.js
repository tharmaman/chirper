import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const userAside = ({ profileImageURL, username }) => (
    <aside className="col-sm-2">
        <div className="panel panel-default">
            <div className="panel-body">
                <img 
                    src={profileImageURL || DefaultProfileImg} 
                    alt={username}
                    width="200"
                    height="200"
                    className="img-thumbnail" 
                />
                <h5>
                    @{username}
                </h5>
            </div>
        </div>
    </aside>
);

export default userAside;
