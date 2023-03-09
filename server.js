const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb+srv://user123:Group22Rules@COP4331.bvp84gt.mongodb.net/COP4331?retryWrites=true&w=majority")

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
app.listen(8000); // start Node + Express server on port 8000