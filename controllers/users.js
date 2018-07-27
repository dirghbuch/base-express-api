var express = require('express')
  , router = express.Router()
  , Users = require('../models/user')

// Define routes handling profile requests
router.get('/:id', function(req, res) {
  let user_id = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
   Users.get(user_id, function (err, user) {
      res.json(user);
   })
})

router.post('/:id', function(req, res) {
  const user = Object.assign({}, req.body);
  let user_id = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
   Users.create(user, user_id, function (err, user) {
      res.json(user);
   })
})
module.exports = router