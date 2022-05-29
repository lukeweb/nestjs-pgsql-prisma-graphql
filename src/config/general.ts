import { ConfigFactoryKeyHost, registerAs } from '@nestjs/config';
// import { cleanEnv, port, str } from 'envalid';

export interface Config {
  APP_PORT: number;
  DATABASE_URL: string;
}

// ## TODO: Fix problem with envalid
// export const config: (() => Config) & ConfigFactoryKeyHost<Config> = registerAs(
//   'general',
//   (): Config => {
//     return cleanEnv(process.env, {
//       APP_PORT: port({ default: 3000 }),
//       DATABASE_URL: str(),
//     });
//   },
// );

export const config: (() => Config) & ConfigFactoryKeyHost<Config> = registerAs(
  'general',
  (): Config => ({
    APP_PORT: parseInt(process.env.APP_PORT),
    DATABASE_URL: process.env.DATABASE_URL,
  }),
);
