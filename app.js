var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3000
  , awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(awsServerlessExpressMiddleware.eventContext({ deleteHeaders: false }), bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}))
app.use('/items', require('./controllers'))

app.listen(port, function() {
  console.log('Listening on port ' + port)
})

module.exports = app;