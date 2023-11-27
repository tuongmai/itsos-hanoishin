import React from "react";
import ReactDOM from "react-dom";
import "./Header.css";
import { Dropdown } from "antd";

const Header = () => {
  const items = [
    {
      key: "1",
      label: <a>プロファイル</a>,
    },
    {
      key: "2",
      label: <a>ログアウト</a>,
    },
  ];
  return (
    <header class="site-header">
      <div class="wrapper site-header__wrapper">
        <div class="site-header__start">
          <a href="#" class="brand" style={{textDecoration: "none"}}>
            Brand
          </a>
        </div>
        <div class="site-header__middle">
          <nav class="nav">
            <button class="nav__toggle" aria-expanded="false" type="button">
              menu
            </button>
            <ul class="nav__wrapper">
              <li class="nav__item">
                <a href="#" style={{textDecoration: "none"}}>ツアーガイド</a>
              </li>
              <li class="nav__item">
                <a href="#" style={{textDecoration: "none"}}>予約</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="site-header__end">
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <a href="#" style={{textDecoration: "none"}}>Vinhさんこんにちは！</a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
