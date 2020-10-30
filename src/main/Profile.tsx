import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
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

    <Typography variant="subtitle1" style={{paddingTop: 20, paddingLeft: 154}}>
      As Profile is wrapped with <strong>AuthenticatedRoute</strong><br />
      you can access here only if your are authenticated
    </Typography>

    <h2>Profile</h2>

    <Typography variant="h4">{authData.attributes.name}</Typography>
    <Typography variant="subtitle1">{authData.attributes.email}</Typography>

    <SyntaxHighlighter language='json'>
      {JSON.stringify(authDataObj, null, 2)}
    </SyntaxHighlighter>
  </div>;
};
export default Profile;
