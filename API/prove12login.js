const { Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool ({connectionString: connectionString,
                        ssl: {rejectUnauthorized: false}
  })
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let blobs = new Array()

function verify(req, res) {
  let username = req.body.username
  let pass = req.body.password
  if (username.length < 1 || pass.length < 1) {
    res.render('./pages/prove12login', {error: "Enter a username and password"})
  }
  let correct = false

  pool.query('SELECT username FROM users WHERE username=\'' + username + '\'', (err, resp) => {
    console.log(err ? err.stack : '')
    if (err) {
      console.log("err in selecting username")
    }
    if (resp.rows.length > 0) {
      //exists
      console.log("exists")
    }
    else {
      //does not exist
      console.log("does not exist")
    }
  })


  console.log('checking password')
  pool.query('SELECT pass FROM users WHERE username=\'' + username + '\'', (err, resp) => {
    console.log(err ? err.stack : '')
    if (err) {
        res.render('./pages/prove12login', {blobs: blobs, error: -1})
    }

    if (resp.rows.length > 0) {
      if (resp.rows[0].pass === pass) {// Check if they login properly
        console.log("correct password")
        correct = true
      }
    }
 
    if (correct) {
      insert_user(username, pass, res, true)
    }
    else {
      console.log("incorrect password")
      res.render('./pages/prove12login', {error: 'Incorrect Password'})
    }
  })
}
module.exports = verify

function insert_user(username, pass, res, exists) {
  if (!exists) {//incorrect password, or user not in db yet
    pool.query('INSERT INTO users(username, pass) VALUES (\''+ username + '\', \'' + pass + '\')', (err, resp) => {
      console.log(err ? err.stack : '')
      if (err) {//this means just incorrect password I think
        console.log("err in insert")
      }
      else {//SIGNING UP *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
        console.log("This is the else and we pass !exists (false)")
        get_uid(username, res, !exists)//exists is passed in as false  
      }
    })
  }
  else {
    get_uid(username, res, exists)//exists is true here, meaning we did not try to insert
  }
}

function get_uid (username, res, correctPass) {
  if (correctPass) {
    pool.query('SELECT user_id FROM users WHERE username=\'' + username + '\'', (err, resp_id) => {
      console.log(err ? err.stack : '')
      console.log("querying userID from DB, ID:" + resp_id.rows[0].user_id)

      pool.query('SELECT * FROM blob INNER JOIN users on blob.user_id=users.user_id order by blob_id desc', (err, resp) => {// If the login is successful
        console.log(err ? err.stack : '')
        for(let i=0; i < resp.rows.length; i++){
          blobs[i] = resp.rows[i]
        }
        console.log('blob array created, going to main page with blobs')
        res.render('./pages/home_blobs', {blobs: blobs, uid: resp_id.rows[0].user_id})
      })
    })
  }
  else {
    res.render('./pages/prove12login')
  }
}
