const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/prove09', (req, res) => res.render('pages/prove09'))
  .get('/mail', require('./API/prove09controller'))
  .get('/prove10', (req, res) => res.render('pages/prove10'))
  .post('/db10', require('./API/prove10controller'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  //new code testing below

/*const pool = new Pool({
  user: 'rlebwyxfmaiheh',
  host: 'ec2-3-95-85-91.compute-1.amazonaws.com',
  database: 'd22v6hdhdkaeuf',
  password: '24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34',
  port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'rlebwyxfmaiheh',
  host: 'ec2-3-95-85-91.compute-1.amazonaws.com',
  database: 'd22v6hdhdkaeuf',
  password: '24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34',
  port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})*/
/*const { Pool, Client } = require('pg')
const connectionString = 'postgresql://rlebwyxfmaiheh:24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34@ec2-3-95-85-91.compute-1.amazonaws.com:5432/mydb'
const pool = new Pool({
  connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  connectionString,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})*/
const { Client, Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://rlebwyxfmaiheh:24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34@ec2-3-95-85-91.compute-1.amazonaws.com:5432/d22v6hdhdkaeuf?ssl=true'
const pool = new Pool ({connectionString: connectionString})
const client = new Client()
// const client = new Client({
//   user: 'rlebwyxfmaiheh',
//   host: 'ec2-3-95-85-91.compute-1.amazonaws.com',
//   database: 'd22v6hdhdkaeuf',
//   password: '24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34',
//   port: 5432,
// })
// client.connect()
// client.query('SELECT * from users', (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })

pool.connect()
pool.query('SELECT * from users;', (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})
/*
  PGUSER=rlebwyxfmaiheh \
  PGHOST=ec2-3-95-85-91.compute-1.amazonaws.com \
  PGPASSWORD=24491b8adab711794768970b4da24c7e888206dbab146c290f35ab5d22a12c34 \
  PGDATABASE=d22v6hdhdkaeuf \
  PGPORT=5432 \
  node index.js 

PGUSER=postgres PGPASSWORD=password heroku pg:pull postgresql-lively-78470 blobber --app obscure-scrubland-42350
  */