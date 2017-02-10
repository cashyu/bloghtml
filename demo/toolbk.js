(function() {
  window.sys = {};  //让外部可以访问，保存浏览器信息
  let ua = navigator.userAgent.toLowerCase(); //获取浏览器信息
  let s;  //浏览器信息数组，浏览器名称＋版本
  (s = ua.match(/mise ([\d.]+)/)) ? sys.ie = s[1] :
  (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
  (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
  (s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] :
  (s = ua.match(/version\/([\d.]+).*safari/)) ?sys.safari = s[1] : 0;  

})();


//获取窗口大小
function getInner(){
  if(typeof window.innerWidth != 'undefined'){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    return{
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    }
  }
}

//判断class是否存在
function hasClass(element, className){
  return element.className.match(new RegExp('(^|\\s)' + className + '(\\s|$)'));
}

//阻止默认行为
function preDef(event){
  event.preventDefault();
}

//DOM加载
function addDomLoaded(fn) {
  if(document.addEventListener) {
    //W3C
    addEvent(document, 'DOMContentLoaded', function() {
      fn();
      removeEvent(document, DOMContentLoaded, arguments.callee);
    });
  }
}


//事件绑定
function addEvent(obj, type, fn){
  obj.addEventListener(type, fn, false);    
}
//删除事件
function removeEvent(obj, type, fn){
  obj.removeEventListener(type, fn, false);
}
