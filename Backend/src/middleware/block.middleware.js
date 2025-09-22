const blockMiddleware = (req, res, next) => {
  if (req.user && req.user.blocked) {
    return res.status(403).json({ message: "Your account is blocked. Contact admin." });
  }
  next();
};

module.exports = blockMiddleware;
