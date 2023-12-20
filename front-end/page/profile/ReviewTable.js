import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal } from "antd";
import { Image } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { getBaseUrl } from "../../utils";

const ReviewTable = ({ userId }) => {
  const [matchingList, setMatchingList] = useState([]);
  const [open, setOpen] = useState(false);
  const [recordToReview, setRecordToReview] = useState(null);
  const baseURL = getBaseUrl();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/matching/${userId}`);
      setMatchingList(response.data);
    }
    fetchData();
  }, [userId]);

  const handleDeleteClick = (e, record) => {
    Swal.fire({
      title: "本当によろしいですか？",
      text: "一度キャンセルすると、このアクションは元に戻せません！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "はい",
      cancelButtonText: "いいえ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${baseURL}/api/matching/cancel-matching/${record.key}`
          );
          if (response.status === 200) {
            Swal.fire({
              title: "キャンセルが成功しました",
              text: "リクエストが正常にキャンセルされました。",
              icon: "success",
              confirmButtonText: "OK",
            }).then(async (result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        } catch (error) {
          console.error("Error canceling matching:", error);
        }
      }
    });
    e.stopPropagation();
  };

  const handleReviewClick = (e, record) => {
    setOpen(true);
    setRecordToReview(record);
    e.stopPropagation();
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
        <Space size="middle">
          {record.status === "保留中" && (
            <DeleteOutlined
              style={{ fontSize: "25px" }}
              onClick={(e) => handleDeleteClick(e, record)}
            />
          )}
          {record.status === "承認" && (
            <MessageOutlined
              style={{ fontSize: "25px" }}
              onClick={(e) => handleReviewClick(e, record)}
            />
          )}
        </Space>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, 
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const expandedRowRender = (record) => {
    const locationInfo = record.location.map((item) => (
      <div
        key={item.locationId}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          flexDirection: "column",
          maxWidth: "350px",
        }}
      >
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

  return (
    <>
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
      <ReviewModal
        open={open}
        setOpen={setOpen}
        recordToReview={recordToReview}
        setRecordToReview={setRecordToReview}
        userId={userId}
      />
    </>
  );
};

export default ReviewTable;
