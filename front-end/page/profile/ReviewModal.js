import React, { useState } from "react";
import { Modal, Button } from "antd";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const ReviewModal = ({
  open,
  setOpen,
  recordToReview,
  setRecordToReview,
  userId,
}) => {
  const baseURL = getBaseUrl();
  const [locationComment, setLocationComment] = useState("");
  const [tourGuideComment, setTourGuideComment] = useState("");
  const [locationRating, setLocationRating] = useState({
    currentValue: 0,
    hoverValue: undefined,
  });
  const [tourGuideRating, setTourGuideRating] = useState({
    currentValue: 0,
    hoverValue: undefined,
  });
  const starsLocation = Array(5).fill(0);
  const starsTourGuide = Array(5).fill(0);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const getLocationNames = (reviewRecord) => {
    const locationNames = reviewRecord?.location.map(
      (item) => item.Location.name
    );
    return locationNames?.join(", ");
  };

  const handleClickLocation = (value) => {
    setLocationRating({
      ...locationRating,
      currentValue: value,
    });
  };

  const handleMouseOverLocation = (newHoverValue) => {
    setLocationRating({
      ...locationRating,
      hoverValue: newHoverValue,
    });
  };

  const handleMouseLeaveLocation = () => {
    setLocationRating({
      ...locationRating,
      hoverValue: undefined,
    });
  };

  const handleClickTourGuide = (value) => {
    setTourGuideRating({
      ...tourGuideRating,
      currentValue: value,
    });
  };

  const handleMouseOverTourGuide = (newHoverValue) => {
    setTourGuideRating({
      ...tourGuideRating,
      hoverValue: newHoverValue,
    });
  };

  const handleMouseLeaveTourGuide = () => {
    setTourGuideRating({
      ...tourGuideRating,
      hoverValue: undefined,
    });
  };

  const handleTourGuideReviewSubmit = async () => {
    try {
      console.log(userId);
      // Make an API call to save the tour guide review
      const response = await axios.post(`${baseURL}/api/review/tour-guide`, {
        tourGuideId: recordToReview?.tourGuide.userId,
        japUserId: userId,
        content: tourGuideComment,
        rating: tourGuideRating.currentValue,
      });
      if (response.status === 201) {
        Swal.fire({
          title: "ツアーガイドのレビューが送信されました",
          text: "ツアーガイドのレビューが正常に送信されました。",
          icon: "success",
          confirmButtonText: "はい",
        });
        setTourGuideRating({
          ...tourGuideRating,
          currentValue: 0,
        });
        setTourGuideComment("")
        // Close the modal or take any other necessary action
      }
    } catch (error) {
      console.error("Error submitting tour guide review:", error);
      Swal.fire({
        title: "エラー",
        text: "ツアーガイドのレビューを送信する際にエラーが発生しました。",
        icon: "error",
        confirmButtonText: "はい。",
      });
    }
  };

  const handleLocationReviewSubmit = async () => {
    try {
      // Make an API call to save the location review
      const response = await axios.post(`${baseURL}/api/review/location`, {
        locationId: recordToReview?.location[0].Location.locationId,
        japUserId: userId,
        content: locationComment,
        rating: locationRating.currentValue,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "ロケーションのレビューが送信されました",
          text: "あなたのロケーションのレビューが正常に送信されました。",
          icon: "success",
          confirmButtonText: "はい。",
        });
        setLocationRating({
          ...locationRating,
          currentValue: 0,
        });
        setLocationComment("");
      }
    } catch (error) {
      console.error("Error submitting location review:", error);
      Swal.fire({
        title: "エラー",
        text: "ロケーションのレビューの送信中にエラーが発生しました。",
        icon: "error",
        confirmButtonText: "はい。",
      });
    }
  };

  return (
    <Modal title="レビュー" visible={open} onCancel={() => setOpen(false)} footer={null}>
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
        <h3>
          コメント: <strong>{getLocationNames(recordToReview)}</strong>
        </h3>
        <div style={{ display: "flex", padding: "5px", justifyContent: "space-between" }}>
          <textarea
            style={{ marginRight: "10px", flex: 1 }}
            placeholder="あなたの経験は何ですか？"
            value={locationComment}
            onChange={(e) => setLocationComment(e.target.value)}
          />
          <Button style={{ height: "36px" }} onClick={handleLocationReviewSubmit}>
            送る
          </Button>
        </div>
        <div>
          {starsLocation.map((_, index) => (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClickLocation(index + 1)}
              onMouseOver={() => handleMouseOverLocation(index + 1)}
              onMouseLeave={handleMouseLeaveLocation}
              color={
                (locationRating.hoverValue || locationRating.currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Tour Guide Review */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>
          コメント: <strong>{recordToReview?.tourGuideUserName}</strong>
        </h3>
        <div style={{ display: "flex", padding: "5px", justifyContent: "space-between" }}>
          <textarea
            style={{ marginRight: "10px", flex: 1 }}
            placeholder="あなたの経験は何ですか？"
            value={tourGuideComment}
            onChange={(e) => setTourGuideComment(e.target.value)}
          />
          <Button style={{ height: "36px" }} onClick={handleTourGuideReviewSubmit}>
            送る
          </Button>
        </div>
        <div>
          {starsTourGuide.map((_, index) => (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClickTourGuide(index + 1)}
              onMouseOver={() => handleMouseOverTourGuide(index + 1)}
              onMouseLeave={handleMouseLeaveTourGuide}
              color={
                (tourGuideRating.hoverValue || tourGuideRating.currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
