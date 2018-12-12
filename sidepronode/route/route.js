const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors')

const company = require('./company')
const clients = require('./clients')
const bills = require('./bills')

const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/company', company)
app.use('/clients', clients)
app.use('/bills', bills)

app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad happened...');
    }
  
    console.log(`Server is listening on ${port}`);
  });