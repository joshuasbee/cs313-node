const express = require('express')
const session = require('express-session')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(session({
    name: 'user_id',
    secret: 'secret-key',
    saveUninitialized: true,
    resave: true
  //  store: new FileStore()
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended:true}))//support url encoded bodies
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/prove09', (req, res) => res.render('pages/prove09'))
  .get('/mail', require('./API/prove09controller'))
  .get('/prove10', (req, res) => res.render('pages/prove10'))
  .post('/db10', require('./API/prove10controller'))
  .get('/prove11', (req, res) => res.render('pages/prove11'))
  .post('/db11', require('./API/prove11controller'))
  
  //for search bar
  .get('/search', require ('./API/prove12search'))

  .get('/prove12', (req, res) => res.render('pages/prove12'))
  .get('/login12', (req, res) => res.render('pages/prove12login'))//for login
  .post('/login', require('./API/prove12login'))
  
  .get('/postblob', require ('./API/post_blob.js'))



  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// This line can work to allow all folders in the public directory to be accessible rather than doing lots
// of get and post routing:
  //express().use(express.static(path.join(__dirname, "public")))


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