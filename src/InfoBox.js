// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';

// function InfoBox({ title, cases, total }) {
//   return (
//     <Card className="infoBox">
//         <CardContent>
//             <Typography className='infoBox__title' color='textSecondary'>
//                 {title}
//             </Typography>
//             <h2 className='infoBox__cases'> {cases} </h2>

//             <Typography className='infoBox__total' color='textSecondary'>
//                 {total} Total
//             </Typography>
//         </CardContent>
//     </Card>
//   )
// }

// export default InfoBox;


import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, onClick }) {
  return (
    <Card
      onClick={onClick}
      className={`infoBox ${active ? "infoBox--selected" : ""} ${
        isRed ? "infoBox--red" : ""
      }`}
      sx={{
        cursor: "pointer",
        borderRadius: 2,
        boxShadow: active ? 4 : 1,
        border: active ? "2px solid #1976d2" : "1px solid #e0e0e0",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          className={`infoBox__cases ${!isRed ? "infoBox__cases--green" : ""}`}
        >
          {cases}
        </Typography>

        <Typography
          variant="body2"
          className="infoBox__total"
          color="text.secondary"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
