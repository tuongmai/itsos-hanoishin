import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Row, Col, Card, Button, Input } from "antd";
import CommentCustom from "../../component/commentCustom";
import Header from "../../component/Header";
import axios from "axios";
import { getBaseUrl } from "../../utils";
const { Search } = Input;
const { Meta } = Card;

const Location = () => {
  const classes = useStyles();
  const baseUrl = getBaseUrl();
  const [location, setLocation] = useState({});

  const getData = async () => {
    const path = window.location.pathname;
    const locationId = path.split("/location/")[1];
    try {
      const res = await axios.get(`${baseUrl}/api/location/${locationId}`);
      console.log(res.data);
      setLocation(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Header />
      <div style={{ padding: "0px 15%" }}>
        <div className={classes.layout}>
          <div className={classes.urlHistory}>
            {location?.name}
          </div>
          <div style={{ marginTop: "30px" }}>
            <img
              src={location?.image}
              alt=""
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div style={{ marginTop: "20px" }}>
              {location?.description}
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <Row>
              <Col span={16}>
                <div className={classes.title}>この場所を案内してくれる人</div>
              </Col>
              <Col span={8}>
                <Search placeholder="ツアーガイドを検索" enterButton />
              </Col>
            </Row>
            <Row style={{ marginTop: "20px", justifyContent: "space-between" }}>
              {[1,2,3].map(() => (
                <Col span={7} className={classes.card}>
                  <Card
                    hoverable
                    style={{ margin: "auto" }}
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        style={{ width: "100%" }}
                      />
                    }
                  >
                    <Meta title="Europe Street beat" />
                    <Row style={{ marginTop: "10px" }} gutter={16}>
                      <Col span={8}>
                        <div className={classes.skillName}>JLPT N2</div>
                      </Col>
                      <Col span={8}>
                        <div className={classes.skillName}>会話</div>
                      </Col>
                      <Col span={8}>
                        <div className={classes.skillName}>TOEIC</div>
                      </Col>
                    </Row>
                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <Button type="primary" style={{ width: "100%" }}>
                        Primary Button
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <div style={{ marginTop: "30px", marginLeft: "25px" }}>
            <div className={classes.title}>レビュー</div>
            <div style={{ padding: "10px" }}>
              <CommentCustom />
              <CommentCustom />
              <CommentCustom />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<Location />, document.getElementById("location"));
