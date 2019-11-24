import React, {memo} from 'react';



const List = ({ data, renderItem, renderHeader }) => (
    <div className="list">
      <div className="list-header">{renderHeader && renderHeader()}</div>
      <ul>
        {data.map(item => (
          <li key={item}>{renderItem ? renderItem(item) : item}</li>
        ))}
      </ul>
    </div>
  );

  //export default graphql(getItemsQuery)(ItemList);
  export default memo(List);