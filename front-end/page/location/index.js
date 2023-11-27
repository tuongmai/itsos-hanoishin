import React from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Image, Row, Col, Card, Button, Input } from "antd";
import CommentCustom from "../../component/commentCustom";
import Header from "../../component/Header";

const { Search } = Input;
const Location = () => {
  const classes = useStyles();
  const { Meta } = Card;
  return (
    <>
      <Header />
      <div className={classes.layout}>
        <div className={classes.urlHistory}>
          ホーム / ロケーション / ホアンキエム湖{" "}
        </div>
        <div className={classes.image} style={{ marginTop: "30px" }}>
          <Image
            preview={false}
            width={"90vw"}
            height={600}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <div
            className={classes.skillDescription}
            style={{ marginTop: "20px" }}
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed
            ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </div>
        </div>
        <div style={{ marginTop: "30px", marginLeft: "25px" }}>
          <Row>
            <Col span={16}>
              <div className={classes.title}>この場所を案内してくれる人</div>
            </Col>
            <Col span={8}>
              <Search placeholder="input search text" enterButton />
            </Col>
          </Row>
          <Row style={{ justifyContent: "center", marginTop: "20px" }}>
            <Col span={5} className={classes.card}>
              <Card
                hoverable
                style={{ width: 240, margin: "auto" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
            <Col span={5} className={classes.card}>
              <Card
                hoverable
                style={{ width: 240, margin: "auto" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
            <Col span={5} className={classes.card}>
              <Card
                hoverable
                style={{ width: 240, margin: "auto" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
            <Col span={5} className={classes.card}>
              <Card
                hoverable
                style={{ width: 240, margin: "auto" }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
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
    </>
  );
};

ReactDOM.render(<Location />, document.getElementById("location"));
