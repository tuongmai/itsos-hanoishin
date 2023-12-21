import React from "react";
import { getBaseUrl } from "../utils";
import { Layout, Menu, theme } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Content, Sider } = Layout;

const Sidebar = ({index}) => {
  const baseUrl = getBaseUrl();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: `ダッシュボード`,
      label: `ダッシュボード`,
    },
    {
      key: `予約管理`,
      label: `予約管理`,
    },
    {
      key: `位置管理`,
      label: `位置管理`,
    },
  ];
  return (
    <Sider
      style={{
        background: colorBgContainer,
        padding: "20px 0px",
        border: "solid 1px black",
        borderRadius: "5px",
        margin: "20px",
        height: "80vh"

      }}
      width={200}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[items[index].key]}
        style={{ height: "100%" }}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
