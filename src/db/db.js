import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const Pool = pg.Pool;
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
});


console.log('db on')

export default pool;