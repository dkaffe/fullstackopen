const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const baseStyle = {
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  // Change color palette based on message type
  const typeStyle =
    type === "success"
      ? { color: "green", borderColor: "green" }
      : type === "error"
      ? { color: "red", borderColor: "red" }
      : {};

  const style = { ...baseStyle, ...typeStyle };

  return <div style={style}>{message}</div>;
};

export default Notification;
