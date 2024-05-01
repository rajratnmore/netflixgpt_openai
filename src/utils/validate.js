export const checkValidData = (email, password, name) => {
  if (name !== undefined) {
    const userString = Array.from(name);
    for (const ch of userString) {
      if (ch >= "0" && ch <= "9") {
        return "Name is not valid";
      }
    }
  }

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(name);

  if (!isEmailValid) {
    return "Email ID is not valid";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }
  if (!isNameValid) {
    return "Name is not valid";
  }

  return null;
};
