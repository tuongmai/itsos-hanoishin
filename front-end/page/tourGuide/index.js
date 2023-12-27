import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import useStyles from "./styles";
import { Image, Row, Col, Card, Button, Input } from "antd";
import CommentCustom from "../../component/commentCustom";
import Header from "../../component/Header";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const { Search } = Input;
const baseUrl = getBaseUrl();
const TourGuide = () => {
  const classes = useStyles();
  const [tourGuide, setTourGuide] = useState();
  const [location, setLocation] = useState();
  const [maxCard, setMaxCard] = useState(4);
  const { Meta } = Card;
  const getTourGuideById = async () => {
    const path = window.location.pathname;
    const tourGuideId = path.split("/tourGuide/")[1];
    try {
      const res = await axios.get(`${baseUrl}/api/tourGuide/${tourGuideId}`);
      console.log(res.data);
      setTourGuide(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTourGuideById();
  }, []);
  return (
    <>
      <Header />
      {tourGuide ? (
        <div className={classes.layout}>
          <div className={classes.urlHistory}>{tourGuide.username}</div>
          <div className={classes.image} style={{ marginTop: "30px" }}>
            <Image
              preview={false}
              width={"100%"}
              height={600}
              src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-viet-nam-14-819x1024.jpg?tr=dpr-2,w-675"
            />
          </div>
          <div style={{ marginTop: "30px", marginLeft: "25px" }}>
            <div className={classes.title}>スキル</div>
            <div style={{ marginTop: "20px" }}>
              <Row>
                {tourGuide.TourGuideSkills?.map((skill, index) => {
                  return (
                    <Col span={4} key={index}>
                      <div className={classes.skillName}>{skill.skill}</div>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div
              className={classes.skillDescription}
              style={{ marginTop: "20px" }}
            >
              {tourGuide.description}
            </div>
          </div>
          <div style={{ marginTop: "30px", marginLeft: "25px" }}>
            <Row>
              <Col span={16}>
                <div className={classes.title}>ガイドの場所</div>
              </Col>
              <Col span={8}>
                <Search placeholder="input search text" enterButton />
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", marginTop: "20px" }}>
              {tourGuide.TourGuideLocations.map((value, index) => {
                if (index < maxCard)
                  return (
                    <Col span={5} className={classes.card}>
                      <Card
                        hoverable
                        style={{ width: 240, margin: "auto" }}
                        cover={
                          <img
                            alt="example"
                            width={"100%"}
                            height={"200px"}
                            src={value.Location.image}
                          />
                        }
                      >
                        <Meta title={value.Location.name} />
                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                          <Button
                            type="primary"
                            style={{ width: "100%" }}
                            danger
                            href={`/location/${value.Location.locationId}`}
                          >
                            見る
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
              })}
            </Row>
            {maxCard < tourGuide.TourGuideLocations.length ? (
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
            <div className={classes.title}>ニャンゼット</div>
            <div style={{ padding: "10px" }}>
              <CommentCustom />
              <CommentCustom />
              <CommentCustom />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const container = document.getElementById("tour-guide");
const root = createRoot(container);
root.render(<TourGuide />);
