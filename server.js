const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: '*'
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));
require('./routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
});