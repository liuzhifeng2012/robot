// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import directive from './directive/index'
import flexible from '@/lib/flexible.debug.js'
import iconfont from '@/assets/iconfont/iconfont.js'
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'
import { PullRefresh, Uploader, Dialog, Icon, Loading } from 'vant'
// import "@/lib/photoswipe.css"
// import "@/lib/default-skin/default-skin.css"
// import MetaInfo from 'vue-meta-info'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// 引入 状态管理 vuex
import store from './store'
import FastClick from 'fastclick'
FastClick.attach(document.body);
FastClick.prototype.focus = function (targetElement) {
  var length;
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

var options = {
  fullscreenEl: false,//关闭全屏按钮
  maxSpreadZoom: 0.1,
  tapToClose: true, //点击滑动区域应关闭图库
  clickToCloseNonZoomable: true, //点击图片应关闭图库，仅当图像小于视口的大小时
  // getDoubleTapZoom:function(isMouseClick, item){
  //    if(isMouseClick) {
  //       return 0.5;
  //   } else {
  //       return item.initialZoomLevel < 0.7 ? 1 : 1.5;
  //   }
  // }
}
Vue.use(preview, options)
Vue.prototype.$preview = preview;

Vue.use(VueLazyload, {
  preLoad: 10.1,
  attempt: 1
})

// Vue.use(VueAwesomeSwiper)
Vue.use(Dialog).use(Uploader).use(PullRefresh).use(Icon).use(Loading);

Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast, {})

// Vue.use(MetaInfo)

Vue.config.productionTip = false

// 伪类在ios移动端浏览器内无效
document.body.addEventListener('touchstart', function () { }, false);

//百度统计代码部署
var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function () {
  var hm = document.createElement("script");
  hm.src = `https://hm.baidu.com/hm.js?672e0caeb4290dd348947306a6b08621`;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // /* 这句非常重要，否则预渲染将不会启动 */
  // mounted () {
  //     // document.dispatchEvent(new Event('render-event'))
  // }
})