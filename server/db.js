import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'user_drag'
});

export const executequery = async (query, values=[]) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, values);
    return results 
  } catch (error) {
    throw error
  }finally {
    if(connection) connection.release();
  }
}
 