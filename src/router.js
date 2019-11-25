import VueRouter from 'vue-router'
import index from './components/index/index.vue'
import service from './components/service/service.vue'
import about from './components/about/about.vue'
import billNoSearch from './components/billNoSearch/billNoSearch.vue'
import login from './components/login/login.vue'
import phoneMe from './components/phoneMe/phoneMe.vue'
import orderManagement from './components/orderManagement/orderManagement.vue'
import Order from "./components/Order";

export default new VueRouter({
    mode: 'history',
    routes:[
       {path:'/',redirect:'/index'},
       {path:'/index',component:index,name:'index'},
       {path:'/service',component:service,name:'service'},
       {path:'/about',component:about,name:'about'},
       {path:'/billNoSearch',component:billNoSearch,name:'billNoSearch'},
       {path:'/login',component:login,name:'login'},
       {path:'/phoneMe',component:phoneMe,name:'phoneMe'},
       {path:'/orderManagement',component:orderManagement,name:'orderManagement'},
       {path:'/Order',component:Order,name:'Order'},
    ]
})