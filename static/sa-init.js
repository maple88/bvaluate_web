var sensors = require('sa-sdk-javascript/sensorsdata.min.js');
var heatmap = require('sa-sdk-javascript/heatmap.min.js');

sensors.init({
  server_url: "http://bvaluate.datasink.sensorsdata.cn/sa?project=default&token=0195a6fbd8b2f627",
  //http://bvaluate.datasink.sensorsdata.cn/sa?project=production&token=0195a6fbd8b2f627
  //heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
  heatmap_url: "heatmap",   //https://static.sensorsdata.cn/sdk/1.12.3/heatmap.min.js
  //web_url 神策分析中点击分析及触达分析功能会用到此地址，代码生成工具会自动生成。如果神策后台版本及 `sensorsdata.min.js` 均是 1.10 及以上版本，这个参数不需要配置。
  // web_url:"神策分析后台地址",
  is_single_page: true,
  heatmap: {
    //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    //需要 JSSDK 版本号大于 1.7
    clickmap: 'default',
    //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
    //需要 JSSDK 版本号大于 1.9.1
    scroll_notice_map: 'default',
    //考虑到用户隐私，这里可以设置input里的内容是否采集
    //如果返回真，表示采集input内容，返回假表示不采集input内容,默认不采集
    // collect_input: false,
    //假如要在 $WebClick 事件增加自定义属性，可以通过（a，button，input）这三类标签的特征来判断是否要增加
    custom_property: function (element_target) {
      //比如您需要给有 data=test 属性的标签的点击事件增加自定义属性 name:'aa' ，则代码如下
      if (element_target.getAttribute('data')) {
        return {
          column_name: element_target.getAttribute('data')
        }
      }
    },
  }
});

if (localStorage.getItem('apelink_user_uid')) {
  sensors.registerPage({
    platform_type: 'web',
    is_login: true,
    is_register: true
  });
  sensors.login(localStorage.getItem('apelink_user_uid'));
} else if (localStorage.getItem('apelink_user_is_register')) {
  sensors.registerPage({
    platform_type: 'web',
    is_login: false,
    is_register: true
  });
} else {
  sensors.registerPage({
    platform_type: 'web',
    is_login: false,
    is_register: false
  });
}


export default sensors
