import Vue from 'vue'
import Vuex from 'vuex'


import common from './common'
import pet from './pet'
import user from './user'
import quality from './quality'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		pet,
		user,
		common
	}
})