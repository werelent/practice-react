import React from "react";

function UserProfile({ user }) {
    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default UserProfile;