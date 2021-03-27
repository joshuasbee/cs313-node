const { Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool ({connectionString: connectionString,
                        ssl: {rejectUnauthorized: false}
  })
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"


function db_display(req, res) {
  let username = req.body.username
  let pass = req.body.password
  let correct = false
  let blobs = new Array()

  // first check if they login properly
  console.log('password: ' + pass)
  pool.query('SELECT pass FROM users WHERE username=\'' + username + '\'', (err, resp) => {
    console.log(err ? err.stack : '')
    if (err) {
      req.session.user_id = get_user_id(username, pass)
      if (req.session.user_id == -1) {
        console.log("That username is taken message here")
        res.render('./pages/prove12login', {blobs: blobs, error: -1})
      }
    }
    // console.log("response: " + resp.rows[0].pass)
    // console.log("Pass variable: " + pass)
    if (resp.rows[0].pass === pass) {
      console.log("correct password")
      correct = true
    }
  // then display all this
    if (correct) {
      pool.query('SELECT * from blob order by blob_id desc', (err, resp) => {//IF the login is successful
        console.log(err ? err.stack : '')
        for(let i=0; i < resp.rows.length; i++){
          blobs[i] = resp.rows[i]
        }
        // req.session.user_id = get_user_id(username, pass) //This req.session.user_id is not being set correctly
        var x = get_user_id(username, pass, blobs, res)
        // console.log("x:" + x)
      })
    }//ending if statement
    else {
      //display another page maybe?
      console.log("incorrect password")
    }
  })
}
module.exports = db_display

function get_user_id(username, pass, blobs, res) {
  pool.query('INSERT INTO users(username, pass) VALUES (\"'+ username + '\", \"' + pass + '\")', (err, resp) => {
    console.log(err ? err.stack : '')
    
    if (err) {
      //error
      console.log("username already exists")
      // return -1
    }
    else {
    }//if there is not an error

      //the username alredy exists, query for their ID
      pool.query('SELECT user_id FROM users WHERE username=\'' + username + '\'', (err, resp) => {
        console.log(err ? err.stack : '')
        console.log("querying username from DB, ID:" + resp.rows[0].user_id)
        res.render('./pages/home_blobs', {blobs: blobs, uid: resp.rows[0].user_id})
        // return resp.rows[0].user_id
      })
    
    // else {
      
    // }
  })
}