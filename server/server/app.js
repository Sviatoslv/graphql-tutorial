const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/shema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect(
  'mongodb+srv://user:pass1234@cluster0-isxm8.mongodb.net/graph_ql?retryWrites=true&w=majority',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection Error ${err}`));
dbConnection.once('open', () => console.log('Connection Successfull'));

app.listen(PORT, err => console.log(err ? err : 'Server Starts'));
