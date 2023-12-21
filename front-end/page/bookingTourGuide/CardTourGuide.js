import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Col, Row, Image } from "antd";
import { useState } from "react";

const CardTourGuide = ({ tourGuide }) => {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(tourGuide.isChecked);

  const { username, TourGuideSkills } = tourGuide;
  const handleChecked = () => {
    tourGuide.isChecked = !tourGuide.isChecked;
    setIsChecked(tourGuide.isChecked)
  }

  useEffect(() =>{
    setIsChecked(tourGuide.isChecked)
  }, [ tourGuide ])
  return (
    <>
      <div
        className={classes.layoutCard}
        onClick={handleChecked}
      >
        <div>
          <input
            onChange={()=>{}}
            type="checkbox"
            checked={isChecked}
            style={{
              position: "absolute",
              top: "3px",
              left: "2px",
              transform: "scale(2)",
              zIndex: "1",
            }}
          />
        </div>
        <div>
          <Image
            src="https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-viet-nam-14-819x1024.jpg?tr=dpr-2,w-675"
            width={200}
            height={"100%"}
          />
        </div>
        <div style={{ margin: "20px" }}>
          <div className={classes.titleCard}>{username}</div>
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {TourGuideSkills.map((value, index) => (
                <div style={{ marginBottom: "10px"}} key={index}>
                  <div className={classes.skillName}>
                    {value.skill}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTourGuide;
