const Express = require("express");
const ExpressGraphQL = require("express-graphql");
// const schema = require('./schema/schema_ramda');
 const schema = require('./schema/schema');
//const schema = require('./schema/csv_data-schema');
const Mongoose = require("mongoose");
const cors = require('cors');

var app = Express();

app.use(cors());

app.use("/graphql", ExpressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening at :4000...");
});