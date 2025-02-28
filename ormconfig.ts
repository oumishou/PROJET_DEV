import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'test',
  entities: [__dirname + '/src/features/**/entities/*.entity{.js,.ts}'],
  migrations: [__dirname + '/src/migrations/*{.js,.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
} as DataSourceOptions);
