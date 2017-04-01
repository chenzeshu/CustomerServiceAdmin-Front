import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'


Vue.use(Vuex)

const state = {
    addman:{
        pm : [],
        tm : [],
        worker : [],
        visitor : [],
        cus : {},
        cus2 : [],
        profession : [],
    },  //用于承载addman所传输的所有人、单位、行业等信息

}

const debug = process.env.NODE_ENV !=='production'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})