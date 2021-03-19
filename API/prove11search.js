const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL
const pool = new Pool ({connectionString: connectionString,
                      ssl: {rejectUnauthorized: false}
})
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

function db_search(req, res) {
  // let user_id = req.query.user
  let search = [req.query.search]
  // console.log(JSON.stringify(search) + "\n\n")
  // let blobs = new Array()
  var sql = 'select * from blob where user_id=(select user_id from users where username=$1::text)'
  pool.query(sql, search, (err, resp) => {
    console.log(err ? err.stack : '')
    console.log(JSON.stringify(resp.rows))
    // for(let i=0; i < resp.rows.length; i++){
    //   blobs[i] = resp.rows[i]
    // }
    res.json(resp.rows)
    // res.render('./pages/prove11search', {blobs: JSON.stringify(resp.rows)})
  })
}  
module.exports = db_search