const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, schemas } = require(`../../models/user`);
const { errorMessage } = require(`../../helpers`);
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body);
  if (error) {
    const label = error.details[0].context.label;
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${label} field`,
      });
    } else {
      throw errorMessage({
        status: 400,
        message: `${error.details[0].message}`,
      });
    }
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw errorMessage({ status: 400, message: "Email or password is wrong" });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw errorMessage({ status: 400, message: "Email or password is wrong" });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = login;
