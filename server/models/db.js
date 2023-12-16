import mysql from "mysql2";

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dmw@970210",
  database: "items",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let isDbConnected = false;

const getConnection = async () => {
  if (!isDbConnected) {
    console.log("Connected to the database");
    isDbConnected = true;
  }

  const connection = await pool.promise().getConnection();
  return connection;
};

export { getConnection };
