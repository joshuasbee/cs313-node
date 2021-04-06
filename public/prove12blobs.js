function ajaxHandle() {
  data = {};

  const key = $('#search_input').attr('name');//search_input is ID of search bar
  const username = $('#search_input').val();
  
  // console.log(username)
  data[key] = username;
  
  $.ajax({
    url: '/search',
    type: 'GET',
    dataType: 'json', //will parse json into javascript object
    data:data,
    //callback called when suceed
    success: (data) => {
      let html = '';
      $.each(data, function (index, value) {
       html += "<div class='jumbotron row justify-content-center'>"+ this.content + "</div>"; 
      });// END LOOP
      $('#blobs').html(html);
}})}

function home() {
  alert()
  //undo the ajax above somehow??
  let user_id = req.body.user
  let blobs = new Array()
  let html = ''
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

  const { Pool } = require('pg')
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool ({connectionString: connectionString,
                        ssl: {rejectUnauthorized: false}
  })
  pool.query('SELECT * from blob', (err, resp) => {
    console.log(err ? err.stack : '')
    for(let i=0; i < resp.rows.length; i++){
      html += resp.rows[i].toString()
    }
  })

  $.ajax({
    // url: '/search',
    type: 'GET',
    dataType: 'json', //will parse json into javascript object
    data:data,
    //callback called when suceed
    success: (data) => {
      $('#blobs').html(html);
}})

}