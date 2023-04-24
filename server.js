const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// test push
const app = express();

const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));
var ObjectId = require('mongodb').ObjectId; 

const sgMail = require('@sendgrid/mail');
const { title } = require('process');
const { start } = require('repl');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// import apis from apis file
var api = require('./apis.js');
api.setApp(app, client);
console.log("server loaded");

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});


// ======= HEROKU DEPLOYMENT (DO NOT MODIFY) ========
// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
});