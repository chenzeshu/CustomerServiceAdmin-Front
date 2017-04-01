import * as types from './mutation-types'

export default {
    [types.ADD_PM_TO](state, payload){
        state.addman.pm = payload
    },

    [types.ADD_TM_TO](state, payload){
        state.addman.tm = payload
    },

    [types.ADD_WORKER_TO](state, payload){
        state.worker.tm = payload
    },

    [types.ADD_VISITOR_TO](state, payload){
        state.addman.visitor = payload
    },

    [types.ADD_CUS_TO](state, payload){
        state.addman.cus = payload
    },

    [types.ADD_CUS2_TO](state, payload){
        state.addman.cus2 = payload
    },

    [types.ADD_PROFESSION_TO](state, payload){
        state.addman.profession = payload
    },
}
