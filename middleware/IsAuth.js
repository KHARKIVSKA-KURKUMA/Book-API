const jwt = require("jsonwebtoken");
const { User } = require(`../models/user`);
const { errorMessage } = require(`../helpers`);
const { SECRET_KEY } = process.env;

const IsAuth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(errorMessage({ status: 401, message: "Not authorized" }));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(errorMessage({ status: 401, message: "Not authorized" }));
    }
    req.user = user;
    next();
  } catch (error) {
    next(errorMessage({ status: 401, message: "Not authorized" }));
  }
};

module.exports = IsAuth;
