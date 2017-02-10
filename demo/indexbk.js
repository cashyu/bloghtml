window.onload = function() {
  //个人中心
/*  $().getClass('member').hover(function(){
    $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
    $().getClass('member_ul').show();
  }, function() {
    $(this).getClass('member').css('background', 'url(images/arrow.png) no-repeat 55px center');
    $().getClass('member_ul').hide();
  });

  //登录框
  let login = $().getId('login');
  let screen = $().getId('screen');
  login.center(350, 250).resize(function(){ ////设置居中，但默认是隐藏的
    if(login.css('display') == 'block'){
      screen.lock();
    }
  });
  $().getClass('login').click(function(){//点登录打开登录框
    screen.lock();
    login.css('display', 'block');
  });
  $().getClass('close').click(function(){ //点击叉叉关闭
    screen.unlock();
    login.css('display', 'none');
  });
  */
  //实现拖拽
  //login.drag([$().getTagName('h2').getElement(0)]);
 
  //$('#box').find('p').css('color', 'red');  
  //$('#box p .a').css('color', 'red');
  //$('#box p .a').css('color', 'red');
  $('#box div').css('color', 'red');
}


