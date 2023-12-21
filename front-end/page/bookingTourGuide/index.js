import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useStyles from "./styles";
import { Button, Input, DatePicker } from "antd";
import Header from "../../component/Header";
import CardLocation from "./CardLocation";
import CardTourGuide from "./CardTourGuide";
import { getBaseUrl } from "../../utils";
import Swal from 'sweetalert2';
import axios from "axios";

const BookingTourGuide = () => {
  const baseUrl = getBaseUrl();
  const classes = useStyles();
  const [locationList, setLocationList] = useState([]);
  const [tourGuideList, setTourGuideList] = useState([]);
  const [indexLocationClicked, setIndexLocationClicked] = useState();
  const [dateBooking, setDateBooking] = useState();

  const getDataLocation = async () => {
    const res = await axios.get(`${baseUrl}/api/location`);
    setLocationList(res.data);
  };

  const getTourGuideList = async () => {
    if (indexLocationClicked !== undefined) {
      const res = await axios.get(
        `${baseUrl}/api/tourGuide/locationId/${locationList[indexLocationClicked].locationId}`
      );
      const tourGuideCustom = res.data?.map((value) => {
        return {
          ...value,
          isChecked: false,
        };
      });
      setTourGuideList(tourGuideCustom);
    } else return;
  };

  const handleBooking = async () => {
    const japUser = JSON.parse(localStorage.getItem("user"));
    console.log(japUser);
    if (!japUser) {
      alert("Please login.");
      return;
    }
    if (dateBooking === undefined) {
      alert("Please select date.");
      return;
    }
    if (indexLocationClicked === undefined) {
      alert("Please select location.");
      return;
    }
    const tourGuideBooked = tourGuideList.filter(
      (tourGuide) => tourGuide.isChecked
    );
    if (tourGuideBooked.length === 0) {
      alert("Please select tour guide.");
      return;
    }
    try {
      await Promise.all(tourGuideBooked.map( async (tourGuide) => {
        const tourGuideId = tourGuide.userId;
        const matchingDate = dateBooking.toString();
        const japUserId = japUser.userId;
        const locationId = locationList[indexLocationClicked].locationId;
        await axios.post(`${baseUrl}/api/matching`, {japUserId, tourGuideId, matchingDate, locationId });
      }));
      Swal.fire({
        title: "無事に予約完了！",
        text: "無事に予約完了！",
        icon: "success"
      });
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        Swal.fire({
          title: "予約に失敗しました!",
          text: "同じ日に同じ人とマッチングすることはできません。",
          icon: "error"
        });
      }
    }
  };

  useEffect(() => {
    getDataLocation();
  }, []);

  useEffect(() => {
    getTourGuideList();
  }, [indexLocationClicked]);
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
              {locationList.map((value, index) => {
                return (
                  <CardLocation
                    key={index}
                    index={index}
                    location={value}
                    setIndex={setIndexLocationClicked}
                    isClicked={indexLocationClicked === index}
                  />
                );
              })}
            </div>
          </div>
          <div style={{ width: "45%" }}>
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
              {tourGuideList.map((value, index) => (
                <CardTourGuide
                  tourGuide={value}
                  key={`${indexLocationClicked}_${index}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            時間
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ width: "45%" }}>
              <DatePicker
                placeholder="予約時間"
                style={{ width: "100%" }}
                onChange={(value) => {
                  setDateBooking(value);
                }}
              />
            </div>
            <div style={{ width: "45%", marginLeft: "10%" }}>
              <Button
                type="primary"
                danger
                style={{ width: "100%", fontWeight: "600" }}
                onClick={handleBooking}
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

const container = document.getElementById("booking-tour-guide");
const root = createRoot(container);
root.render(<BookingTourGuide />);
