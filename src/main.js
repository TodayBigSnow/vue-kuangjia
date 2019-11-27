import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import BMap from 'vue-baidu-map'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import router from './router.js'
import store from './store.js'
import $ from 'jquery'
import util from './util/util.js'
Vue.prototype.$BMap = BMap
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BMap,{
  ak:'nSxiPohfziUaCuONe4ViUP2N',
})
Vue.prototype.axios = axios
Vue.prototype.$util = util
Vue.prototype.$ = $
// axios.defaults.baseURL = 'https://jyzl.ijiyun.cn/zms_services/'
var url;
if(location.href.indexOf('localhost') != -1){
   url = 'http://localhost:8080/tms_services/'
  //  url = '192.168.1.178:8080/reppon_services/'
}else if(location.href.indexOf('reppon') != -1){
   url = 'http://www.gangkou56.com/tms_services/'
}
//url = 'http://www.gangkou56.com/tms_services/'
axios.defaults.baseURL =url
Vue.prototype.$ = $
Vue.config.productionTip = false
// import './assets/common/rem.js'
// import './assets/css/common.css'
// import './assets/css/animate.min.css'
import 'element-ui/lib/theme-chalk/index.css';
// 强制登录
// window.addEventListener('hashchange',function(e) { 
//   if(!sessionStorage.getItem('obj')){
//     window.location.hash = '#/login'
//   }
// },false);


Vue.use(ElementUI);
var aa = new Vue({
  render: h => h(App),
  store,
  router,
  // watch:{
  //   $route:{
  //     handler(val,oldval){
  //     },
  //     // 深度观察监听
  //     deep: true
  //   },
  // }
}).$mount('#app')
if(sessionStorage.getItem('obj')){
  aa.$store.commit('setLoginObj',JSON.parse(sessionStorage.getItem('obj')))
  axios.interceptors.request.use(function(data){
      data.headers.Authorization = JSON.parse(sessionStorage.getItem('obj')).token
      return data
  },(data)=>{
   
      return data
  })
  axios.interceptors.response.use(data=>{
    
      return data
  },data=>{
    
      return data
  })
}
// window.onhashchange = function () {
//   var type = location.href.split('/')[location.href.split('/').length-1]
//   if(type=== 'login'){
//     aa.$store.commit('setLoginSelected',false)
//   }else{
//     aa.$store.commit('setLoginSelected',true)
//   }
// }
// window.addEventListener('hashchange',function(){
//   var type = location.href.split('/')[location.href.split('/').length-1]
//   if(type=== 'login'){
//     aa.$store.commit('setLoginSelected',false)
//   }else{
//     aa.$store.commit('setLoginSelected',true)
//   }
// })