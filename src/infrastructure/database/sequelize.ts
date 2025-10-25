import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 1433,
    dialect: process.env.DB_DIALECT as any || 'mssql',
    pool: {
      min: Number(process.env.DB_POOL_MIN) || 1,
      max: Number(process.env.DB_POOL_MAX) || 10,
      idle: Number(process.env.DB_POOL_IDLE) || 10000,
      acquire: Number(process.env.DB_POOL_ACQUIRE) || 30000,
    },
    logging: process.env.DB_LOG_SQL === 'true',
    dialectOptions: {
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
      },
    },
  }
);
