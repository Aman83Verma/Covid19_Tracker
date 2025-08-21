// import "./Table.css";

// function Table( {countries} ) {
//   return (
//     <div className='table' style={{ height: '380px' }}>
//       {countries.map( ({country, cases}) => (
//           <tr>
//             <td> {country} </td>
//             <td> <strong> {cases} </strong> </td>
//           </tr>
//       ))}
//     </div>
//   )
// }

// export default Table;


import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map((country) => (
            <tr key={country.countryInfo?._id || country.country}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
