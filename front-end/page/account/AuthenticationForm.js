import React, { useState } from "react";
import "./AuthenticationForm.css";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../component/Header";
import { getBaseUrl } from "../../utils";

const baseUrl = getBaseUrl();

const LoginComponent = ({ setIsLoginScreen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegisterClick = (event) => {
    event.preventDefault();
    setIsLoginScreen(false);
  };
  const handleLoginClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/account/login`, {
        username: username,
        password: password,
      });
      console.log("Login API Response:", response.data.status);
      if (response.data.status === "Login successfully!") {
        Swal.fire({
          title: "Sign in Successfully!",
          text: "Sign in Successfully!",
          confirmButtonText: "はい。",
          icon: "success",
        });
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
        window.location.href = `${baseUrl}/home`;
      }
    } catch (error) {
      console.error("Error during login API call:", error);
    }
  };
  return (
    <>
      <div className="app-logo">
        <a
          href={`${baseUrl}/home`}
          className="brand"
          style={{ textDecoration: "none" }}
        >
          <img
            width={50}
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/409496832_776054761023446_7206138461818381495_n.png?_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=HDUhzjWgkzQAX8sCqJf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQmcvuzXXrbHxaHyYIQOrX57PIqtLScxD5wx7VirHH09w&oe=65B3615C"
          />
        </a>
      </div>
      <div className="container" id="container">
        <div className="form-container log-in-container">
          <form action="#">
            <input
              type="text"
              placeholder="ユーザー名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="loginForm">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">アカウントを記録する</label>
              </div>
              <button onClick={handleLoginClick}>ログイン</button>
            </div>
            <span>
              まだアカウントを持ちでない場合は
              <a className="register-link" onClick={handleRegisterClick}>
                登録
              </a>
            </span>
            <p>━━━━━━━ 他の方 ━━━━━━━</p>
            <div className="social-container">
              <button style={{ marginBottom: "10px" }}>
                フェイスブックでログイン
              </button>
              <button>グーグレでログイン</button>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const RegisterComponent = ({ setIsLoginScreen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const baseUrl = getBaseUrl();

  const handleLoginClick = (event) => {
    event.preventDefault();
    setIsLoginScreen(true);
  };
  const handleRegisterClick = async (event) => {
    event.preventDefault();
    if (accountType === "") {
      alert("Please select an account type.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password must match. ");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/account/register`, {
        email: email,
        username: username,
        password: password,
        role: accountType,
      });
      if (response.statusText === "Created") {
        Swal.fire({
          title: "Sign up Successfully!",
          text: "Sign up Successfully!",
          icon: "success",
          confirmButtonText: "はい。",
        });
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
        window.location.href = `${baseUrl}/home`;
      }
    } catch (error) {
      console.error("Error during login API call:", error);
    }
  };
  return (
    <>
      <div className="app-logo">
        <a
          href={`${baseUrl}/home`}
          className="brand"
          style={{ textDecoration: "none" }}
        >
          <img
            width={50}
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/409496832_776054761023446_7206138461818381495_n.png?_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=HDUhzjWgkzQAX8sCqJf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQmcvuzXXrbHxaHyYIQOrX57PIqtLScxD5wx7VirHH09w&oe=65B3615C"
          />
        </a>
      </div>
      <div className="container" id="container">
        <div className="form-container register-container">
          <form action="#">
            <input
              type="text"
              placeholder="ユーザー名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="メール"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="パスワードを入力する"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="もう一度パスワードを入力する"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="ツアーガイド"
                  checked={accountType === "ツアーガイド"}
                  onChange={() => setAccountType("ツアーガイド")}
                />{" "}
                ツアーガイド
              </label>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="日本人"
                  checked={accountType === "日本人"}
                  onChange={() => setAccountType("日本人")}
                />{" "}
                日本人
              </label>
            </div>
            <button onClick={handleRegisterClick}>登録</button>
            <span>
              すでにアカウントを持っています{" "}
              <a onClick={handleLoginClick} className="login-link">
                ログイン
              </a>
            </span>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const AuthenticationForm = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  return (
    <div>
      {isLoginScreen ? (
        <LoginComponent setIsLoginScreen={setIsLoginScreen} />
      ) : (
        <RegisterComponent setIsLoginScreen={setIsLoginScreen} />
      )}
    </div>
  );
};

export default AuthenticationForm;
