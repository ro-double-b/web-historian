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
        $('p').empty();
        $('form').append('<p>Our robots are currently archiving the site you requested. Please check back soon for a freshly embalmed copy!</p>');
        console.log('error', data, err, errstr);
      }
    });
  };

  $('#send').on('submit', function() {
    sender($('.input').val());
    return false;
  });

});