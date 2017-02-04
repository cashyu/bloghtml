

/*Base.getId('box').css('color','red').css('backgroundColor','black').html('pox').click(function(){
  alert('a')
})
*/
/*
window.onload = function() {
  alert(Base.getId('box').innerHTML);
}
*/

window.onload = function() {
  $().getClass('member').hover(function(){
    $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
    $().getTagName('ul').show();
  }, function() {
    $(this).getClass('member').css('background', 'url(images/arrow.png) no-repeat 55px center');
    $().getTagName('ul').hide();
  });
}


