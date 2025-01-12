import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  String(process.env.POSTGRES_DB),
  String(process.env.POSTGRES_USER),
  String(process.env.POSTGRES_PASSWORD),
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    logging: false, // Désactiver les logs SQL
  }
);

export default sequelize;