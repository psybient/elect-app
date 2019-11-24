import React, {memo} from 'react';


const Card = ({ children, title, renderHeader }) => (
    <div className="card">
    <div className="card-header">
      {renderHeader ? renderHeader() : title !== undefined ? title : null}
    </div>
    <div className="card-content">{children}</div>
  </div>
  );

  export default memo(Card);