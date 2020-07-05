export const isName = (string = "") => {
  let message;
  const isError = !string.trim().match(/^\w{3,}(\_\w+)*$/);
  message = isError
    ? "ERROR: name should be at least 3 characters and should only contain letters"
    : "";
  return [isError, message];
};

export const isEmail = (email = "") => {
  let message;
  const pattern = new RegExp(
    /^[a-zA-Z]+\w{2,}\@\w{3,}\.[a-z]{2,3}(\.[a-z]{2,3})?$/
  );
  const isError = !pattern.test(email);
  message = isError
    ? "ERROR: emails should be of format example@gmail.com"
    : "";
  return [isError, message];
};
