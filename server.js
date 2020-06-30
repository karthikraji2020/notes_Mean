const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const api = require('./server/api');


app.use(express.json());
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/courselinks', { useNewUrlParser: true });
const port = process.env.PORT || 5000;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:password@123@cluster0-zt42g.mongodb.net/db_notes?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("db_notes").collection("collection_notes");
  // perform actions on the collection object
  client.close();
});


app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(port, () => console.log(`Server started on Port ${port}`));
