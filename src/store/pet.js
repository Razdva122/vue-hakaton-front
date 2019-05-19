export default{
	state:{
		pets: [
            { id: 1, type: "dog", name: "Рекс",quality:[{string:'Зеленые глаза'},{string:'милый'}], breed: "Овчарка", image: "ovcharka.jpg", missing: false },
            { id: 2, type: "cat", name: "Мурка",quality:[{string:'Голубые глаза'},{string:'Белая шерсть с черным пятном на спине'}], breed: "Домашняя", image: "cat.jpg", missing: false },
            { id: 3, type: "rat", name: "Лариса",quality:[{string:'Размером с ладошку'},{string:'Любит сыр'}], breed: "Декоративная", image: "rat.jpg", missing: false },
            { id: 4, type: "dog", name: "Колбаса",quality:[{string:'Отзывается на "Колбаска"'}], breed: "Такса", image: "tax.jpg", missing: false },
            { id: 5, type: "cat", name: "Лазанья",quality:[{string:'Очень добрая'},{string:'На ошейнике сердечко'},{string:'Цвет шерсти белый'}], breed: "Британская", image: "britain.jpg", missing: false },
        	],
        types: [ 
            { name: "dog", title: "Собака" },
            { name: "cat", title: "Кошка" },
            { name: "rat", title: "Крыса" },
        ],
        breeds: [
            { name: "dog", breeds: [ "Овчарка", "Такса" ] },
            { name: "cat", breeds: [ "Британская" ] },
            { name: "rat", breeds: [ ] },
        ]
	},
	mutations:{
		newPet(state,payload){
			state.pets.push(payload)
		},
        destroyPet(state,id) {
            var target = state.pets.findIndex(x => x.id == id);
            state.pets.splice(target, 1);
        }
	},
	actions:{
		newPet({commit},payload){
			commit('newPet',payload)
		},
		destroyPet({commit},id){
			commit('destroyPet',id)
		},
	},
	getters:{
		pets (state){
			return state.pets
		},
		petsMiss(state){
			return state.pets.filter(pet=>{
				return pet.missing
			});
		},
		petsHome(state){
			return state.pets.filter(pet=>{
				return !pet.missing
			});
		},
		types (state){
			return state.types
		},
        breeds (state){
			return state.breeds
		},
	}
}