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

/*mongoset*/
const mongooseSets={
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }; 
// const client = new MongoClient(uri, { useNewUrlParser: true });
const client = new MongoClient(uri,mongooseSets);
client.connect(err => {
  const collection = client.db("db_notes").collection("collection_notes");
   console.log("Successfully connected to the database");    
  // perform actions on the collection object
  client.close();
});


// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('./dist/notes_MEAN'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/notes_MEAN/'}),
);
app.get('/test', (req, res) =>
    res.sendFile('index.html', {root: 'dist/notes_MEAN/'}),
);

app.use('/api', api);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/notes_MEAN/index.html'));
// });
app.listen(port, () => console.log(`Server started on Port ${port}`));
