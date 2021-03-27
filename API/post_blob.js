//insert the content of the textbox into the database

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL
const pool = new Pool ({connectionString: connectionString,
                      ssl: {rejectUnauthorized: false}
})
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function db_add(req, res) {
  let params = [req.query.blob_text, req.query.uid]
  // var sql = 'select * from blob where user_id=(select user_id from users where username=$1::text)'
  //INSERT INTO blob(content, likes, user_id) VALUES ('blob written by joe', 0, 2);
  var sql = 'insert into blob(content, likes, user_id) values ($1::text, 0, $2::int)'
  pool.query(sql, params, (err, resp) => {
    console.log(err ? err.stack : '')
    res.json(resp.rows)
  })
}  
module.exports = db_add