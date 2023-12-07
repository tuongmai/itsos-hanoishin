import React from "react";
import ReactDOM from "react-dom";
import UserProfile  from './UserProfile';
const Profile = () => {
  return (
    <UserProfile />
  )
}

ReactDOM.render(<Profile />, document.getElementById("profile"));