const configs = {
  dev: {
    cognito: {
      REGION: process.env.REACT_APP_dev_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_dev_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_dev_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_dev_COGNITO_IDENTITY_POOL_ID
    },
  },
};

if (!process.env.REACT_APP_STAGE) throw Error('Set REACT_APP_STAGE environmental variable');
if (!configs[process.env.REACT_APP_STAGE]) throw Error(`Config ${process.env.REACT_APP_STAGE} doesn't exist`);

export default {
  ...configs[process.env.REACT_APP_STAGE],
};
