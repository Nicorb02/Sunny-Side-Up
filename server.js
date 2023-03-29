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
    }
    else
    {
        error = 'Invalid email or password';
    }
  var ret = { _id:id, firstName:fn, lastName:ln, error:error};
  res.status(200).json(ret);
});

app.post('/api/register', async(req,res)=>{
  
    // incoming: firstName, lastName, email, password
    // outgoing: error (if applicable)
  
    var error = '';
    const {firstName, lastName, email, password} = req.body;

    // check if any fields are empty
    if (!firstName || !lastName || !email || !password) {
        error = 'All fields are required';
        var ret = {error: error};
        res.status(400).json(ret);
        return;
    }

    const newUser = {firstName:firstName, lastName:lastName, email:email, password:password};
    try
    {
      const db = client.db('COP4331');
      db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
      error = e.toString();
    }
  
    var ret = {error: error};
    res.status(200).json(ret);
  })



app.post('/api/addNote', async(req, res)=>{
  // incoming: id(of user), title, content
  // outgoing: error (if applicable)
  var error = '';
  
  const{id,title, content} = req.body;
  const db = client.db('COP4331');

  if(!title)
  {
    error = 'Must have title';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }

  const newNote = {title:title, content:content};

  //find planner collection for specific user
  const results = await db.collection('users').find({_id:id});
  results.collection('planner').collection('notes').insertOne(newNote);
  var ret = {error: error};
  res.status(200).json(ret);
})

app.post('/api/delNote', async(req, res)=>{
  // incoming: id(of user), title
  // outgoing: error (if applicable)
  var error = '';
  
  const{id,title} = req.body;
  const db = client.db('COP4331');

  if(!title)
  {
    error = 'Must have title';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }

  //find planner collection for specific user
  const results = await db.collection('users').find({_id:id});
  try
  {
    results.collection('planner').collection('notes').deleteOne({title:title});
  }
  catch
  {
    error = 'cannot find note';
    res.status(400).json(ret);
    return;
  }
  var ret = {error: error};
  res.status(200).json(ret);
})

app.post('/api/readNotes', async(req, res)=>{
  // incoming: id(of user), title
  // outgoing: content
  var error = '';
  
  const{id,title} = req.body;
  const db = client.db('COP4331');

  //find planner collection for specific user
  try
  {
    const results = await db.collection('notes').find({_id:id}).toArray();
    content = results[0].content;
  }
  catch
  {
    error = 'cannot find note';
    res.status(400).json(ret);
    return;
  }
  var ret = {error: error, content:content};
  res.status(200).json(ret);
})

app.post('/api/updateNote', async(req, res)=>{
  // incoming: id(of the user), title, content
  // outgoing: error (if applicable)
  const{id,title} = req.body;
  var partTitle = ("%" + title + "%" )
  const results = await db.collection('notes').find({_id:id, title:partTitle}).toArray();
  results[0].content = content
  var ret = {error: error};
  res.status(200).json(ret);

})

app.post('/api/addNote', async(req, res)=>{
  // incoming: id(of user), title, content
  // outgoing: error (if applicable)
  var error = '';
  
  
  const{id,title, content} = req.body;
  const db = client.db('COP4331');

  if(!title)
  {
    error = 'Must have title';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }

  const newNote = {title:title, content:content};

  //find planner collection for specific user
  const results = await db.collection('users').find({_id:id});
  results.collection('planner').collection('notes').insertOne(newNote);
  var ret = {error: error};
  res.status(200).json(ret);
})

app.post('/api/delNote', async(req, res)=>{
  // incoming: id(of user), title
  // outgoing: error (if applicable)
  var error = '';
  
  const{id,title} = req.body;
  const db = client.db('COP4331');

  if(!title)
  {
    error = 'Must have title';
    var ret = {error: error};
    res.status(400).json(ret);
    return;
  }

  //find planner collection for specific user
  const results = await db.collection('users').find({_id:id});
  try
  {
    results.collection('planner').collection('notes').deleteOne({title:title});
  }
  catch
  {
    error = 'cannot find note';
    res.status(400).json(ret);
    return;
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