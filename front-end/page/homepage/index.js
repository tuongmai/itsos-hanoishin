import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "../../component/Header";
import FavoriteLocation from "./FavoriteLocation";
import LocationList from "./LocationList";
import useStyles from "./style.js";
import { Input } from 'antd';
const { Search } = Input;

const Homepage = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  const onSearch = (value) => {
    setSearchText(value);
  }

  return (
    <div>
      <Header/>
      <div style={{ padding: "0px 15%" }}>
        <Search
          className={classes.searchBox}
          placeholder="ハノイシーン内を検索"
          allowClear
          onSearch={(value) => onSearch(value)}
        />
        <FavoriteLocation/>
        <LocationList searchText={searchText}/>
      </div>
    </div>
  )
}

ReactDOM.render(<Homepage />, document.getElementById("homepage"));
