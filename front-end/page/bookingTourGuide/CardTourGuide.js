import React from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Col, Row } from "antd";

const CardTourGuide = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.layoutCard}>
        <div>
          <input
            type="checkbox"
            style={{
              position: "absolute",
              top: "3px",
              left: "2px",
              transform: "scale(2)",
            }}
          />
        </div>
        <div>
          <img
            src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-viet-nam-14-819x1024.jpg?tr=dpr-2,w-675"
            width={"200px"}
          />
        </div>
        <div style={{ margin: "20px" }}>
          <div className={classes.titleCard}>Anh vinh</div>
          <div>
            <div style={{ display: "flex" }}>
              <div>
                <div className={classes.skillName}>JLPT N2</div>
              </div>
              <div>
                <div className={classes.skillName}>会話</div>
              </div>
              <div>
                <div className={classes.skillName}>TOEIC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTourGuide;
