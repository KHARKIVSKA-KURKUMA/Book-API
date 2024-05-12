const getCurrent = async (req, res) => {
  const { role, email, username, id } = req.user;
  console.log("req.user :>> ", req.user);
  res.json({
    username,
    email,
    role,
    id,
  });
};

module.exports = getCurrent;
