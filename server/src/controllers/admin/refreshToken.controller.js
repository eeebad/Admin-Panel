const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await User.findOne({
          email: decoded.email,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        if (err || foundUser.email !== decoded.email) {
          return res.sendStatus(403);
        }
        res.status(500).send({ message: "relogin" });
      }

      // Refresh token was still valid
      const accessToken = jwt.sign(
        {
          email: decoded.email,
          id: decoded.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );

      const newRefreshToken = jwt.sign(
        {
          email: foundUser.email,
          id: foundUser.id.toString(),
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = newRefreshToken;
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
