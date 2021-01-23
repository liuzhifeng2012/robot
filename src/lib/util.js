import axios from 'axios';
import router from '../router'
import Vue from 'vue'
import { Toast } from 'vant';
Vue.use(Toast);

let env = process.env.NODE_ENV;

let util = {};
util.ajax = {};
util.vars = {};
util.pageTimer = {};//定义计时器全局变量，便于以后计时器的清除 赋值模拟：pageTimer["timer1"] = setInterval(function(){},2000);

let domain = window.location.protocol + '//' + window.location.hostname + '/';

util.vars.htmlUrl = domain;
if (env == "development") {
  util.vars.ajaxUrl = '/api/';
} else {
  util.vars.ajaxUrl = domain + 'api/';
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
使用方法:
生成3-32位随机串：randomWord(true, 3, 32)
生成43位随机串：randomWord(false, 43)
*/
util.randomWord = function (randomFlag, min, max) {
  let rstr = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    rstr += arr[pos];
  }
  return rstr;
};

axios.defaults.timeout = 10000;
axios.interceptors.response.use(function (response) {
  // 数据请求成功
  if (response.data.code == 1) {
    return response.data;
  } else if (response.data.code == 0) {
    return Promise.reject(response);
  } else {
    return response.data;
  }

}, function (error) {
  if (error.toString().indexOf("timeout") != -1) {
    Toast('网络异常，请稍后再试！');
  }
  // 对响应错误做点什么
  return Promise.reject(error);

});
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};
let userKey = getQueryString("userKey") || "";

util.ajax.get = function (url, baseURL) {


  return new Promise((resolve, reject) => {

    axios({
      method: 'get',
      url,
      headers: {
        vfang_token: userKey,
        platform: 0
      },
      baseURL: baseURL || util.vars.ajaxUrl,
    }).then(res => {
      resolve(res)
    }).catch(err => {

      // console.dir(err);
    })
  });

};
util.ajax.post = function (url, params, baseURL) {

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers: {
        vfang_token: userKey,
        platform: 0
      },
      data: params,
      baseURL: baseURL || util.vars.ajaxUrl,

    }).then(res => {
      resolve(res)
    }).catch(err => {
      // console.dir(err);
    })
  });
};

util.GetParameterUrl = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let urlLink = window.location.href;
  let hrefLink = urlLink.indexOf('?') > -1 ? urlLink.indexOf('#') > -1 ? urlLink.split('?')[1].split('#')[0] : urlLink.split('?')[1] : '';
  console.log(hrefLink)
  let r = hrefLink.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};


