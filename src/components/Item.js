import React, { memo } from 'react';
import { fetchQuery } from '../Consts/queries';
function Item  ({ children, title, renderHeader, query }){
    // function Item(props) {
    //     return  <div>{props.item}</div>
    console.log('in item', query);
  
   // fetchQuery(query).then(item =>
       return (
            <div className="card">
                <div className="card-header">
                    {renderHeader ? renderHeader() : title !== undefined ? title : null}
                </div>
                <div className="card-content">{children}</div>
              <div>{`${(JSON.stringify(query))}`}</div>
            </div>
        )
    //)
}



//export default graphql(getItemsQuery)(ItemList);
export default Item;