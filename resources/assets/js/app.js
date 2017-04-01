require('./bootstrap');
import _ from 'lodash'
import VueRouter from 'vue-router'
import store from './store'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

//引入组件
import contracts from './components/contracts/contracts.vue'
import discusses from './components/contracts/discusses.vue'
import services from './components/contracts/services.vue'
import customers from './components/contracts/customers.vue'
import customer2s from './components/customer2s/customer2s.vue'

import contractsall from './components/contracts/contractsall.vue'

Vue.use(VueRouter)
Vue.use(iview)

const routes = [
    {path:'/customers', component:customers},
    {name:'customer2s', path:'/customer2s', component:customer2s},
    {name:'cuscontract', path:'/contracts/:id', component:contracts}, //用于展示合同下的服务合同
    {path:'/services', component:services},
    {path:'/discusses', component:discusses},
    {name:'contracts', path:'/contracts', component:contractsall},

]

const router = new VueRouter({
    linkActiveClass:'active',
    routes,
})

//axios全局配置
axios.defaults.baseURL = 'http://lv.app/api/v1';
// axios.defaults.headers.common = {
//     'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//     'X-Requested-With': 'XMLHttpRequest'
// };

Vue.component('contracts-app', require('./components/app.vue'));

const app = new Vue({
    store,
    router,
    el: '#app'
});

router.push({name:'customer2s'})