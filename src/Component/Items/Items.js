import React from 'react';

import {Link} from 'react-router-dom';
import Ramitlogi from '../Ramitlogi/Ramitlogi';
import Content from '../Content/Content';

import {FloatingButton} from '../Buttons';

function Items(props) {
  let rows = props.data.map(invoice => {
    return <Ramitlogi data={invoice} />;
  });

  return (
    <Content>
      {rows}
      <Link to="/add">
        <FloatingButton secondary>+</FloatingButton>
      </Link>
    </Content>
  );
}

export default Items;
