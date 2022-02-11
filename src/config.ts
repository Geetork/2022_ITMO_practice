import path from 'path';
import dotenv from 'dotenv';

// parsing the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env')});

// interface to load env variables
interface ENV {
  SECRET: string | undefined;
  DB_PORT: string | undefined;
  DATABASE: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_TYPE: string | undefined;
  DB_HOST: string | undefined;
  PORT: string | undefined;
};

interface Config {
  SECRET: string;
  DB_PORT: string;
  DATABASE: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_TYPE: string;
  DB_HOST: string;
  PORT: string;
};

const getConfig = (): ENV => {
  return {
    SECRET: process.env.SECRET,
    DB_PORT: process.env.DB_PORT,
    DATABASE: process.env.DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error (`Missing key ${key} in .env`);
    };
  };
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
