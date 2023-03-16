const customModalStyles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 15px",
  },
  content: {
    position: "relative",
    width: "400px",
    maxWidth: "100%",
    margin: "auto",
    padding: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    maxHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    transition: "opacity 300ms ease-in-out",
    inset: "auto",
  },
};

export default customModalStyles;
