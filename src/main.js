import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//import store from './store'
import store from "./vuex/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import echarts from "echarts";
Vue.use(ElementUI);
axios.defaults.headers.common["Authorization"] = window.localStorage.getItem(
  "token"
);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// Vue.directive('jspang',function(el,bingding){
//      //console.log(el);
//      //console.log(bingding);
//      //console.log(bingding.value);
//      //console.log(bingding.expression);
//     el.style='color:'+bingding.value
// })

//axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {
      //判断本地是否存在access_token
      next();
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (localStorage.getItem("ac_token")) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
