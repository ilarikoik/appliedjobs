import sql from "mssql";

const config: sql.config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_SERVER || "localhost",
  database: process.env.DATABASE_NAME,
  options: {
    encrypt: false, // true jos käytetään Azurea
    trustServerCertificate: true, // false tuotannossa, true lokaalisti
  },
};

let pool: sql.ConnectionPool | null = null;

export const getConnection = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};
