import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const Copyright = () => {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      Copyright ©
      <Link to="/" style={{ textDecoration: 'none' }}>
        Alpha Ski Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles({
  footerList: {
    margin: 0,
    padding: 0
  },
  footerListItem: {
    listStyle: 'none'
  }
});

const footers = [
  {
    title: 'Get to Know Us',
    items: [
      {
        text: 'Mast Head',
        link: '/mast'
      },
      {
        text: 'Our Story',
        link: '/story'
      },
      {
        text: 'Our Mentors',
        link: '/mentors'
      },
      {
        text: 'Take Us Skiing!',
        link: '/trips'
      }
    ]
  },
  {
    title: 'Get that sweet developer cash',
    items: [
      {
        text: 'Sell Skis',
        link: '/sell/skis'
      },
      {
        text: 'Sell Gloves',
        link: '/sell/gloves'
      },
      {
        text: 'Sell Colorado Products',
        link: '/sell/fun'
      }
    ]
  }
];

export default function Footer() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" component="footer">
      <Grid container spacing={4} justify="space-evenly">
        {footers.map(footer => (
          <Grid item xs={6} sm={4} key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            <ul className={classes.footerList}>
              {footer.items.map(item => (
                <li key={item.text} className={classes.footerListItem}>
                  <Link to={item.link} style={{ textDecoration: 'none' }}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
