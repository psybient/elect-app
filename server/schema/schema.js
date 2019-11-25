const graphql = require('graphql');
const _ = require('lodash');
const cd = require('./mock_data');
//import datum as cd from './'
//console.log(cd)
//console.log(JSON.parse(cd));
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    // Properties from GraphQL Package
} = graphql;


// Schema have 3 responsibilities : 
// Definetypes, relationships, requeries
const ParentItem = new GraphQLObjectType({
    name: 'ParentItem',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        data: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        parent: {
            type: GraphQLID
        },
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        text: {
            type: GraphQLString
        },
        parent: {
            type: GraphQLID
        },
        type: {
            type: GraphQLString
        },
        value: {
            type: GraphQLInt
        },
        parentItem: {
            type: ItemType,
            resolve(parent, args) {
                return _.find(cd, {
                    id: parent.parent
                });
            }
        },
        childrens: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return _.filter(cd, {
                    //type: args.type
                    parent: parent.id
                });
            }
        },
        siblings: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return _.filter(cd, {
                    parent: parent.parent
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
                    type: GraphQLID
                }
            },
            resolve(parent, args) {

                //console.log(typeof (JSON.stringify(args)));
                return _.find(cd, {
                    id: args.id
                });

                // args.id is accessable
                //Code to get data from db/ other sources
            }
        },
        parentItem: {
            type: ParentItem,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(cd, {
                    id: args.id
                });
            }
        },
        Items: {
            type: new GraphQLList(ItemType),
            resolve(parent, args) {
                return cd
            }
        },
        getItemsByType: {
            type: new GraphQLList(ItemType),
            args: { type: { type: GraphQLString } },
            resolve(parent, args) {
                return _.filter(cd, {
                    type: args.type
                });
            }
        },
        getChildItemsOf: {
            type: new GraphQLList(ItemType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.filter(cd, {
                    parent: args.parent
                });
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

