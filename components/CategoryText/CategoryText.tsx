import React from 'react';
import { Grid, Typography, withStyles, WithStyles } from '@material-ui/core';
import styles from './styles';

interface categoryTextProps extends WithStyles<any> {
  captionText: string;
  detailText: string;
}

function CategoryText(props: categoryTextProps) {
  const { captionText, detailText, classes } = props;
  return (
    <Grid container direction='column' style={{ marginBottom: 10, maxWidth: 300 }}>
      <Grid item>
        <Typography className={classes.captionText}>{captionText}</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.detailText}>{detailText}</Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CategoryText);
