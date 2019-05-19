<template>
  <div class="content-wrapper">

      <div class="container">
      	<header>
	        <h1 class="ui-title-1">
	        	Pets
	        </h1>
	        <div class="buttons-list" style="margin-bottom: 10px">
	        	<div class="button button--round button-default" @click="filter = 'all'" :class="{'button-light': allComp}">Все</div>
	        	<div class="button button--round button-default" @click="filter = 'miss'" :class="{'button-light': missComp}">Потерянные</div>
	        	<div class="button button--round button-default" @click="filter = 'home'" :class="{'button-light': homeComp}">Дома</div>
	        </div>
        </header>
        	<div class="inputs">
               
                <h3>Поиск по имени:</h3>
                <input type="text" v-model="filter_name">
                
                <h3>Поиск по виду:</h3>
                <select v-model="filter_type" @change="sel(filter_type)">
                    <option value="">Любой</option>
                    <option v-for="type in types" :value="type.name">{{ type.title }}</option>
                </select>
                
                <div v-if="filter_type">
                    <h3>Поиск по породе:</h3>
                    <select v-model="filter_breed">
                        <option value="">Любая</option>
                        <option v-for="breed in breeds_selected">{{ breed }}</option>
                    </select>
                </div>
                
            </div>
				<div class="pets-list">
					<div class="pet-item" v-for="pet in petsFilter" :key="pet.id" :class="{atHome: !pet.missing}" v-if="condition(pet.name, filter_name) 
                   && condition(pet.type, filter_type)
                   && condition(pet.breed, filter_breed)">
						<div class="ui-card ui-card--shadow">
							<div class="pet-item__info">
								<div class="pet-item__main-info">
									<span class="ui-label ui-label--light">{{pet.type}}</span>
									<span>{{pet.breed}}</span>
								</div>
								<span class="button-close" @click="destroyPet(pet.id)"></span>
							</div>
							<div class="pet-item_content">
								<span class="ui-title-3">
										<span>{{pet.name}}</span>
								</span>
							</div>
							<div class="pet-item__main">
								<div>
									<p class="ui-text-regular" v-for="quality in pet.quality">
										{{quality.string}}
									</p>
								</div>
								<button class="button button-warning" v-if="!pet.missing" @click="pet.missing=!pet.missing">Потерялся</button>
								<button class="button button-success" v-if="pet.missing" @click="pet.missing=!pet.missing">Нашелся</button>
							</div>
							<div :class="{showMapNone: !pet.missing}">
								<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A57216c28dba6fdf11c3b4d871834589c36c7f42b26a8d2750261a4c32c859273&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
  	return{
  		filter: 'all',
  		filter_name: "",
        filter_type: "",
        filter_breed: "",
        breeds_selected: [],
        types: [],
        breeds: []
  	}
  },
  computed:{
  	petsFilter(){
  		if(this.filter==='all'){
  			return this.$store.getters.pets
  		}else if(this.filter==='miss'){
  			return this.$store.getters.petsMiss
  		}else if(this.filter==='home'){
  			return this.$store.getters.petsHome
  		}
  	},
  	allComp(){
  		return this.filter==='all';
  	},
  	homeComp(){
  		return this.filter==='home';
  	},
  	missComp(){
  		return this.filter==='miss';
  	},
  },
  methods: {
        condition: function (name, filter) {
            return name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        },
        sel: function(group) {
        	this.filter_breed = "";
            var that = this;
            this.breeds.forEach(function(element){
                console.log( element.name + " and " + that.filter_type );
                if ( element.name == that.filter_type ) {
                    that.breeds_selected = element.breeds;
                }
            })
        },
        destroyPet: function(id) {
            this.$store.dispatch('destroyPet', id);
        }
    },
    mounted: function() {
        this.types = this.$store.getters.types;
        this.breeds = this.$store.getters.breeds;
    }
}
</script>

<style scoped>
header{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.showMapNone{
	display: none;
}
.pet-item{
	margin-bottom: 20px;
}
.pet-item:last-child{
	margin-bottom: 0;
}
.ui-label{
 	margin-right: 8px;
}
.pet-item__info{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}
.pet-item__main{
	display: flex;
	justify-content: space-between;
}
.pet-item__info .button-close{
	width: 20px;
	height: 20px;
}
.pet-item__main button{
	height: 40px;
}

</style>