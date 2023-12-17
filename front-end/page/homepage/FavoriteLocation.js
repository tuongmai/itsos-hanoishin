import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./style.js";
import { getBaseUrl } from "../../utils/index.js";

const FavoriteLocation = () => {
  const baseUrl = getBaseUrl();
  const classes = useStyles();
  const [favoriteLocationList, setFavoriteLocationList] = useState([]);
  const [locationList, setLocationList] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/location`);
      const locations = res.data;
      locations.sort((a, b) => { return b.averageRating - a.averageRating });
      const tmp = locations.slice(0, 4)
      setFavoriteLocationList(tmp);
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickLocation = (location) => {
    window.location.href = `${baseUrl}/location/${location.locationId}`
  };

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setLocationList(favoriteLocationList.map((location, index) => {
      return (
        <div className={classes.favoriteLocationItem} key={`${location.name}-${index}`} onClick={() => handleClickLocation(location)}>
          <img src={location.image} alt={location.name} style={{ width: "100%" }}/>
          <p>{location.name}</p>
        </div>
      )
    }))
  }, [favoriteLocationList]);

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