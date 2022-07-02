import React from 'react';
import { useParams } from 'react-router-dom';

const withRouter = (Component) => (props) => {
  const { id } = useParams();

  return (
    <Component
      {...props}
      id={id}
    />
  );
};

export default withRouter;
