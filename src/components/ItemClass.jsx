import React,{component} from 'react';

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import './ItemsList.css';
import PendingAnimation from './pending'; // loading component
import Item from './Item';

import nodeTypes from '../Consts/ItemTypes.js'; // from citree includes icon defination for all types
import { fetchQuery } from '../Consts/queries';
class ItemClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "#",
            loaded: false
        };

    }
    render() {
        //console.log(this.props);
        let query = `{item(id:"${this.state.selected === "#" ? "1" : this.state.selected}"){text}}`;
        //fetchQuery(query).then(item => console.log(item));
        console.log(query)
      // fetchQuery(query).then(item => {
            return (
                <div >
                    <Item renderHeader={() => <h3>{this.state.selected}</h3>} 
                    query = {({fetchQuery(query)})}>
                        <p>Some interesting text</p>
                        <button>Click me</button>
                    </Item>
                    <div id="item-list">
                        {this.displayItems()}
                    </div>
                </div>
            );
        }
      //  );
   // }
}

export default ItemClass;