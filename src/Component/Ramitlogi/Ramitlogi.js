import React from 'react';
import moment from 'moment';
import './ramitlogi.css';

function Ramitlogi(props) {
  let lahetyspaiva = moment(props.data.lahetyspaiva);

  return (
    <div className="ramitlogi">
      <div className="ramitlogi__rivi">
        <div className="ramitlogi__tyyppi">{props.data.saaja}</div>
        <div className="ramitlogi__summa">{props.data.summa.toFixed(2)} €</div>
      </div>
      <div className="ramitlogi__rivi">
        <div className="ramitlogi__lahetyspaiva">
          {lahetyspaiva.format('D.M.Y')}
        </div>
      </div>
    </div>
  );
}

export default Ramitlogi;