util.formatDate = function (date) {
  let time = new Date();
  if (typeof (date) === 'number') {
    time = new Date(date);
  } else {
    let dateFor = date.toString().replace(/\-/g, "/");
    time = new Date(dateFor);
  }

  let nowD = new Date();//当前时间

  //相隔的天数
  let diffDay = Math.round(Math.abs((nowD.getTime() - time.getTime())) / (1000 * 60 * 60 * 24));
  if (diffDay >= 3 && diffDay < 4) {
    return '三天前';
  }
  else if (diffDay >= 2 && diffDay < 3) {
    return '两天前';
  }
  else if (diffDay >= 1 && diffDay < 2) {
    return '昨天';
  }
  else if (diffDay >= 0 && diffDay < 1) {
    if (nowD.getDate() == time.getDate()) {
      let diffHour = Math.round(Math.abs((nowD.getTime() - time.getTime())) / (1000 * 60 * 60));
      //当天，需要判断小时
      if (diffHour >= 3) {
        return '今天';
      }
      else if (diffHour >= 2 && diffHour < 3) {
        return '2小时前';
      } else if (diffHour >= 1 && diffHour < 2) {
        return '1小时前';
      } else {
        //当前小时，判断分钟
        let diffMin = Math.round(Math.abs((nowD.getTime() - time.getTime())) / (1000 * 60));
        if (diffMin >= 10) {
          return diffMin + '分钟前';
        } else {
          return '刚刚';
        }
      }
    } else {
      return '昨天';
    }
  } else {
    if (time.getFullYear() >= nowD.getFullYear()) {
      return `${('0' + (time.getMonth() + 1)).slice(-2)}-${('0' + time.getDate()).slice(-2)}`;
    } else {
      return `${time.getFullYear()}-${('0' + (time.getMonth() + 1)).slice(-2)}-${('0' + time.getDate()).slice(-2)}`;
    }
  }
};
util.jsonStringify = function (arg) {
  let qsArr = [];
  for (let k in arg) {
    let v = arg[k];
    qsArr.push({
      name: k,
      value: ("" + v).toString()
    })
  }
  for (let i = 0; i < qsArr.length; i++) {
    qsArr[i] = [qsArr[i].name, qsArr[i].value].join('=')
  }
  return qsArr.join('&');
};
// 获取页面滚动的为空（横向和纵向）var json = {left: 10, right: 10}  变异
//json.left   json.top
util.getScrollPosition = function () {
  if (window.pageYOffset != null)  //  ie9+ 和其他浏览器
  {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }
  else if (document.compatMode == "CSS1Compat")  // 声明的了 DTD
  // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
  {
    return {
      left: document.documentElement.scrollLeft,
      top: document.documentElement.scrollTop
    }
  }
  return { //  剩下的肯定是怪异模式的
    left: document.body.scrollLeft,
    top: document.body.scrollTop
  }
}
//处理一下页面url，防止缓存
util.getNoCacheUrl = function (curUrl) {
  //判断是否有参数，有参数的话加 &+时间戳；无参数加 ?+时间戳
  if (curUrl.indexOf('?') == -1) {
    curUrl += '?timeStamp=' + new Date().getTime()
  }
  else {
    //如果原本无timeStamp,直接加 timeStamp;原本有的话 替换timeStamp的值
    if (curUrl.indexOf('timeStamp') == -1) {
      curUrl += '&timeStamp=' + new Date().getTime()
    }
    else {
      let re = eval('/(timeStamp=)([^&]*)/gi');
      curUrl = curUrl.replace(re, 'timeStamp=' + new Date().getTime());
    }
  }
  return curUrl;
};

//操作cookie 注意：在cookie中存储时，一定要注意把path改为根路径，并加上domain;否则在其他页面是无法获取到存储的cookie值的。
util.setCookie = function (name, value, expireDay) {
  if (expireDay) {
    var Days = expireDay;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/" + ";domain=" + util.GetCookieDomain();
  }
  else {
    document.cookie = name + "=" + escape(value) + ";path=/" + ";domain=" + util.GetCookieDomain();
  }
}

//读取cookies
util.getCookie = function (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

    return unescape(arr[2]);
  else
    return null;
}

//删除cookies 注意：清除cookie的时候，需要同时删除path和 domain，否则会出现cookie没有被清除的情况出现。
util.delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/" + ";domain=" + util.GetCookieDomain();
}

// cookie中获取域名
util.GetCookieDomain = function () {
  var host = location.hostname;
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (ip.test(host) === true || host === 'localhost') return host;
  var regex = /([^]*).*/;
  var match = host.match(regex);
  if (typeof match !== "undefined" && null !== match) host = match[1];
  if (typeof host !== "undefined" && null !== host) {
    var strAry = host.split(".");
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
    }
  }
  return '.' + host;
}

//这里根据返回值 true 或false ,返回true的话 则为全面屏 
util.judgeBigScreen = function () {
  let result = false;
  const rate = window.screen.height / window.screen.width;
  let limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值  

  // window.screen.height为屏幕高度
  //  window.screen.availHeight 为浏览器 可用高度

  if (rate > limit) {
    result = true;
  }
  return result;
};

Vue.prototype.goPrePage = function () {
  if (window.history.length > 2) {
    router.back();
  }
  else {
    router.push('/');
  }
};

// 是否是PC
util.isPC = function () {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

//从数组中抽取一定数量的不重复项
util.getRandomElement=function(arr, ranNum){
  var result = [];
  for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * arr.length);

    result.push(arr.splice(ran, 1)[0]);

  };
  return result;
};

export default util;
