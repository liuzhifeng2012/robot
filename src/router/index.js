import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './pathConfig';
import util from '../lib/util';

Vue.use(VueRouter);

const createRouter = () => {

  const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: routes,
    scrollBehavior(to, from, savedPosition) {

      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  });
  router.beforeEach((to, from, next) => {

    // const prefixUrl = window.location.href.split('#')[0];
    // const url = `${prefixUrl}#${to.fullPath}`;
    const url = `${window.location.protocol}//${window.location.host}${to.fullPath}`; 
    // if (to.meta.wechatLink) {
    //   var promise = wechatConfig(url)
    //   promise.then(d => {
    //     wechatReady(Object.assign({}, to.meta));
    //   })
    // }


    // 修改页面title
    if (to.meta.title) {
      document.title = to.meta.title;
    }



    next();
    // util.vars.inTime = new Date().getTime();
  });
  router.afterEach((to, from) => {

    // 页面添加数据埋点
    if (from.meta.page_type) {

      // util.ajax.post('/stat/pageAndButton', util.jsonStringify({
      //   action_type: 1,
      //   page_type: from.meta.page_type,
      //   in_time: util.vars.inTime,
      //   out_time: new Date().getTime(),
      //   extra: from.query.id || ''
      // })).then(res => {/*todu*/
      // });
    }

  });
  return router;
};

export default createRouter();
