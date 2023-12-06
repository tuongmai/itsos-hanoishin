import React, { useState, useEffect } from "react";
import useStyles from "./style.js";
import { getBaseUrl } from "../../utils/index.js";

const FavoriteLocation = () => {
  const baseUrl = getBaseUrl();
  const classes = useStyles();
  const favoriteLocationList = [
    { locationId: 4, name: "ホアンキエム湖", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
    { locationId: 3, name: "HUST1", image: "https://dlcorp.com.vn/wp-content/uploads/2021/09/Ba%CC%81ch-Khoa-600x301.png" },
    { locationId: 6, name: "sample place 3", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
    { locationId: 7, name: "sample place 4", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
  ];
  const [locationList, setLocationList] = useState(null);

  const handleClickLocation = (location) => {
    window.location.href = `${baseUrl}/location/${location.locationId}`
  };

  useEffect(() => {
    setLocationList(favoriteLocationList.map((location, index) => {
      return (
        <div className={classes.favoriteLocationItem} key={`${location.name}-${index}`} onClick={() => handleClickLocation(location)}>
          <img src={location.image} alt={location.name} style={{ width: "100%" }}/>
          <p>{location.name}</p>
        </div>
      )
    }))
  }, []);

  return (
    <div>
      <p style={{ fontSize: "15px", fontWeight: "600" }}>人気がある場所</p>
      <div className={classes.favoriteLocation}>
        { locationList }
      </div>
    </div>
  )
}

export default FavoriteLocation;