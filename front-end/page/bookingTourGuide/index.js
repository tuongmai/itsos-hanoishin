import React from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Image, Row, Col, Card, Button, Input, DatePicker } from "antd";
import Header from "../../component/Header";
import CardLocation from "./CardLocation";
import CardTourGuide from "./CardTourGuide";

const { Search } = Input;
const BookingTourGuide = () => {
  const classes = useStyles();
  const { Meta } = Card;
  return (
    <>
      <Header />
      <div className={classes.layout}>
        <div className={classes.urlHistory}>ホーム／予約</div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div
            style={{
              width: "55%",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              場所
            </div>
            <div
              style={{
                borderRight: "solid 1px black",
                maxHeight: "55vh",
                overflowY: "scroll",
              }}
            >
              <CardLocation />
              <CardLocation />
              <CardLocation />
              <CardLocation />
            </div>
          </div>
          <div style={{ width: "45%"}}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              ツアーガイド
            </div>
            <div style={{ maxHeight: "55vh", overflowY: "scroll" }}>
              <CardTourGuide />
              <CardTourGuide />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            時間
          </div>
          <DatePicker placeholder="予約時間" style={{ width: "30%" }} />
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ width: "45%" }}>
              <Input placeholder="ツアーガイドへ送るメッセージ"/>
            </div>
            <div style={{ width: "45%", marginLeft: "10%" }}>
              <Button
                type="primary"
                danger
                style={{ width: "100%", fontWeight: "600" }}
              >
                予約
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(
  <BookingTourGuide />,
  document.getElementById("booking-tour-guide")
);
