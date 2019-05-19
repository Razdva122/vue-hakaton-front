<template>
	<div class="content-wrapper">
		<section>
			<div class="container">
				<h1 class="ui-title-1">
					Мои питомцы.
				</h1>
				<h2 class="ui-title-2">
					Добавить нового питомца.
				</h2>
				<input type="text" placeholder="Имя питомца" v-model="petTitle" @keyup.enter="newPet">
				<input type="text" placeholder="Вид животного" v-model="type" @keyup.enter="newPet">
				<input type="text" placeholder="Порода вашего животного" v-model="breed" @keyup.enter="newPet">
				<div class="quality-list">
					<span>Качества питомца:</span>
					<div class="pet-list pet-list--add">
						<div class="ui-pet_wrapper" @click="addQualityShow=!addQualityShow"  style="width: 200px; margin-bottom: 10px">
							<div class="ui-tag">
								<span class="pet-title">
									Добавить новое
								</span>
								<span class="button-close" :class="{active:!addQualityShow}">
									
								</span>
							</div>
						</div>
					</div>
					<div class="pet-list pet-list--menu" v-if="addQualityShow">
						<input type="text" placeholder="Новое качество" v-model="qualityTitle" class="pet-add--input" @keyup.enter="newQuality">	
						<button class="button-default" @click="newQuality">Добавить</button>	
					</div>
					<div class="ui-tag__wrapper" v-for="qua in quality" :key="qua.string">
					  <div class="ui-tag"><span class="tag-title">{{qua.string}}</span><span class="button-close" @click="destroyQuality(qua.string)"></span></div>
					</div>
				</div>
				<div class="button-list">
					<div class="button button--round button-primary" @click="newPet">Добавить питомца</div>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
export default{
	data(){
		return {
			addQualityShow:false,
			petTitle:'',
			taskId: Math.random()*1000,
			type:'',
			qualityTitle: '',
			breed:'',
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
			]
		}
	},
	methods:{
		newQuality(){
			if(!this.qualityTitle){
				return
			}
			if(this.quality.findIndex(x => x.string == this.qualityTitle) != -1) {
                return;
            }
			const qua = {
				string: this.qualityTitle
			}
			this.quality.push(qua);

		},
		destroyQuality(string){
            var target = this.quality.findIndex(x => x.string == string);
            this.quality.splice(target, 1);
        },
		newPet(){
			if(!this.petTitle){
				return
			}
			const pet =	{
				id: this.taskId,
				name: this.petTitle,
				type: this.type,
				breed: this.breed,
				quality: this.quality,
				missing: false
			}
			this.$store.dispatch('newPet',pet);
			//reset
			this.petTitle='',
			this.type='',
			this.breed='',
			this.quality=[]
		},
		deleteQuality(){
			console.log(this)
		}
	}
}
</script>

<style scoped>
.ui-tag .button-close.active{
	transform: rotate(45deg);
}

.pet-list--menu{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.button.button--round.button-primary{
	margin-top: 15px;
}
</style>