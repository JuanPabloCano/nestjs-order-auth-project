import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      database: process.env.DATABASE,
      port: Number(process.env.DB_PORT),
      host: process.env.HOST,
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
    },
  };
});
