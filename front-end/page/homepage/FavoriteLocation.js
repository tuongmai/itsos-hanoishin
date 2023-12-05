import React, { useState, useEffect } from "react";
import useStyles from "./style.js";

const FavoriteLocation = () => {
  const classes = useStyles();
  const favoriteLocationList = [
    { name: "ホアンキエム湖", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
    { name: "ホアンキエム湖", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
    { name: "ホアンキエム湖", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
    { name: "ホアンキエム湖", image: "https://static.vinwonders.com/production/ho-hoan-kiem-2.jpg" },
  ];
  const [locationList, setLocationList] = useState(null);

  useEffect(() => {
    setLocationList(favoriteLocationList.map((location, index) => {
      return (
        <div className={classes.favoriteLocationItem} key={`${location.name}-${index}`}>
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