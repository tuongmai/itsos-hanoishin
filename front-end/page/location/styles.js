import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  urlHistory: {
    fontWeight: "600",
    fontSize: "20px",
  },
  image: {
    margin: "auto",
    width: "fit-content",
    padding: "20px",
    border: "1px solid #000000",
    borderRadius: "5px",
  },
  skillName: {
    background: "white",
    height: "20px",
    lineHeight: "20px",
    textAlign: "center",
    borderRadius: "5px",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    webkitBoxShadow: "0px 0px 15px 0px rgba(0,0,0,0.75)",
    mozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  skillDescription: {
    border: "1px solid #000000",
    borderRadius: "5px",
    minHeight: "200px",
    maxHeight: "400px",
    padding: "10px",
  },
  card: {
    marginRight: "10px",
  },
  title: {
    fontWeight: "800",
    fontSize: "20px",
  },
  layout: {
    padding: "30px",
  },
});

export default useStyles;
