import React from 'react';

import {Link} from 'react-router-dom';
import Ramitlogi from '../Ramitlogi/Ramitlogi';
import Content from '../Content/Content';

import {FloatingButton} from '../Buttons';

function Items(props) {
  let rows = props.data.map(data => {
    return <Ramitlogi key={data.id} data={data} />;
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
