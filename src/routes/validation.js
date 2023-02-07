module.exports = {
  isValidEmail: (value) => {
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    return emailRegex.test(value);
  },
  isValidName: (value) => {
    return /^[a-zA-Z0-9_]{4,20}$/.test(value);
  },
  isValidPhoneNo: (value) => {
    return /^\d{10}$/.test(value);
  },
};
