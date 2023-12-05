import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./style.js";
import { getBaseUrl } from "../../utils/index.js";

const LocationList = () => {
  const baseUrl = getBaseUrl();
  const classes = useStyles();
  const [locations, setlocations] = useState([]);
  const [locationList, setLocationList] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/location`);
      setlocations(res.data);
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickLocation = (location) => {
    window.location.href = `${baseUrl}/location/${location.locationId}`
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (locations.length !== 0)
    setLocationList(locations.map((location, index) => {
      return (
        <div className={classes.locationItem} key={`${location.name}-${index}`} onClick={() => {handleClickLocation(location)}}>
          <img src={location.image} alt={location.name} style={{ width: "100%" }}/>
          <p>{location.name}</p>
          <p>{location.description}</p>
        </div>
      )
    }))
  }, [locations]);

  return (
    <div style={{ marginTop: "20px" }}>
      <p style={{ fontSize: "15px", fontWeight: "600" }}>ハノイでの場所</p>
      <div className={classes.locationList}>
        { locationList }
      </div>
    </div>
  )
}

export default LocationList;