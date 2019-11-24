import React, { Component, memo } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

// import './ItemList.css';
import './ItemDiv.css';
import PendingAnimation from './pending';

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

class ItemList extends Component {
    displayItems() {
        var data = this.props.data;
       // console.log(data); //it runs twice after and befor data get provide
        // if(data.loading){
        //     return( 
        //             <PendingAnimation ></PendingAnimation>
        //        );
        // } else {
        return data.Items.map(item => {
            return (
                <div className="item" type={item.type} key={item.id} onClick={() => console.log(item.parent)}>
                    <span>{item.text}</span>
                </div>
            );
        })
        // }
    }
    componentDidMount() {
        //console.log("didMount")
    }

    render() {
        var data = this.props.data;
        if (data.loading) {
            return (
                <PendingAnimation ></PendingAnimation>
            );
        } 
        else {
            return (
                <div >
                    <div id="item-list">
                        {this.displayItems()}
                    </div>
                </div>
            );
        };
    }
}

export default graphql(getItemsQuery)(memo(ItemList));