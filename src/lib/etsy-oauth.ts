import { AuthorizationCode, ModuleOptions } from 'simple-oauth2';

const config: ModuleOptions = {
  client: {
    id: process.env.AUTH_ETSY_ID as string,
    secret: process.env.AUTH_ETSY_SECRET as string,
  },
  auth: {
    authorizeHost: 'https://www.etsy.com',
    tokenHost: 'https://api.etsy.com',
    authorizePath: '/oauth/connect',
    tokenPath: '/v3/public/oauth/token',
  },
};

export const client = new AuthorizationCode(config);
