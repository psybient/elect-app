const graphql = require('graphql');
const { find, propEq } = require('ramda');
const idEq = propEq('id');
const cd = require('./mock_data');
//console.log(cd);
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
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
        parent:{
            type:GraphQLID
        },
        parentItem:{
            type:ParentItem,
            resolve(parent,args){
                return find(({ id }) => id === parent.parent, cd)}
        }
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
        parentItem:{
            type:ItemType,
            resolve(parent,args){return find(({ id }) => id === parent.parent, cd)}
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
                return find(({ id }) => id === args.id, cd)}
        },
        parentItem:{
            type:ParentItem,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(cd, {
                    id: args.id
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

// lastQuery
// {
//     item(id: "1450") {
//       text
//       id
//       value
//       type
//       parent
//       parentItem {
//         text
//         parent
//         parentItem {
//           text
//           parentItem {
//             parentItem {
//               text
//               parentItem {
//                 text
//                 parentItem {
//                   text
//                   parentItem {
//                     text
//                     parentItem {
//                       text
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }