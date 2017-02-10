
//前台调用
let $ = function(args) {
  return new Base(args);
}

//基础库
function Base(args) {
//创建一个数组，来保存获取的节点和节点数组
  this.elements = [];
  
  if(typeof args == 'string'){
    //css模拟
    if(args.indexOf(' ') != -1) {
      let elements = args.split(' ');  //把节点拆开，分别保存到数组
      let childElements = []; //存放临时节点对象数组,解决被覆盖的问题
      let node = [];  //用来存放父节点
      for(let i = 0 ; i < elements.length; i++) {
        if(node.length == 0) node.push(document); //如果默认没有父节点就把document作为父节点
        switch(elements[i].charAt(0)) {
          case '#':
            childElements = []; //清理掉临时节点，以便父节点失效，子节点有效
            childElements.push(this.getId(elements[i].substring(1)));
            node = childElements; //保存父节点，
            break;
          case '.':
            childElements = [];
            for(let j = 0; j < node.length; j++){
              let temps = this.getClass(elements[i].substring(1), node[j]);
              for(let k = 0; k < temps.length; k++) {
                childElements.push(temps[k]);
              }
            }
            node = childElements;
            break;
          default:
            childElements = [];
            for(let j = 0; j < node.length; j++){
              let temps = this.getTagName(elements[i], node[j]);
              for(let k = 0; k < temps.length; k++) {
                childElements.push(temps[k]);
              }
            }
            node = childElements;
        }  
      }
     this.elements = childElements; 
    }else {
      //find模拟
      switch(args.charAt(0)){
        case '#':
          this.elements.push(this.getId(args.substring(1)));
          break;
        case '.':
          this.elements = this.getClass(args.substring(1));
          break;
        default:
          this.elements = this.getTagName(args);
      }
    }
  }else if(typeof args =='object'){
    if(args != undefined){
      this.elements[0] = args;
    }
  } else if(typeof args == 'function') {
    this.ready(args);
  }
}

//addDomLoaded
Base.prototype.ready = function(fn) {
  addDomLoaded(fn);
};

//获取id节点
Base.prototype.getId = function(id) {
  //return document.getElementById(id);
  return document.getElementById(id);
}
//获取元素节点
Base.prototype.getTagName = function(tag, parentNode){
  let node = null;
  let temps = [];
  if(parentNode != undefined) {
    node = parentNode;
  }else {
    node = document;
  }
  let tags = node.getElementsByTagName(tag);
  for(let i = 0; i< tags.length; i++){
    temps.push(tags[i]);
  }
  return temps; 
}

//获取class节点数组
Base.prototype.getClass = function(className, parentNode) {
  let node = null;
  let temps = [];
  if(parentNode != undefined) {
    node = parentNode;
  }else {
    node = document;
  }
  let all = node.getElementsByTagName('*');  
  for(let i = 0; i< all.length; i++){
    if(all[i].className == className){
      temps.push(all[i]);
    }
  }
  return temps;
}

//设置css选择器子节点
Base.prototype.find = function(str){
  let childElements = [];
  for(let i = 0; i < this.elements.length; i++){
    switch(str.charAt(0)){
      case '#':
        childElements.push(this.getId(str.substring(1)));
        break;
      case '.':
        let all = this.getClass(str.substring(1), this.elements[i]);
        for(let j = 0; j < all.length; j++){
          childElements.push(all[j]);
        }
        break;
      default:
        let temps = this.getTagName(str, this.elements[i])
        for(let j = 0; j < temps.length; j++){
          childElements.push(temps[j]);
        }
    }
  }
  this.elements = childElements;
  return this;
}

//获取某一个节点
Base.prototype.eq = function(num) {
  let element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this;
}
//获取收个节点，病返回这个节点对象
Base.prototype.first = function() {
  return this.elements[0];
};

//获取末尾节点，病返回这个节点对象
Base.prototype.last = function() {
  return this.elements[this.elements.length - 1];
};

//获取某一个节点i,并返回节点对象
Base.prototype.ge = function(num) {
  return this.elements[num];
}

//再外面添加方法，需要使用prototype
//设置css
Base.prototype.css = function(attr, value){
  for(let i = 0;i < this.elements.length; i++){
    if(arguments.length == 1){
      //return this.elements[i].style[attr];
      return getStyle(this.elements[i], attr) + 'px';
    }
    this.elements[i].style[attr] = value; //设置新的属性值
  }
  return this;
}
//添加class
Base.prototype.addClass = function(className) {
  for(var i = 0; i < this.elements.length; i++){
    if(!hasClass(this.elements[i], className)){
      this.elements[i].className += ' ' +  className;
    }
  }
  return this;
}
//移除class
Base.prototype.removeClass = function(className) {
  for(var i = 0; i < this.elements.length; i++){
    if(hasClass(this.elements[i], className)){
      this.elements[i].className = this.elements[i].className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)'), '');
    }
  }
  return this;
}

