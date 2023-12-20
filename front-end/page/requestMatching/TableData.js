import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Avatar,
  Image,
  Row,
  Col,
} from "antd";
import { DeleteFilled, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { getBaseUrl } from "../../utils";
import Swal from "sweetalert2";
import Dayjs from "dayjs";

const baseUrl = getBaseUrl();

const TableData = () => {
  const [listMatching, setListMatching] = useState([]);
  const [isAction, setIsAction] = useState(false);
  const tourGuideId = JSON.parse(localStorage.getItem("user")).userId;
  const getDataMatching = async () => {
    const response = await axios.get(
      `${baseUrl}/api/matching/tg/${tourGuideId}`
    );
    const data = response.data;
    const dataFilter = response.data.filter(
      (value) => value.status === "保留中"
    );
    const matchingCustom = dataFilter.map((value) => {
      return {
        key: value.matchingId,
        avatar:
          value.japUser.avatar ||
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        name: value.japUser.username,
        phone: value.japUser.phone,
        date: Dayjs(value.matchingDate).format("YYYY/MM/DD"),
        createdAt: Dayjs(value.createdAt).format("HH:MM:ss YYYY/MM/DD"),
        location: value.Locations,
      };
    });
    setListMatching(matchingCustom);
  };

  const handleDeleteMatching = async (matchingId) => {
    Swal.fire({
      text: "この予定をキャンセルしてもよろしいですか?",
      showDenyButton: true,
      confirmButtonText: "はい",
      cancelButtonText: `いいえ`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsAction(false);
        try {
          await axios.put(
            `${baseUrl}/api/matching/cancel-matching/${matchingId}`
          );
          Swal.fire({
            title: "予約が正常にキャンセルされました!",
            text: "予約が正常にキャンセルされました",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "予約のキャンセルに失敗しました!",
            text: "予約のキャンセルに失敗しました",
            icon: "error",
          });
        }
        setIsAction(true);
      }
    });
  };
  const handleAgreeMatching = async (matchingId) => {
    Swal.fire({
      text: "あなたはこの約束に同意します?",
      showDenyButton: true,
      confirmButtonText: "はい",
      cancelButtonText: `いいえ`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsAction(false)
          await axios.put(
            `${baseUrl}/api/matching/cancel-matching/${matchingId}`
          );
          Swal.fire({
            title: "予約が作成されました!",
            text: "予約が作成されました",
            icon: "success",
          });
        } catch (error) {
          Swal.fire({
            title: "失敗することに同意する!",
            text: "失敗することに同意する",
            icon: "error",
          });
        }
        setIsAction(true)
      }
    });
  };
  const expandedRowRender = (record) => {
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {record.location?.map((location, index) => (
          <Col
            key={index}
            className="gutter-row"
            span={6}
            style={{ textAlign: "center" }}
          >
            <Image src={location.image} />
            <div>{location.name}</div>
          </Col>
        ))}
      </Row>
    );
  };
  const columns = [
    {
      title: "予約者",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <Avatar src={<Image src={record.avatar} alt="avatar" />} />
      ),
    },
    {
      title: "名前",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "接触",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "予約日",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "で作成されました",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "行動",
      key: "operation",
      render: (_, record) => (
        <Space size="middle">
          <CheckOutlined style={{ cursor: "pointer" }} onClick={() => handleAgreeMatching(record.key)}/>
          <div onClick={() => handleDeleteMatching(record.key)}>
            <DeleteFilled style={{ cursor: "pointer" }} />
          </div>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getDataMatching();
  }, [isAction]);
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        pagination={{ pageSize: 5 }}
        dataSource={listMatching}
        size="middle"
      />
    </>
  );
};
export default TableData;
