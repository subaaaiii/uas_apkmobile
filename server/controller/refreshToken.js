const { User } = require('../models')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.query.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Sesi telah berakhir. Silahkan Login kembali" });
    }
    const user = await User.findAll({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign(
          { userId, name, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "20s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error });
  }
};

module.exports = {
  refreshToken
};