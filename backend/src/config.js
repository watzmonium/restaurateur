import 'dotenv/config';

const NODE_PORT = process.env.NODE_PORT;
const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_API_KEY;
const PSQL_DB_NAME = process.env.PSQL_DB_NAME
const PSQL_PORT = process.env.PSQL_PORT
const PSQL_USERNAME = process.env.PSQL_USERNAME;
const PSQL_PW = process.env.PSQL_PW;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export default { NODE_PORT, GOOGLE_CLOUD_API_KEY, PSQL_DB_NAME, PSQL_PORT, PSQL_USERNAME, PSQL_PW, JWT_SECRET_KEY };
