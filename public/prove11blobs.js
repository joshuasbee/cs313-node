function ajaxHandle() {
  // console.log('maxPrice() run');

  data = {};
  // const priceName = $('#price').attr('name');
  // const priceValue = $('#price').val();
  const key = $('#search_input').attr('name');
  const username = $('#search_input').val();
  
  console.log(username)
  // data[priceName] = priceValue;
  data[key] = username;
  
  $.ajax({
    url: '/search',
    type: 'GET',
    dataType: 'json', //will parse json into javascript object
    data:data,
    //callback called when suceed
    success: (data) => {
      console.log('ajax success!', data);
      let html = '';
      $.each(data, function (index, value) {
       html += "<div class='jumbotron row justify-content-center'>"+ this.content + "</div>"; 
      });// END LOOP
      $('#blobs').html(html);
}})}