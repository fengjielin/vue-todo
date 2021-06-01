// 导入Vue
import Vue from 'vue';
// 导入App组件
import App from './App.vue';
// 创建Vue根实例
new Vue({
  el: '#app',
  components: {
    App
  },
  // 挂载App组件 
  template: '<App />'
});
