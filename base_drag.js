$().extend('drag', function(){
  let tags = arguments;
  for(let i = 0; i < this.elements.length; i++){
    addEvent(this.elements[i], 'mousedown', function(e){
      //preDef(e);
      let _this = this //_this = this = oDiv
      let diffx = e.clientX - _this.offsetLeft;  //鼠标的ｘ坐标，减去登录框的ｘ坐标
      let diffy = e.clientY - _this.offsetTop;  //鼠标的y坐标，减去登录框的ｘ坐标
      
      //自定义拖拽区域
      let flag = false;
      for(let i = 0;i < tags.length; i++){
        if(e.target == tags[i]){
          flag = true;    //只要有一个是ｔｒｕｅ就立刻返回
          break;
        }
      }
      
      if(flag){
        addEvent(document, 'mousemove', move);
        addEvent(document, 'mouseup', up);
      }else{
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
      }
      function move(e){
        let left = e.clientX - diffx;
        let top = e.clientY - diffy;
        if(left < 0){
          left = 0;
        }else if(left > getInner().width - _this.offsetWidth){
          left = getInner().width - _this.offsetWidth; 
        }
        if(top < 0){
          top = 0;
        }else if(top > getInner().height - _this.offsetHeight){
          top = getInner().height - _this.offsetHeight; 
        }
        _this.style.top = top + 'px';
        _this.style.left = left + 'px';
        
        if(typeof _this.setCapture != 'undefined') {
          _this.setCapture();
        }
      } 
      function up(){
        removeEvent(document, 'mousemove', move);
        removeEvent(document, 'mouseup', up);
        if(typeof _this.releaseCapture != 'undefined'){
          _this.releaseCapture();
        }
      }  
    }); 
  }
  return this;
});
