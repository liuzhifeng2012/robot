import Vue from 'vue'
import util from '../lib/util'

// 坑位埋点指令
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;

      util.ajax.post('/stat/pageAndButton', util.jsonStringify({
        action_type: 2,
        button_type: data.button_type,
        extra: data.extra || ''
      })).then(res => {/*todu*/
      });
    }, false);
  }
});
