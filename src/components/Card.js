import React, {memo} from 'react';

const Card = ({ children }) => (
    <div className="card">
      {children}
    </div>
  );

  export default memo(Card);