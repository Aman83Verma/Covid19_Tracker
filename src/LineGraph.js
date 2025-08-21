// // import { Legend } from 'chart.js';
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import numeral from "numeral";


// const options = {
//   Legend:{
//     display : false,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
//   maintainAspectRatio: false,
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     callbacks: {
//       label: function (tooltipItem, data) {
//         return numeral(tooltipItem.value).format("+0,0");
//       },
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           callbacks: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };

// const buildChartData =(data, caseType = "cases") => {
//     const chartData = [];
//     let lastDatePoint;

//     for (let date in data.cases) {
//       if(lastDatePoint){
//         const newDataPoint = {
//           x : date,
//           y : data[caseType][date] - lastDatePoint,
//         };
//         chartData.push(newDataPoint);
//       }
//       lastDatePoint = data[caseType][date];
//     };
//     return chartData;
//   }

// function LineGraph({ casesType = "cases" }) {

//   const [data, setData] = useState({});

//   // https://disease.sh/v3/covid-19/historical/all?lastdays=120

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120").then((response) => response.json()).then((data) => {
//       let chartData = buildChartData(data, "cases");
//       setData(chartData);
//     })
//     }
    
//     fetchData();
//   },[]);


//   return (
//     <div style={{ height: '400px' }}>

//       {data?.length > 0 && (
//         <Line options={options} data = {{ datasets : [ {
//           backgroundColor : "rgba(204, 16, 52, 0.5)",
//           borderColor : "#CC1034",
//           data : data
//         } ]}} />
//       )}
      
//     </div>
//   )
// }

// export default LineGraph;


// LineGraph.js
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // ✅ needed for time axis
} from "chart.js";
import "chartjs-adapter-date-fns"; // ✅ required for time scale
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: { radius: 0 },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (context) =>
          context.parsed.y ? numeral(context.parsed.y).format("+0,0") : "",
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "PP",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        callback: (value) => numeral(value).format("0a"),
      },
    },
  },
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      )
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: casesType,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
