const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 8080));

//const url = "mongodb+srv://user123:Group22Rules@COP4331.bvp84gt.mongodb.net/COP4331?retryWrites=true&w=majority";
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

// need to configure database stuff (apis and file as whole)
app.post('/api/login', async (req, res) =>
{
  // incoming: email, password
  // outgoing: id, firstName, lastName, error
  var error = '';
  const { email, password } = req.body;
  const db = client.db("COP4331");
  const results = await db.collection('users').find({Email:email,Password:password}).toArray();
  var id = -1;
  var fn = '';
  var ln = '';
  if( results.length > 0 )
    {
    id = results[0].UserID;
    fn = results[0].FirstName;
    ln = results[0].LastName;
    }
  var ret = { _id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});

app.post('/api/register', async(req,res)=>{
  
    // incoming: firstName, lastName, email, password
    // outgoing: error (if applicable)
  
    var error = '';
    const {firstName, lastName, email, password} = req.body;
    const newUser = {FirstName:firstName, LastName:lastName, Email:email, Password:password};
    try
    {
      const db = client.db("COP4331");
      db.collection("users").insertOne(newUser);
    }
    catch(e)
    {
      error = e.toString();
    }
  
    var ret = {error: error};
    res.status(200).json(ret);
  })

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