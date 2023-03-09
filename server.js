const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const path = require("path")
const PORT = process.env.PORT || 8000;

const app = express();
require("dotenv").config()


mongoose.connect("mongodb+srv://user123:Group22Rules@COP4331.bvp84gt.mongodb.net/COP4331?retryWrites=true&w=majority")

app.set('port', (process.env.PORT || 8000))
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
      );
      next();
    });
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
    

app.listen(PORT); // start Node + Express server on port 8000