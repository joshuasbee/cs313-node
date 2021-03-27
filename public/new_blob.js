function insert_blob () {
  data = {};

  const blob = $('#blob_content').val();//text box content
  
  const uid = $('#uid').val();
  // console.log(username)
  data["blob_text"] = blob;
  data["uid"] = uid;
  
  $.ajax({
    url: '/postblob',
    type: 'GET',
    dataType: 'json', //will parse json into javascript object
    data:data,//send the array to the postblob endpoint
    //callback called when suceed
    success: (data) => {
      console.log("uploaded the blob to the database")
      //TODO hide the whole entry box thing, clear it also
      location.reload()
}})}

function show_new_blob_form() {
  document.getElementById('new_blob_form').style.display = 'block'
}