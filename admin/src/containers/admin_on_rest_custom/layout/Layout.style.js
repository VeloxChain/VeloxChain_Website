const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  body: {
    backgroundColor: "#edecec",
    display: "flex",
    flex: 1,
    overflowY: "hidden",
    overflowX: "scroll",
  },
  content: {
    flex: 1
  },
  children: {
    flex: 1,
    padding: "2em",
  },
  loader: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 16,
    zIndex: 1200,
  },
  appBar: {
    background: "rgba(6, 10, 26, 0.8)"
  },
  logoTopBar: {
    height: "40px"
  }
};

export default styles;
