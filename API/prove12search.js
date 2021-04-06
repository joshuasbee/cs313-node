const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL
const pool = new Pool ({connectionString: connectionString,
                      ssl: {rejectUnauthorized: false}
})
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  let blobs = new Array()

function db_search(req, res) {
  let search = [req.query.search]
  // var sql = 'select * from blob where content ilike \'%' + search + '%\''
  var sql = 'SELECT * FROM blob INNER JOIN users ON blob.user_id=users.user_id WHERE content ilike \'%' + search + '%\' ORDER BY blob_id DESC'
  pool.query(sql, (err, resp) => {
    console.log(err ? err.stack : '')
    console.log(resp.rows)
    res.json(resp.rows)
    // if (err) {
    //   console.log('error in search')
    // }
    // console.log('length: ' + resp.rows.length)
    // for(let i=0; i < resp.rows.length; i++){
    //   blobs[i] = resp.rows[i]
    //   console.log(resp.rows[i].content + resp.rows[i].username)
    // }
    // res.render('./pages/home_blobs', {blobs: blobs, uid: resp.rows[0].user_id})
  })
}  
module.exports = db_search