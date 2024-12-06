exports.getIndex = (req, res) => {
    if (req.session.user) {
      return res.redirect('/galleri');
    }
    res.render('index');
  };