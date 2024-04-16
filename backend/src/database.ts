import sql, { ConnectionPool, config } from "mssql/msnodesqlv8";
import env from "./validateEnv";

const db_user = env.DB_USER;
const db_password = env.DB_PASSWORD;
const db_server = env.DB_SERVER;
const db_name = env.DB_NAME;

// Configuration for database connection
const db_config: config = {
    user: db_user,
    password: db_password,
    server: db_server,
    database: db_name,
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    }
};

export const connectToDatabase = async (): Promise<ConnectionPool> => {
    try {
      console.log('⌛ Connecting to database...');
      const pool = await sql.connect(db_config);
      console.log('✅ Database connection established');
      return pool;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
  };

