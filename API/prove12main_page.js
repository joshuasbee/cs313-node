function db_display(req, res) {
  let user_id = req.body.user
  let blobs = new Array()
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

  const { Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool ({connectionString: connectionString,
                        ssl: {rejectUnauthorized: false}
  })
  pool.query('SELECT * from blob', (err, resp) => {
    console.log(err ? err.stack : '')
    for(let i=0; i < resp.rows.length; i++){
      blobs[i] = resp.rows[i]
    }
    res.render('./pages/home_blobs', {uid: user_id, blobs: blobs})
  })
}
module.exports = db_display