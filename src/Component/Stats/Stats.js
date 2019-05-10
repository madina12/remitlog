import React from 'react';
import Content from '../Content/Content';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import './Stats.css';
import stringHash from 'string-hash';


function Stats(props)
{
  const reducer = (groupedData, currentItem) =>
  {

    const index = groupedData.findIndex(item => item.tyyppi === currentItem.tyyppi);
    if (index >= 0) {
      groupedData[index].summa = groupedData[index].summa + currentItem.summa;
    }
    else {
      groupedData.push({ tyyppi: currentItem.tyyppi, summa: currentItem.summa })

    }
    return groupedData;
  }

  let groupedData = props.data.reduce(reducer, []);
  let DoughnutDAta = {
    labels: groupedData.map(item => item.tyyppi),
    datasets: [{
      data: groupedData.map(item => item.summa),
      backgroundColor: groupedData.map(item => "hsl(" + (stringHash(item.tyyppi) % 360) + ",80%, 70%)"),



    }]
  }


  let linedata = props.data.map(item => ({ x: item.lahetyspaiva, y: item.summa }));
  let data = {
    datasets: [{
      label: "kulut",
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
      <h2>tilastot</h2>

      <div className="stats">
        <div className="stats__graph">
          <Line data={data} options={options} />
        </div>
        <h3>kulut tyyppetain</h3>
        <div className="stats__graph">
          <Doughnut data={DoughnutDAta} />
        </div>
      </div>
    </Content >
  );
}

export default Stats;