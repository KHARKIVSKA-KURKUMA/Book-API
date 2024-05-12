const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, schemas } = require(`../../models/user`);
const { errorMessage } = require(`../../helpers`);
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
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
  if (user) {
    throw errorMessage({ status: 409, message: `Email ${email} in use` });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const result = await User.create({ ...req.body, password: hashPassword });
    const payload = {
      id: result._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    if (result) {
      await User.findByIdAndUpdate(result._id, { token });
      res.status(201).json({
        token,
        user: {
          role: "client",
          name: result.name,
          id: user._id,
          email: result.email,
        },
      });
    } else {
      console.error("Failed to create user");
    }
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

module.exports = register;
