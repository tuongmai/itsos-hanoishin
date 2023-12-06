import React, { useState } from "react";
import Header from "../../component/Header";
import useStyles from "./styles";
import { Layout } from "antd";
import { Row, Image, Space, Tabs, Table } from "antd";

const HistoryTable = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      date: 32,
      createAt: "New York No. 1 Lake Park",
      status: "Done",
    },
    {
      key: "2",
      name: "Jim Green",
      date: 42,
      createAt: "London No. 1 Lake Park",
      status: "Done",
    },
    {
      key: "3",
      name: "Joe Black",
      date: 32,
      createAt: "Sydney No. 1 Lake Park",
      status: "Done",
    },
  ];

  const columns = [
    {
      title: "ツアーガイド",
      dataIndex: "name",
      key: "ツアーガイド",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "予約の日",
      dataIndex: "date",
      key: "予約の日",
    },
    {
      title: "作成した時間",
      dataIndex: "createAt",
      key: "作成した時間",
    },
    {
      title: "渋滞",
      key: "渋滞",
      dataIndex: "status",
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record) => record.name,
      }}
      expandRowByClick
    />
  );
};

const UserProfile = () => {
  const { Content, Sider } = Layout;
  const classes = useStyles();

  const items = [
    {
      key: "1",
      label: "予約履歴",
      children: <HistoryTable />,
    },
    {
      key: "0",
      label: "レビュー履歴",
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
                    <div style={{ paddingLeft: "10px" }}>nghiemdinhminh</div>
                  </Row>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>メール</strong>
                    <div style={{ paddingLeft: "10px" }}>
                      nghiemdinhminh2002@gmail.com
                    </div>
                  </Row>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>電話番号</strong>
                    <div style={{ paddingLeft: "10px" }}>0936055632</div>
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
