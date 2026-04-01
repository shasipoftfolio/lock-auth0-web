var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});


router.get('/profile', requiresAuth(), async function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
    access_token:req.oidc.accessToken,
    refresh_token:req.oidc.refreshToken,
    id_token:req.oidc.idToken
  });
});

module.exports = router;
