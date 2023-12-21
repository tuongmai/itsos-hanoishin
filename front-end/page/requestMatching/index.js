import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import useStyles from "./styles";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import axios from "axios";
import TableData from "./TableData";
import { getBaseUrl } from "../../utils";
import { Input } from "antd";

const RequestMatching = () => {
  const classes = useStyles();
  const baseUrl = getBaseUrl();

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar index={1} />
        <div style={{ width: "80%" }}>
          <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
            <div style={{ fontSize: "20px", marginTop: "20px" }}>予約管理</div>
            <Input.Search
              placeholder="検索"
              onSearch={() => {}}
              style={{ width: 200 }}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TableData />
          </div>
        </div>
      </div>
    </>
  );
};

const container = document.getElementById("request-matching");
const root = createRoot(container);
root.render(<RequestMatching />);
