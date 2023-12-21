import React from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { useState } from "react";
import { Col, Row, Image } from "antd";

const CardLocation = ({index, isClicked, location, setIndex}) => {
  const classes = useStyles();
  const { name, description, image } = location;
  const onClickLayout = () => {
    setIndex(index);
  }
  return (
    <>
      <div className={classes.layoutCard} style={isClicked ? {boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"} : {}} onClick={onClickLayout}>
        <div>
          <Image
            src={image}
            width={200}
            height={"100%"}
          />
        </div>
        <div style={{margin: "20px"}}>
          <div className={classes.titleCard}>{name}</div>
          <div style={{overflowWrap:"anywhere"}}>
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLocation;
