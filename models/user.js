const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const UNAUTH = 'UNAUTH';
const USER_TABLE_NAME = `${process.env.MOBILE_HUB_DYNAMIC_PREFIX}-user`;
// The DocumentClient class allows us to interact with DynamoDB using normal objects.
// Documentation for the class is available here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Create new User in your database and return its id
exports.create = function(user, user_id, cb) {

  Object.keys(user).forEach(key => (user[key] === '' && delete user[key]));

  user.userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;

  dynamoDb.put({
    TableName: USER_TABLE_NAME,
    Item: user,
  }, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: 'Could not insert user'
      }).end();
    } else {
      res.json(user);
    }
  });
}
  
// Get a particular User
exports.get = function(id, cb) {
    // performs a DynamoDB Query operation to extract all records for the cognitoIdentityId in the table
  dynamoDb.query({
    TableName: USER_TABLE_NAME,
    KeyConditions: {
      userId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [id || UNAUTH],
      },
    },
  }, (err, data) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, data.Items);
    }
  });
    cb(null, {id:id, text: 'Very nice example'});
}
  
// Get all users
exports.all = function(cb) {
    cb(null, [])
}
