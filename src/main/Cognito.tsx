import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {useApp} from "../layout/Site";
import {stringify} from "../lib/util";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

type Props = {}

const Profile: React.FC<Props> = () => {

  const classes = useStyles();

  const { authData } = useApp()!;
  console.log(authData);
  const authDataStr = stringify(authData, 2, (k:string,v:any) => v, 2); // Use depth 2 to unclutter info
  let authDataObj = JSON.parse(authDataStr);

  return <div className={classes.container}>
    <h2>Profile</h2>

    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h4">{authData.attributes.name}</Typography>
        <Typography variant="subtitle1">{authData.attributes.email}</Typography>
      </Grid>

      <Grid item md={12}>
        <SyntaxHighlighter language='json'>
          {JSON.stringify(authDataObj, null, 2)}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  </div>;
};
export default Profile;
