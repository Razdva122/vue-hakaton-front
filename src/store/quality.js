export default{
	state:{
		quality: [
				{
					string: 'серенький'
				},
				{
					string: 'пушистый'
				},
				{
					string: 'фиолетовый'
				},
			],
	},
	mutations:{

	},
	actions:{

	},
	getters:{
		quality(state){
			return state.quality
		}
	}
}