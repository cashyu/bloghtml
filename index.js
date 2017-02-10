

$(function() {
  //个人中心
  $('#header .member').hover(function(){
    $(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
    $('#header .member_ul').show();
  }, function() {
    $(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
    $('#header .member_ul').hide();
  });

  //登录框
  let login = $('#login');
  let screen = $('#screen');
  login.center(350, 250).resize(function(){ ////设置居中，但默认是隐藏的
    if(login.css('display') == 'block'){
      screen.lock();
    }
  });
  $('#header .login').click(function(){//点登录打开登录框
    screen.lock();
    login.css('display', 'block');
  });
  $('#login .close').click(function(){ //点击叉叉关闭
    screen.unlock();
    login.css('display', 'none');
  });
  
  //实现拖拽
  login.drag($('#login h2').first(), $('#login .other').first());
  
});


