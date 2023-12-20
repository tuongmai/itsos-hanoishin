import React from "react";
import { Layout, Row, Image, Space, Tabs } from "antd";
import Header from "../../component/Header";
import useStyles from "./styles";
import ReviewTable from "./ReviewTable";
import ReviewHistory from './ReviewHistory'; 

const UserProfile = () => {
  const { Content, Sider } = Layout;
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const classes = useStyles();

  const items = [
    {
      key: "1",
      label: "予約履歴",
      children: <ReviewTable userId={user.userId} />,
    },
    {
      key: "0",
      label: "レビュー履歴",
      children: <ReviewHistory userId={user.userId} />,
    },
  ];

  return (
    <>
      <Header />
      <div className={classes.layout}>
        <div className={classes.urlHistory}>ホーム / プロファイル </div>
      </div>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0", background: "white" }}>
            <Sider
              style={{
                background: "white",
                display: "flex",
                flexDirection: "column",
              }}
              width={200}
            >
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}
              >
                <Row>
                  <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Row>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>ユーザー名</strong>
                    <div style={{ paddingLeft: "10px" }}>{user.username}</div>
                  </Row>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>メール</strong>
                    <div style={{ paddingLeft: "10px" }}>{user.email}</div>
                  </Row>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>電話番号</strong>
                    <div style={{ paddingLeft: "10px" }}>{user.phone || ""}</div>
                  </Row>
                </Space>
              </Space>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Tabs defaultActiveKey="1" items={items} />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default UserProfile;