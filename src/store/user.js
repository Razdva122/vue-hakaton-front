import User from './user_help'
import firebase from 'firebase/app'

export default{
	state: {
		user: null
	},
	mutations:{
		setUser (state, payload){
			state.user = payload
		}
	},
	actions:{
		async registerUser({commit}, {email, password}){
			console.log(email);
			commit('clearError')
			commit('setLoading',true)
			try {
				//done logic
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        		commit('setUser', new User(user.user.uid));
				commit('setLoading', false)
			}catch(error){
				commit('setLoading', false)
				commit('setError',error.message)
				throw error;
			}
		},
		async loginUser({commit}, {email, password}){
			commit('clearError')
			commit('setLoading',true)
			try {
				//done logic
				const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        		commit('setUser', new User(user.user.uid))
				commit('setLoading', false)
			}catch(error){
				commit('setLoading', false)
				commit('setError',error.message)
				throw error;
			}
		}

	},
	getters:{
		user(state){
			return state.user
		},
		checkUser(state){
			return state.user !== null
		}
	}
}