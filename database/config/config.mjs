export default {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    },
    staging: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      logging: false,
      dialect: 'mysql',
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      logging: false,
      dialect: 'mysql',
    },
  };
  1