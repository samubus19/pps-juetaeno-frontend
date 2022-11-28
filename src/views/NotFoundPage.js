import * as React                 from 'react';
import img404                     from '../assets/404-code.svg'
import Grid                       from '@mui/material/Grid';
import { Paper, Box, Typography } from '@mui/material';
import Link                       from '@mui/material/Link';

export default function NotFoundPage() {
  return (
    <div style={{ 
          background : "#fdd", 
          width      : "100vw", 
          height     : "100vh"}}>
      <Box sx ={{
        display  : 'flex',
        flexWrap : 'wrap',
        '& > :not(style)': {
          m          : 1,
          height     : 248,
          background : "#fdd"
        },
      }}>
        <Paper elevation={0} style={{margin:"0", width:"100%" ,display:"flex", flexDirection:"column", justifyContent:"center"}} >
          <Typography variant="h3" mt={2} paragraph textAlign="center" color="#6D0100">UPS!</Typography>
          <Typography variant="h4" mt={2} paragraph textAlign="center" color="#6D0100">Lo siento, no encontramos lo que buscabas</Typography>
          <Link href="/" color="#6D0100">
            <Typography variant="h6" mt={2} paragraph textAlign="center" > &#8701; Volver al inicio </Typography>
          </Link>
        </Paper>
      </Box>
      <Grid container justifyContent="center" style={{background:"#fdd"}}>
          <img src={img404} alt="404" width="100%"/>
      </Grid>
    </div>
  );
}

