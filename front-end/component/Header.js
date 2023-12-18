import React from "react";
import "./Header.css";
import { Dropdown } from "antd";
import { getBaseUrl } from "../utils";

const Header = () => {
  const baseUrl = getBaseUrl();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "";
  const items = [
    {
      key: "1",
      label: <a href={`${baseUrl}/profile`}>プロファイル</a>,
    },
    {
      key: "2",
      label: <a href={`${baseUrl}/home`} onClick={() => { localStorage.clear() }} >ログアウト</a>,
    },
  ];

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div className="site-header__start">
            <a href={`${baseUrl}/home`} className="brand" style={{textDecoration: "none"}}>
              ハノイシーン
            </a>
          </div>
          <div className="site-header__middle">
            <nav className="nav">
              <button className="nav__toggle" aria-expanded="false" type="button">
                menu
              </button>
              <ul className="nav__wrapper">
                <li className="nav__item">
                  <a href="#" style={{textDecoration: "none"}}>ツアーガイド</a>
                </li>
                <li className="nav__item">
                  <a href={`${baseUrl}/booking`} style={{textDecoration: "none"}}>予約</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="site-header__end">
          {
            role === ""
              ? <a href={`${baseUrl}/account`} style={{textDecoration: "none"}}>ログイン</a>
              : <Dropdown menu={{ items }} placement="bottom" arrow>
                  <a href="#" style={{textDecoration: "none"}}>{`${user.username}さんこんにちは！`}</a>
                </Dropdown>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
