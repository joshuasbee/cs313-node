const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended:true}))//support url encoded bodies
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/prove09', (req, res) => res.render('pages/prove09'))
  .get('/mail', require('./API/prove09controller'))
  .get('/prove10', (req, res) => res.render('pages/prove10'))
  .post('/db10', require('./API/prove10controller'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//------ ALL YOU NEED for connection to server -------
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// const { Client, Pool } = require('pg')
// const connectionString = process.env.DATABASE_URL
// const pool = new Pool ({connectionString: connectionString,
//                         ssl: {rejectUnauthorized: false}
// })

// pool.connect()
// pool.query('SELECT * from users WHERE user_id=1;', (err, res) => {
//   console.log(err ? err.stack : res.rows[0]) // is this the right thing to do??
//   pool.end()
// })