const graphql = require('graphql');
const Item = require('../model/Item');
const _ = require('lodash');
const cd = require('./mock_data');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        text: {
            type: new GraphQLNonNull(GraphQLString)
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
            resolve(parent,args){
                // return _.find(cd, {
                //     id: parent.parent
                // });

                return Item.findById(parent.id)
            }
        },
        childrens:{
            type:new GraphQLList(ItemType),
            resolve(parent,args){
            //         return _.filter( cd, {
            //             type: args.type
            // });
            return Item.where( {
                     parent: parent.parent
                 })
            }
        },
        siblings:{
            type:new GraphQLList(ItemType),
            resolve(parent,args){
                // return _.filter(cd, {
                //     parent: parent.parent
                // });

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

                return Item.findById(args.id)
              //console.log(typeof (JSON.stringify(args)));
                //return _.find(cd, {id: args.id} );
            }
        },

        Items:{
            type:new GraphQLList(ItemType),
            resolve(parent,args){
               // return cd
               return Item.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addItem: {
            type: ItemType,
            args: {
                text: { type: GraphQLString },
                type: {
                    type: GraphQLString
                },
                parent:{
                    type:GraphQLID
                },
                value: { type: GraphQLInt }
            },
            resolve(parent, args){
                let item = new Item({
                    text: args.text,
                    value: args.value,
                    parent:args.parent,
                    type:args.type
                });
                return item.save();
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});