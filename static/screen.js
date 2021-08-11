//滚动条在Y轴上的滚动距离
export function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
      bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  
  
  
  //文档的总高度
  export function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
      bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }
  
  
  
  //浏览器视口的高度
  export function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
      windowHeight = document.documentElement.clientHeight;
    }else{
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  export function backtop() {
    let that = this;
    var timer = setInterval(function() {
      const nowTop = getScrollTop();
      const ispeed = Math.floor(-nowTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop =
        nowTop + ispeed;
      if (nowTop === 0) {
        that.isTop = true;
        clearInterval(timer);
      }
    }, 30);
  }

  /**
		 * 回到顶部功能实现过程：
		 * 1. 获取页面当前距离顶部的滚动距离nowTop（虽然IE不常用了，但还是需要考虑一下兼容性的）
		 * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
		 *       Math.floor(x)  返回值:一个表示小于或等于指定数字x的最大整数的数字
		 * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
		 * 4. 最后记得在移动到顶部时，清除定时器
		 */