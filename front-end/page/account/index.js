import React from "react";
import ReactDOM from "react-dom";
import AuthenticationForm  from './AuthenticationForm';
const Account = () => {
  return (
    <AuthenticationForm />
  )
}

ReactDOM.render(<Account />, document.getElementById("register-login-page"));
