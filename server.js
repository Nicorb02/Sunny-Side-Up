const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
  // outgoing: _id, firstName, lastName, error
  var error = '';
  const { email, password } = req.body;
  const db = client.db('COP4331');
  const results = await db.collection('users').find({email:email, password:password}).toArray();
  var id = -1;
  var fn = '';
  var ln = '';
  if( results.length > 0 )
    {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
    events = results[0].events;
    }
    else
    {
        error = 'Invalid email or password';
    }
  var ret = { _id:id, firstName:fn, lastName:ln, events:events, error:error};
  res.status(200).json(ret);
});

app.post('/api/emailVer', async(req,res)=>{
  // incoming: email address
  // outgoing: 
  var error = '';
  const email = req.body
  const randomCode = Math.floor(100000 + Math.random() * 900000)
  console.log(randomCode)
  const msg = {
    to: email, // Change to your recipient
    from: 'sunnysideupplanner@gmail.com', // Change to your verified sender
    subject: 'SSU Email Verification',
    text: 'EmailVar',
    html: 'Thank you for registering, please input this code:' + String(randomCode),
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      var ret = {error: error, code: randomCode};
      res.status(200).json(ret);
    })
    .catch((error) => {
      console.error(error)
      error = "400"
      var ret = {error: error, code: randomCode};
      res.status(200).json(ret);
    })
})

app.post('/api/register', async(req,res)=>{
  
    // incoming: firstName, lastName, email, password
    // outgoing: error (if applicable)
  
    var error = '';
    const {firstName, lastName, email, password} = req.body;
    eventsA = []
    contactsA = []
    todoA = []
    notesA = []
    // check if any fields are empty
    if (!firstName || !lastName || !email || !password) {
        error = 'All fields are required';
        var ret = {error: error};
        res.status(400).json(ret);
        return;
    }
    const newUser = {firstName:firstName, lastName:lastName, email:email, password:password, events:eventsA, contacts:contactsA, todo:todoA, notes:notesA};
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
  
app.post('/api/addContact', async(req, res) => {
  // incoming: userId, name, email, phone
  // outgoing: error
  let error = '';
  const {_id, name, email, phone} = req.body;

  if (!name || !email || !phone)
  {
    error = "All fields are required to add a contact";
    let ret = {error: error};
    res.status(400).json(ret);
    return;
  } 

  const db = client.db("COP4331");
  let o_id = new ObjectId(_id);
  const results = await db.collection('users').findOne({_id: o_id});
  console.log(results);
  if (results == null)
  {
    error = "Invalid userId";
    let ret = {error: error};
    res.status(400).json(ret);
    return;
  }

  const newContact = {userId: _id, name: name, email: email, phone: phone};

  try 
  {
    db.collection("contacts").insertOne(newContact);
  }
  catch(e)
  {
    error = e.toString();
  }

  let ret = {error: error};
  res.status(400).json(ret);
})

app.post('/api/addPermNote', async(req,res)=>{

  // incoming: id(of user), title, content
  // outgoing: error (if applicable)

  var error = '';
  const {_id, title, content} = req.body;

  // check if any fields are empty
  if (!title){
      error = 'Please add a title';
      var ret = {error: error};
      res.status(400).json(ret);
      return;
  }
  const db = client.db("COP4331");
  var o_id = new ObjectId(_id);
  const results = await db.collection('users').findOneAndUpdate({ _id: o_id }, {$push:{events:{title:title, content:content}}});
  if(results == null){
    error = 'Invalid userId';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }
  var ret = {error: error};
  res.status(200).json(ret);
})

app.post('/api/delPermNote', async(req,res)=>{

  // incoming: id(of user), title, content
  // outgoing: error (if applicable)

  var error = '';
  const {_id, title} = req.body;

  // check if any fields are empty
  if (!title){
      error = 'Please add a title';
      var ret = {error: error};
      res.status(400).json(ret);
      return;
  }

  const db = client.db("COP4331");
  var o_id = new ObjectId(_id);
  const results = await db.collection('users').findOneAndUpdate({ _id: o_id }, {$pull:{events:{title:title}}});
  if(results == null){
    error = 'Invalid userId';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }
  var ret = {error: error};
  res.status(200).json(ret);
})

app.post('/api/searchPermNote', async(req,res)=>{

  // incoming: id(of user), title, content
  // outgoing: error (if applicable)

  var error = '';
  const {_id, title} = req.body;

  // check if any fields are empty
  const db = client.db("COP4331");
  var o_id = new ObjectId(_id);
  const result = await db.collection('users').findOne({ _id: o_id});
  const allNotesResults = result.events;
  console.log(allNotesResults)
  const searchedNotesResults = allNotesResults.filter(allNotesResults => allNotesResults.title.includes(title));
  var ret = {error: error, results:searchedNotesResults};
  res.status(200).json(ret);
})

app.post('/api/editPermNote', async(req,res)=>{

  // incoming: id(of user), title, content
  // outgoing: error (if applicable)

  var error = '';
  const {_id, title, content} = req.body;

  // check if any fields are empty
  if (!title){
      error = 'Please add a title';
      var ret = {error: error};
      res.status(400).json(ret);
      return;
  }

  const db = client.db("COP4331");
  var o_id = new ObjectId(_id);
  await db.collection('users').findOneAndUpdate({ _id: o_id }, {$pull:{events:{title:title}}});
  await db.collection('users').findOneAndUpdate({ _id: o_id }, {$push:{events:{title:title, content:content}}});
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
