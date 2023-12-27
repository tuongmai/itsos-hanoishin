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
      label: (
        <a
          href={`${baseUrl}/home`}
          onClick={() => {
            localStorage.clear();
          }}
        >
          ログアウト
        </a>
      ),
    },
  ];

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="site-header__start">
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
          <div className="site-header__middle">
            <nav className="nav">
              <button
                className="nav__toggle"
                aria-expanded="false"
                type="button"
              >
                menu
              </button>
              <ul className="nav__wrapper">
                <li className="nav__item">
                  <a href={`#`} style={{ textDecoration: "none" }}>
                    ツアーガイド
                  </a>
                </li>

                {role === "ツアーガイド" ? (
                  <li className="nav__item">
                    <a
                      href={`${baseUrl}/request`}
                      style={{ textDecoration: "none" }}
                    >
                      リクエスト
                    </a>
                  </li>
                ) : (
                  <li className="nav__item">
                    <a
                      href={`${baseUrl}/booking`}
                      style={{ textDecoration: "none" }}
                    >
                      予約
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className="site-header__end">
          {role === "" ? (
            <a href={`${baseUrl}/account`} style={{ textDecoration: "none" }}>
              ログイン
            </a>
          ) : (
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <a
                href="#"
                style={{ textDecoration: "none" }}
              >{`${user.username}さんこんにちは！`}</a>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
