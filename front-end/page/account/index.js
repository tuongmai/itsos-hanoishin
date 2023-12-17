import React from "react";
import { createRoot } from 'react-dom/client';
import AuthenticationForm  from './AuthenticationForm';
const Account = () => {
  return (
    <AuthenticationForm />
  )
}

const container = document.getElementById("register-login-page");
const root = createRoot(container);
root.render(<Account />);
