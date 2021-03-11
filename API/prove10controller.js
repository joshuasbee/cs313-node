function db_display(req, res) {
  // let user_id = req.query.user 
  let user_id = req.body.user
  let blobs = new Array()
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

  const { Client, Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool ({connectionString: connectionString,
                        ssl: {rejectUnauthorized: false}
  })
  pool.connect()
  pool.query('SELECT * from blob', (err, resp) => {
    console.log(err ? err.stack : resp.rows[0])
    for(let i=0; i < resp.rows.length; i++){
      blobs[i] = resp.rows[i]
    }
    pool.end()
    res.render('./pages/prove10result', {uid: user_id, blobs: blobs})
  })
}  
module.exports = db_display