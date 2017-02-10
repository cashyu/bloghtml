
$(function() {
  $('#button').click(function() {
    $('#box').animate({
      'attr': 'o',
      'start': 30,
      'target': 100,
      'step': 7,
      'type':1
    });
  });
});


