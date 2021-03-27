const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL
const pool = new Pool ({connectionString: connectionString,
                      ssl: {rejectUnauthorized: false}
})
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function db_search(req, res) {
  let search = [req.query.search]
  // var sql = 'select * from blob where user_id=(select user_id from users where username=$1::text)'
  var sql = 'select * from blob where content ilike \'%' + search + '%\''
  pool.query(sql, (err, resp) => {
    console.log(err ? err.stack : '')
    res.json(resp.rows)
  })
}  
module.exports = db_search