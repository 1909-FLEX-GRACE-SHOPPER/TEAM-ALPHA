import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Typography } from '@material-ui/core';

export default function NotFound() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h2">
          These are not the skiis you are looking for...
        </Typography>
        <img
          src="https://cdn.drawception.com/images/panels/2016/9-23/M52p2HNH7L-2.png"
          alt="Skiing C3PO"
        />
        <Typography variant="h4" component="h4">
          Return to the <Link to="/">ski lodge</Link>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
