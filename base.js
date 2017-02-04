
/*对象式
 */
/*
var Base = {
  getId: function(id) {
    return document.getElementById(id)
  },
  getName: function(name) {
    return document.getElementsByName(name)
  },
  getTagName: function(tagName) {
    return document.getElementsByTagName(tagName)
  }
};
*/

//前台调用
let $ = function(_this) {
  return new Base(_this);
}

//基础库
function Base(_this) {
//创建一个数组，来保存获取的节点和节点数组
  this.elements = [];
  if(_this != undefined){
    this.elements[0] = _this;
  }
}

//获取id节点
Base.prototype.getId = function(id) {
  //return document.getElementById(id);
  this.elements.push(document.getElementById(id));
  return this;
}
//获取元素节点
Base.prototype.getTagName = function(tag){
  var tags = document.getElementsByTagName(tag);
  for(let i = 0; i< tags.length; i++){
    this.elements.push(tags[i]);
  }
  return this; 
}

//获取class节点数组
Base.prototype.getClass = function(className, idname) {
  let node = null;
  if(arguments.length == 2) {
    node = document.getElementById(idname);
  }else {
    node = document;
  }
  var all = node.getElementsByTagName('*');  
  for(let i = 0; i< all.length; i++){
    if(all[i].className == className){
      this.elements.push(all[i]);
    }
  }
  return this;
}

//获取某一个节点
Base.prototype.getElement = function(num) {
  let element = this.elements[num];
  this.elements = [];
  this.elements[0] = element;
  return this;
}


//再外面添加方法，需要使用prototype
//设置css
Base.prototype.css = function(attr, value){
  for(let i = 0;i < this.elements.length; i++){
    if(arguments.length == 1){
      //return this.elements[i].style[attr];
      return window.getComputedStyle(this.elements[i], null)[attr];
    }
    this.elements[i].style[attr] = value;
  }
  return this;
}
//添加class
Base.prototype.addClass = function(className) {
  for(var i = 0; i < this.elements.length; i++){
    if(!this.elements[i].className.match(new RegExp('(^|\\s)' + className + '(\\s|$)'))){
      this.elements[i].className += ' ' +  className;
    }
  }
  return this;
}
//移除class
Base.prototype.removeClass = function(className) {
  for(var i = 0; i < this.elements.length; i++){
    if(this.elements[i].className.match(new RegExp('(^|\\s)' + className + '(\\s|$)'))){
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
    this.elements[i].onmouseover = over;
    this.elements[i].onmouseout = out;
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
//出发点击
Base.prototype.click = function(fn){
  for(let i = 0;i < this.elements.length; i++){
    this.elements[i].onclick = fn;
  }
  return this;
}


