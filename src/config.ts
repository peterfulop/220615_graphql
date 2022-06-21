import convict from 'convict';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
});

const configObject = convict({
  port: {
    doc: 'The port to bind.',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  logLevel: {
    doc: 'The log level of the application',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL',
  },
  databaseUrl: {
    doc: 'URL of the database',
    format: String,
    default: 'postgres://user:password@localhost:5432/db',
    env: 'DATABASE_URL',
  },
  databaseUseSSL: {
    doc: 'Use ssl when connecting',
    format: Boolean,
    default: false,
    env: 'DATABASE_USE_SSL',
  },
});

configObject.validate({ allowed: 'warn' });

export const config = configObject.getProperties();
export type Config = typeof config;
