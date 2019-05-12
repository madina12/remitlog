import React from 'react';
import Content from '../Content/Content';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import './Stats.css';
import stringHash from 'string-hash';


function Stats(props) {
  const reducer = (groupedData, currentItem) => {

    const index = groupedData.findIndex(item => item.saaja === currentItem.saaja);
    if (index >= 0) {
      groupedData[index].summa = groupedData[index].summa + currentItem.summa;
    }
    else {
      groupedData.push({ saaja: currentItem.saaja, summa: currentItem.summa })
    }
    return groupedData;
  }

  let groupedData = props.data.reduce(reducer, []);
  let DoughnutData = {
    labels: groupedData.map(item => item.saaja),
    datasets: [{
      data: groupedData.map(item => item.summa),
      backgroundColor: groupedData.map(item => "hsl(" + (stringHash(item.saaja) % 360) + ",80%, 70%)"),
    }]
  }

  let linedata = props.data.map(item => ({ x: item.lahetyspaiva, y: item.summa }));
  let data = {
    datasets: [{
      label: "Lähetykset ajan mukaan",
      data: linedata,
      fill: false,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'rbga(0,0,0,0.1)'
    }]
  }

  let options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            displayFormats: {
              data: 'D.M.Y',
              month: 'M.Y'
            }
          }
        }
      ]
    }
  }

  return (
    <Content>
      <center>
        <h2>Tilastot</h2>
      </center>

      <div className="stats">
        <h3>Lähetykset ajan mukaan</h3>
        <div className="stats__graph">
          <Line data={data} options={options} />
        </div>
        <h3>Lähetykset henkilöittäin</h3>
        <div className="stats__graph">
          <Doughnut data={DoughnutData} />
        </div>
      </div>
    </Content >
  );
}

export default Stats;