//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position) {
  let sheet = document.styleSheets[num];
  sheet.insertRule(selectorText + '{' + cssText + '}', position)
}

//移除link或style的css规则
Base.prototype.removeRule = function(num, index) {
  let sheet = document.styleSheets[num];
  sheet.deleteRule(index);
}


//设置innerHTML
Base.prototype.html = function(str){
  for(let i = 0;i < this.elements.length; i++){
    if(arguments.length == 0){
      return this.elements[i].innerHTML;
    }
    this.elements[i].innerHTML = str;
  }
  return this;
}
//设置鼠标移入移除方法
Base.prototype.hover = function(over, out){
  for(let i = 0;i < this.elements.length; i++){
    addEvent(this.elements[i], 'mouseover', over)
    addEvent(this.elements[i], 'mouseout', out)
  }
}

//设置显示
Base.prototype.show = function(){
  for(let i = 0;i < this.elements.length; i++){
    this.elements[i].style.display = 'block';
  } 
}
//设置隐藏
Base.prototype.hide = function(){
  for(let i = 0;i < this.elements.length; i++){
    this.elements[i].style.display = 'none';
  } 
}

//设置物体居中
Base.prototype.center = function(width, heigth){
  let top = (getInner().height - heigth)/2;  //获取位置的高度
  let left = (getInner().width - width)/2;  //获取位置的左距
  for(let i = 0; i < this.elements.length; i++){
    this.elements[i].style.top = top + 'px';
    this.elements[i].style.left = left + 'px';
  }
  return this;
}

//锁屏功能
Base.prototype.lock = function(fn) {
  for(let i = 0; i < this.elements.length; i++){
    this.elements[i].style.width = getInner().width + 'px';
    this.elements[i].style.height = getInner().height + 'px';
    this.elements[i].style.display = 'block';
    document.documentElement.style.overflow = 'hidden';
  }
  return this; 
}
Base.prototype.unlock = function(fn) {
  for(let i = 0; i < this.elements.length; i++){
    this.elements[i].style.display = 'none';
    document.documentElement.style.overflow = 'auto';
  }
  return this; 
}

//触发点击
Base.prototype.click = function(fn){
  for(let i = 0;i < this.elements.length; i++){
    this.elements[i].onclick = fn;
  }
  return this;
}
//触发浏览器窗口大小改变事件
Base.prototype.resize = function(fn) {
  for(let i = 0; i < this.elements.length; i++){
    let element = this.elements[i];
    addEvent(window, 'resize', function(){
      fn();
      if(element.offsetLeft > getInner().width - element.offsetWidth){
        element.style.left = getInner().width - element.offsetWidth + 'px';
      }
      if(element.offsetTop > getInner().height - element.offsetHeight){
        element.style.top = getInner().height - element.offsetHeight + 'px';
      }
    });
  }
  return this;
}

//设置动画
Base.prototype.animate = function(obj) {
  var t = 50;
  for(let i = 0; i < this.elements.length; i++){ 
    let element = this.elements[i];
    let attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
              obj['attr']  == 'w' ? 'width' : obj['attr'] = 'h' ? 'height' : 'left';
    let start = obj['start'] != undefined ? obj['start'] : getStyle(element, attr);//默认css的起始位置
    let t = obj['t'] != undefined ? obj['t'] : 30;//默认30
    let step = obj['step'] != undefined ? obj['step'] : 10;//默认10

    let speed = obj['speed'] != undefined ? obj['speed'] : 6; //默认缓冲速度6
    let type = obj['type'] == 0 ? 'constat' : obj['type'] == 1 ? 'buffer' : 'buffer';//０匀速，１缓冲，默认缓冲
    let target = obj['target'] ;
    let alter = obj['alter'] ;
    if(alter != undefined && target == undefined) {
      target = alter + start;
    } else if(alter == undefined && target == undefined) {
      throw new Error('alter增量或target目标量必须传一个')
    }

    if(start > target) step = -step;

    element.style[attr] = start + 'px'
    clearInterval(window.timer); //每次点击清楚定时器，防止多次点击加速移动
    timer = setInterval(function() {
      
      if(type == 'buffer') {
        step = (target - getStyle(element, attr)) / speed;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
      } 
      if(step == 0) {
        setTarget();
      }

      if(step > 0 && Math.abs(getStyle(element, attr) - target) <= step) {
        setTarget();
      }else if(step < 0 && (getStyle(element, attr) - target) <= Math.abs(step)){
        setTarget();
      }else {
        element.style[attr] = getStyle(element, attr) + step + 'px';
      }
      document.getElementById('aaa').innerHTML += getStyle(element, attr) + '<br/>'
    },  t); 
    function setTarget() {
      element.style[attr] = target + 'px';
      clearInterval(timer);
    }
  }
  return this;
};

//插件入口
Base.prototype.extend = function(name, fn){
  Base.prototype[name] = fn;
}

