
$(function() {
  $('#button').click(function() {
    $('#box').animate({
      'attr': 'x',
      'target': 0,
      'alter': 150,
      'start': 100,
      'step': 7,
      'speed': 10
    })
  });
});
