// middleware/admin.js
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
      return next();
    } else {
      res.redirect('/index');
    }
  };