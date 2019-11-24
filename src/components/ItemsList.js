import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import './ItemsList.css';
import PendingAnimation from './pending'; // loading component
import Item from './Item';

import nodeTypes from '../Consts/ItemTypes.js'; // from citree includes icon defination for all types
import { fetchQuery } from '../Consts/queries';
const getItemsQuery = gql`
    {
        Items { 
            id,
            text,
            type,
            parent
        }
    }
`;

class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "#",
            loaded: false
        };

    }

    displayItems() {
        var data = this.props.data;
        //console.log(this.props)
        //while (!this.state.loaded) {
            if (data.loading) {
                return (
                    <PendingAnimation ></PendingAnimation>
                );
            }
            if (!this.state.loaded) {
                return (
                    <PendingAnimation ></PendingAnimation>
                );
            }
            else {

                return data.Items.map(item => {
                    return (
                        <div id={item.id}
                            className="item item-card"
                            type={item.type}
                            key={item.id}
                            onClick={(e) => this.loadItemDetail.bind(this, e, item)()}
                        >
                            <span>{item.text}</span>
                        </div>
                    );
                })
            }
        //}
    }

    loadItemDetail(e, item) {
        // with using closest we can access div's id even if click happened in span inside it

        let selectedId = e.target.closest("div.item-card").id || item.id;
        //let query = `{item(id:"${selectedId}"){text}}`;
        //console.log(this.props)
        //fetchQuery(query).then(item => console.log(item));
        const setState = () => new Promise(resolve => resolve(this.setState({ selected: selectedId })));
        // // console.log(this.state);
        setState().then(()=>22); // this callback can resolve data
        console.log(this.props["children"])
        // .then(() => {
        //     //console.log(this.state.selected);
        //     console.log(this.state);
        // });
    }


    componentDidMount() {
        console.log("didMount");
        setTimeout(() => this.setState({ loaded: true }), 3000); // for our loader to be visible during initial load
    }

    componentDidUpdate() {
        console.log("updateed");

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
                    query={({ query })}>
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

export default graphql(getItemsQuery)(ItemsList);