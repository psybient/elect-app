
  import React, {memo} from 'react';

//   interface Props {
//     data: string[];
//     renderItem?: (item: string) => JSX.Element;
//     renderHeader?: () => JSX.Element;
//   }

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


  export default memo(List);