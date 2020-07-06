const messageTypes = {
  ERROR: "ERROR:",
  SUCCESS: "SUCCESS:",
};

const createMessage = (message, setMessage, type = "info") => {
  const typ =
    type.toLowerCase() === "error"
      ? messageTypes.ERROR
      : type.toLowerCase() === "success"
      ? messageTypes.SUCCESS
      : "";
  const payload = {
    msg: `${typ} ${message}`,
  };
  setMessage((prev) => [...prev, payload]);
  console.log("i am from createmessage!");
};

export default createMessage;
