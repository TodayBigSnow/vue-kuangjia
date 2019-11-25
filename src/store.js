import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        loginObj:{name:'登陆'},
    },
    mutations:{
        setLoginObj(state,obj){
            state.loginObj = obj
        },
    },
    getters:{
        
    }
})
