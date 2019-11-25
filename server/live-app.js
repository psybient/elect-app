const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema_live');
const mongoose = require('mongoose');
const cors = require('cors');

var app = express();

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

mongoose.connect('mongodb+srv://sa:qhdeCABUYATSI8Ec@cluster0-3tjty.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});