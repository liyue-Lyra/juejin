module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
	// css配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 兼容浏览器，添加前缀
          require("autoprefixer")({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
              //'last 10 versions', // 所有主流浏览器最近10版本用
            ],
            grid: true
          }),
          require("postcss-pxtorem")({
            "rootValue": 37.5,  //换算基数，结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            "exclude": /(node_module|other)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            "propList": ["*"],
            "mediaQuery": false, //（布尔值）允许在媒体查询中转换px。
            "minPixelValue": 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0        
            })
        ]
      }
    }
  }
}