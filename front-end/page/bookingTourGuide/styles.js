import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  urlHistory: {
    fontWeight: "600",
    fontSize: "20px",
  },
  layoutCard: {
    marginBottom: "10px",
    width: "90%",
    display: "flex",
    border: "solid 1px black",
    borderRadius: "5px",
    position: "relative",
    overflow: "hidden"
  },
  layout: {
    padding: "10px 50px"
  },
  titleCard: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px"
  },
  skillName: {
    background: "white",
    height: "30px",
    padding: "0 5px",
    lineHeight: "30px",
    textAlign: "center",
    borderRadius: "5px",
    marginRight: "10px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    webkitBoxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
    mozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  },
});

export default useStyles;
