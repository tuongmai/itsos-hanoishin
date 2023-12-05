import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchBox: {
    padding: "20px 0px",
  },
  favoriteLocation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 0px"
  },
  favoriteLocationItem: {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    width: "20%",
  },
  locationList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  locationItem: {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    width: "20%",
    margin: "10px 1px",
    border: "solid 2px",
    padding: "5px",
    cursor: "pointer"
  },
});

export default useStyles;
