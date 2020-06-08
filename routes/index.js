const express = require('express');
const router = express.Router();
// define login and password for admin site
const login = 'admin'
const password = 'woofwoof'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  const body = req.body
  if (body.login === login && body.password === password) {
    // need npm cookie-session here
    req.session.admin = 1 //setting a flag

    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
