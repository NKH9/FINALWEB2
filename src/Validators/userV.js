const {checkSchema} = require("express-validator");

const SignUpValidator = checkSchema({
    username: {
        in: "body",
        isEmpty: false,
        isString: true,
    },
    name: {
        in: "body",
        isEmpty: false,
        isString: true,
    },
    password: {
        in: "body",
    isEmpty: false,
    isString: true,
    isLength: {
      options: {
        min: 3,
        max: 12,
      },
    },
  },
});

const SingInValidator =  checkSchema({
  username: {
      in: "body",
      isEmpty: false,
      isString: true,
  },
  password: {
      in: "body",
  isEmpty: false,
  isString: true,
  isLength: {
    options: {
      min: 3,
      max: 12,
    },
  },
},
});

module.exports = {
  SignUpValidator,
  SingInValidator,
};
