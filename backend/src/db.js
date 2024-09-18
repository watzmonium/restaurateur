import config from './config'
import pg from 'pg';
const Pool = pg.Pool;

const pool = new Pool({
  user: config.PSQL_USERNAME,
  password: config.PSQL_PW,
  host: config.PSQL_HOST,
  port: config.PSQL_PORT,
  database: config.PSQL_DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
