const graphql = require('graphql');
const _ = require('lodash');


const csv_parser = require('csv-parser');
const csv = require('csv');
const fs = require('fs');

//const cd = require('./mock_data');

var rowArray = [];
const fetchCsv = () => new Promise(function (resolve) {
    var Id = 0;
    fs.createReadStream('./schema/brower_log.csv')
        .pipe(csv_parser())
        .on('data', (row) => {
            rowArray.push({id:Id++,...row});
            //console.log(row);
        })
        .on('end', () => {
            // console.log(rowArray);
            resolve(rowArray);
        })
});

fetchCsv().then(rowArray=>console.log(rowArray));


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    // Properties from GraphQL Package
} = graphql;




const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id:{
            type:GraphQLID
        },
        requestIp: {
            type: GraphQLString
        },
        requestDate: {
            type: GraphQLString
        },
        browserName: {
            type: GraphQLString
        },
       
        visits: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return _.filter(rowArray, {
                    requestIp: parent.requestIp
                });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        item: { // this is the phrase that is going to use when we query from front
            type: ItemType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log(typeof (JSON.stringify(args)));
                return _.find(rowArray, {
                    id: args.id
                });
            }
        },
    
        Items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return rowArray
            }
        },
        browsers: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return _.filter(rowArray,{
                    browserName: parent.browserName
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

