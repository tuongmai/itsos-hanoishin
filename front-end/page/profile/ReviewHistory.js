import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { getBaseUrl } from "../../utils";
import EditForm from "./EditForm";

const ReviewHistory = ({ userId }) => {
  const [data, setData] = useState({
    tourGuideReviews: [],
    locationReviews: [],
  });
  const [rating, setRating] = useState(0);
  const [editFormData, setEditFormData] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const baseURL = getBaseUrl();
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };
  const showDeleteConfirm = (record) => {
    Swal.fire({
      title: "このレビューを削除してもよろしいですか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "はい、削除します。",
      cancelButtonText: "いいえ。",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(record);
      }
    });
  };

  const showEditForm = (record) => {
    setEditFormData(record);
    setEditFormVisible(true);
  };

  const handleDelete = async (record) => {
    if (record.tour_guide_id !== undefined) {
      await axios
        .delete(`${baseURL}/api/review/tour-guide/${record.reviewId}`)
        .then((response) => {
          if (response.status === 204) {
            const newData = data.tourGuideReviews.filter(
              (item) => item.reviewId !== record.reviewId
            );
            setData((prevData) => ({
              ...prevData,
              tourGuideReviews: newData,
            }));
            Swal.fire({
              icon: "success",
              title: "削除完了",
              text: "レビューが削除されました。",
              confirmButtonText: "はい。",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    } else {
      await axios
        .delete(`${baseURL}/api/review/location/${record.reviewId}`)
        .then((response) => {
          if (response.status === 204) {
            const newData = data.locationReviews.filter(
              (item) => item.reviewId !== record.reviewId
            );
            setData((prevData) => ({
              ...prevData,
              locationReviews: newData,
            }));
            Swal.fire({
              icon: "success",
              title: "削除完了",
              text: "レビューが削除されました。",
              confirmButtonText: "はい。",
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    }
  };

  const handleEdit = async (record) => {
    if (record?.tour_guide_id !== undefined) {
      await axios
        .put(
          `${baseURL}/api/review/tour-guide/${record?.reviewId}`,
          editFormData
        )
        .then((response) => {
          setData((prevData) => ({
            ...prevData,
            tourGuideReviews: prevData.tourGuideReviews.map((item) =>
              item.reviewId === record.reviewId ? editFormData : item
            ),
          }));
          setEditFormVisible(false);
          Swal.fire({
            icon: "success",
            title: "更新完了",
            text: "レビューが更新されました。",
            confirmButtonText: "はい。",
          });
        })
        .catch((error) => {
          console.error("Error updating review:", error);
          Swal.fire({
            icon: "error",
            title: "更新エラー",
            text: "レビューの更新中にエラーが発生しました。",
            confirmButtonText: "はい。",
          });
        });
    } else {
      await axios
        .put(
          `${baseURL}/api/review/location/${editFormData.reviewId}`,
          editFormData
        )
        .then((response) => {
          setData((prevData) => ({
            ...prevData,
            locationReviews: prevData.locationReviews.map((item) =>
              item.reviewId === record.reviewId ? editFormData : item
            ),
          }));
          setEditFormVisible(false);
          Swal.fire({
            icon: "success",
            title: "更新完了",
            text: "レビューが更新されました。",
            confirmButtonText: "はい。",
          });
        })
        .catch((error) => {
          console.error("Error updating review:", error);
          Swal.fire({
            icon: "error",
            title: "更新エラー",
            text: "レビューの更新中にエラーが発生しました。",
            confirmButtonText: "はい。",
          });
        });
    }
  };

  const locationColumns = [
    {
      title: "場所",
      dataIndex: "location.name",
      key: "location.name",
      render: (text, record) => record.location?.name, // Access safely with optional chaining
    },
    {
      title: "コメント",
      dataIndex: "content",
      key: "content",
      width: "30%",
    },
    {
      title: "投票",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "作成した時間",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => formatDate(text), // Format the date
    },
    {
      title: "交換した時間",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text, record) => formatDate(text), // Format the date
    },
    {
      title: "アクション",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: "20px" }}
            onClick={() => showEditForm(record)}
          />
          <DeleteOutlined
            style={{ fontSize: "20px" }}
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  const tourGuideColumns = [
    {
      title: "ツアーガイド",
      dataIndex: "tourGuide.username",
      key: "tourGuide.username",
      render: (text, record) => record.tourGuide?.username, // Access safely with optional chaining
    },
    ...locationColumns.slice(1),
  ];

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`${baseURL}/api/review/history/${userId}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching review data:", error);
        });
    }
    fetchData();
  }, [userId]);
  return (
    <div>
      <Table
        dataSource={[...data.tourGuideReviews]}
        columns={tourGuideColumns}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Table
        dataSource={[...data.locationReviews]}
        columns={locationColumns}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="レビュー変更"
        visible={editFormVisible}
        onCancel={() => setEditFormVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditFormVisible(false)}>
            キャンセル
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => handleEdit(editFormData)}
          >
            保存
          </Button>,
        ]}
      >
        <EditForm record={editFormData} setEditFormData={setEditFormData} />
      </Modal>
    </div>
  );
};

export default ReviewHistory;
