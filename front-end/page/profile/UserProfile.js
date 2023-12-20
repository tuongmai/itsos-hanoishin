import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import useStyles from "./styles";
import { Layout } from "antd";
import { Row, Image, Space, Tabs, Table } from "antd";
import axios from "axios";
import { getBaseUrl } from "../../utils";
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

const HistoryTable = () => {
  const Swal = require('sweetalert2')
  const baseURL = getBaseUrl();
  const userId = JSON.parse(localStorage.getItem('user')).userId;
  const [matchingList, setMatchingList] = useState([]);

  useEffect( () => {
    async function fetchData() {
      const response = await axios.get(`${baseURL}/api/matching/${userId}`);
      setMatchingList(response.data);
    }
    fetchData();
  }, [userId]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Set the maximum number of records per page
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: "ツアーガイド",
      dataIndex: "tourGuideUserName",
      key: "ツアーガイド",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "予約の日",
      dataIndex: "matchingDate",
      key: "予約の日",
    },
    {
      title: "作成した時間",
      dataIndex: "createdAt",
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
        <Space size="middle" >
          {record.status === "保留中" && (
          <DeleteOutlined style={{fontSize: '25px'}} onClick={(e) => handleDeleteClick(e, record)} />
          )}
          {record.status === "承認" && (
          <MessageOutlined style={{fontSize: '25px'}} onClick={(e) => handleReviewClick(e, record)} />
          )}
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    // Assuming the location information is present in the `locations` array
    const locationInfo = record.location.map((item) => (
      <div key={item.locationId} style={{ display: "flex", alignItems: "center", marginBottom: "10px", flexDirection: 'column', maxWidth: '350px' }}>
        <Image width={100} src={item.Location.image} />
        <div style={{ marginLeft: "10px" }}>{item.Location.name}</div>
      </div>
    ));

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {locationInfo}
      </div>
    );
  };

  const handleDeleteClick = (e, record) => {
    Swal.fire({
      title: '本当によろしいですか？',
      text: '一度キャンセルすると、このアクションは元に戻せません！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'はい',
      cancelButtonText: 'いいえ',
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`${baseURL}/api/matching/cancel-matching/${record.key}`);
          if (response.status === 200) {
            Swal.fire({
              title: "キャンセルが成功しました",
              text: "リクエストが正常にキャンセルされました。",
              icon: "success",
              confirmButtonText: "OK"
            }).then( async (result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.error('Error canceling matching:', error);
        }
      }
    });
    e.stopPropagation(); 
  };

  const handleReviewClick = (e, record) => {
    // Your review logic goes here
    e.stopPropagation(); 
  };

  return (
    <Table
      columns={columns}
      dataSource={[...matchingList]}
      pagination={pagination}
      onChange={handleTableChange}
      expandable={{
        expandedRowRender: expandedRowRender,
        rowExpandable: (record) => !!record.key,
      }}
      expandRowByClick
    />
  );
};

const UserProfile = () => {
  const { Content, Sider } = Layout;
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = localStorage.getItem("role") || "";
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
                    <div style={{ paddingLeft: "10px" }}>{user.username}</div>
                  </Row>
                  <Row style={{ display: "flex", flexDirection: "column" }}>
                    <strong>メール</strong>
                    <div style={{ paddingLeft: "10px" }}>
                      {user.email}
                    </div>
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
