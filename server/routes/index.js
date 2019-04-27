var express = require('express');
var router = express.Router();

////////////////////////////////
/// Setup Routes
////////////////////////////////

////////////////////////////////
/// Authentication Routes
////////////////////////////////
router.get('/gathering/v1/auth', function (req, res, next) {
  let user = req.session.user;
  let status = user ? true : false;
  res.send({ status: status, user: user });
});

// Login user
router.post('/gathering/v1/login', function (req, res, next) {
  if (!validateEmail(req.body.email)) {
    res.status('400').send(new structures.Error('invalid email'));
    return;
  }
  if (!validatePassword(req.body.password)) {
    res.status('400').send(new structures.Error('invalid password'));
    return;
  }
  users.getUser(req.body, function (err, user) {
    if (err) {
      res.status('500').send(new structures.Error('mongo find failed'));
      return;
    }
    req.session.regenerate(function (err) {
      if (err) {
        res.status('500').send(new structures.Error('session regenerate failed'));
        return;
      }
      if (!user) {
        res.status('400').send(new structures.Error('invalid email or password'));
        return;
      }
      delete user.password;
      req.session.user = user;
      let csrf = new structures.CSRF().value;
      req.session.csrf = csrf;
      res.setHeader('X-CSRF', csrf);
      res.send(user);
    });
  });
});

// Logout user
router.post('/gathering/v1/logout', function (req, res, next) {
  req.session.regenerate(function (err) {
    res.redirect('/');
  });
});

////////////////////////////////
/// Application Routes
////////////////////////////////
// path and cookie user matches
router.all('/gathering/v1/users/:uid/*', function (req, res, next) {
  let authUser = req.session.user;
  if (authUser && authUser.id == req.params.uid && req.headers['x-csrf'] && req.headers['x-csrf'] == req.session.csrf) {
    next();
  } else {
    req.session.regenerate(function (err) {
      res.redirect('/');
    });
  }
});

// POST new user
router.post('/gathering/v1/users', function (req, res, next) {
  if (!validateEmail(req.body.email)) {
    res.status('400').send(new structures.Error('invalid email'));
    return;
  }
  if (!validatePassword(req.body.password)) {
    res.status('400').send(new structures.Error('invalid password'));
    return;
  }
  users.createUser(req.body, function (err, user) {
    if (err) {
      res.status('500').send(new structures.Error('mongo insert failed'));
      return;
    }
    delete user.password;
    res.send(user);
  });
});

module.exports = router;
