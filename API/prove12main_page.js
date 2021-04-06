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
      console.log(resp.rows[i])
    }
    //pass in an array of usernames as well maybe, and use the same order of indices for the array of usernames?
    res.render('./pages/home_blobs', {uid: user_id, blobs: blobs})
  })
  pool.query('SELECT * from blob', (err, resp) => {
    console.log(err ? err.stack : '')
    for(let i=0; i < resp.rows.length; i++){
      blobs[i] = resp.rows[i]
    }
    //pass in an array of usernames as well maybe, and use the same order of indices for the array of usernames?
    res.render('./pages/home_blobs', {uid: user_id, blobs: blobs})
  })
  
}
module.exports = db_display