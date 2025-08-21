// // import './App.css';
// // import { MenuItem, FormControl, Select, Card, CardContent } from '@mui/material';
// // import { useEffect, useState } from 'react';
// // import InfoBox from './InfoBox';
// // import Table from './Table';
// // import Map from './Map';
// // import { sortData } from './util';
// // import LineGraph from './LineGraph';

// import './App.css';
// import { MenuItem, FormControl, Select, Card, CardContent } from '@mui/material';
// import { useEffect, useState } from 'react';
// import InfoBox from './InfoBox';
// import Table from './Table';
// import Map from './Map';
// import { sortData } from './util';
// import LineGraph from './LineGraph';
// import 'leaflet/dist/leaflet.css';

// // ✅ Chart.js v4 registration
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


// function App() {

//   const [Countries, setCountries] = useState([]);
//   const [Country, setCountry] = useState('Worldwide');
//   const [countryInfo, setCountryInfo] = useState({});
//   const [tableData, setTableData] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
//   const [mapZoom, setMapZoom] = useState(3);
//   const [mapCountries, setMapCountries] = useState([]);

//   useEffect(() => {
//     fetch("https://disease.sh/v3/covid-19/all").then((response) => response.json()).then((data) => {
//       setCountryInfo(data);
//     });
//   }, []);


//   // https://disease.sh/v3/covid-19/countries

//   useEffect(() => {
//     const getCountriesData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
//         const countries = data.map((country) => ({
//           name: country.country,
//           value : country.countryInfo.iso2
//         }));

//         const sortedData = sortData(data);
//         setTableData(sortedData);
//         setMapCountries(data);
//         setCountries(countries);
//       })
//     };
//     getCountriesData();
//   },[]);


//   const onCountryChange = async (event) => {
//     const countryCode = event.target.value;

//     const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

//     await fetch(url).then((respopnse) => respopnse.json()).then((data) => {
//       setCountry(countryCode);
//       setCountryInfo(data);

//       setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
//       setMapZoom(4);
//     });
//   };

//   // console.log(countryInfo);
  

//   return (
//     <div className="app">

//       <div className='app__leftBox'>
//         <div className="app__header">
//           <h1>Covid19 Tracker</h1>
//           <FormControl className="app__dropdown">
//             <Select variant="outlined" onChange={onCountryChange} value={Country}>

//               <MenuItem value="Worldwide">Worldwide</MenuItem>
//               {Countries.map((Countries) => (
//                 <MenuItem value={Countries.value}> {Countries.name} </MenuItem>
//               ) 
//               )}

//             </Select>
//           </FormControl>
//         </div>

//         <div className="app__stats">
//           {/* Add components to display statistics here */}
//           <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

//           <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

//           <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
//         </div>

//         <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
//       </div>
      
//       <Card className='app__rightBox'>
//         <CardContent>
//           <h3>Live cases by Country</h3>
//           <Table countries={tableData} />
//           <h3>Worldwide new cases</h3>

//           <LineGraph />

//         </CardContent>
//       </Card>
      
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@mui/material"; // ✅ Updated MUI v5 import
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

const App = () => {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);




  // Fetch worldwide data on mount
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const res = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await res.json();
        setCountryInfo(data);
      } catch (err) {
        console.error("Error fetching global data:", err);
      }
    };
    fetchGlobalData();
  }, []);

  // Fetch all countries data
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const res = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await res.json();

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        setCountries(countries);
        setMapCountries(data);
        setTableData(sortData(data));
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountriesData();
  }, []);

  // const onCountryChange = async (e) => {
  //   const countryCode = e.target.value;

  //   const url =
  //     countryCode === "worldwide"
  //       ? "https://disease.sh/v3/covid-19/all"
  //       : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     setCountry(countryCode);
  //     setCountryInfo(data);

  //     if (countryCode !== "worldwide") {
  //       // ✅ Corrected 'long' instead of 'log'
  //       setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  //       setMapZoom(4);
  //     } else {
  //       setMapCenter({ lat: 34.80746, lng: -40.4796 });
  //       setMapZoom(3);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching country data:", err);
  //   }
  // };

  const onCountryChange = async (event) => {
  const countryCode = event.target.value;

  const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);

      if (countryCode === "worldwide") {
        setMapCenter({ lat: 34.80746, lng: -40.4796 }); // 🌍 default
        setMapZoom(2);
      } else {
        setMapCenter({
          lat: data.countryInfo.lat,
          lng: data.countryInfo.long, // ✅ API gives "long", keep it
        });
        setMapZoom(4);
      }
    });
};



  return (
    <div className="app">
      <div className="app__Main">
        <div className="app__left">
          {/* Header */}
          <div className="app__header">
            <h1>COVID-19 Tracker</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* InfoBoxes */}
          <div className="app__stats">
            <InfoBox
              onClick={() => setCasesType("cases")}
              title="Coronavirus Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>

          {/* Map */}
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>

        {/* Right Panel */}
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>Worldwide new {casesType}</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer/>
      
    </div>
  );
};

export default App;
