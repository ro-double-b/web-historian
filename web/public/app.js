$(document).ready(function() {

  var sender = function(urlRequested) {
    $.ajax({
      url: 'http://127.0.0.1:8080',
      type: 'GET',
      contentType: 'application/json',
      data: {url: urlRequested},
      success: (data) => {
        console.log(data);
        $('body').empty();
        $('body').append(data);
        alert('success', data);
      },

      error: (data, err, errstr) => {
        console.log(errstr);
        alert('error', data, err, errstr);
      }
    });
  };

  $('#send').on('submit', function() {
    sender($('.input').val());
    return false;
  });

});