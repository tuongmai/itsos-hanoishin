import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import useStyles from "./styles";
import { Row, Col, Card, Button, Input, Tooltip } from "antd";
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
  const [tourGuide, setTourGuide] = useState([]);
  const [maxCard, setMaxCard] = useState(3);

  const getData = async () => {
    const path = window.location.pathname;
    const locationId = path.split("/location/")[1];
    try {
      const res = await axios.get(`${baseUrl}/api/location/${locationId}`);
      setLocation(res.data);
      const resTourGuide = await axios.get(
        `${baseUrl}/api/tourGuide/locationId/${locationId}`
      );
      console.log(resTourGuide.data);
      setTourGuide(resTourGuide.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "0px 15%" }}>
        <div className={classes.layout}>
          <div className={classes.urlHistory}>{location?.name}</div>
          <div style={{ marginTop: "30px" }}>
            <img src={location?.image} alt="" style={{ width: "100%" }} />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div style={{ marginTop: "20px" }}>{location?.description}</div>
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
              {tourGuide?.map((value, index) => {
                if (index < maxCard)
                  return (
                    <Col span={7} className={classes.card}>
                      <Card
                        hoverable
                        style={{ margin: "auto" }}
                        cover={
                          <img
                            alt="example"
                            src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-viet-nam-14-819x1024.jpg?tr=dpr-2,w-675"
                            style={{ width: "100%" }}
                          />
                        }
                      >
                        <Meta title={value.username} />
                        <Row style={{ marginTop: "10px" }} gutter={16}>
                          {value.TourGuideSkills?.map((skill, i) => {
                            if (i < 3)
                              return (
                                <Col span={8}>
                                  <Tooltip title={skill.skill}>
                                    <div className={classes.skillName}>
                                      {skill.skill}
                                    </div>
                                  </Tooltip>
                                </Col>
                              );
                          })}
                        </Row>
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <Button
                            type="primary"
                            style={{ width: "100%" }}
                            danger
                            href={`/tourGuide/${value.userId}`}
                          >
                            見る
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
              })}
            </Row>
            {maxCard < tourGuide.length ? (
              <Button
                type="primary"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  setMaxCard(maxCard + 3);
                }}
              >
                続きを見る
              </Button>
            ) : (
              <></>
            )}
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

const container = document.getElementById("location");
const root = createRoot(container);
root.render(<Location />);
