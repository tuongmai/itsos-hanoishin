import React from "react";
import { createRoot } from 'react-dom/client';
import UserProfile  from './UserProfile';
const Profile = () => {
  return (
    <UserProfile />
  )
}

const container = document.getElementById("profile");
const root = createRoot(container);
root.render(<Profile />);