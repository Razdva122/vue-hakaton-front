<template>
	<div class="content-wrapper">
		<section>
			<div class="container">
				<div class="auth">
					<div class="auth__banner">
						<h1 class="ui-title-2">
							Hello Banner
						</h1>
					</div>
					<div class="auth__form">
						<span class="ui-title-2">
							Регистрация
						</span>
						<form @submit.prevent="onSubmit">
							<div class="form-item" :class="{ errorInput: $v.email.$error }">
								<input type="email" placeholder="Email" v-model="email" :class="{ error: $v.email.$error }" @change="$v.email.$touch()">
								<div class="error" v-if="!$v.email.required">Поле обязательно</div>
								<div class="error" v-if="!$v.email.email">Email не корректен</div>
							</div>
							<div class="form-item">
								<input type="text" placeholder="Имя" v-model="name" >
							</div>
							<div class="form-item" :class="{ errorInput: $v.password.$error }">
								<input type="password" placeholder="Пароль" v-model="password" :class="{ error: $v.password.$error }" @change="$v.password.$touch()">
								<div class="error" v-if="!$v.password.required">Поле обязательно</div>
								<div class="error" v-if="!$v.password.minLength">Поле не может быть меньше 6 символов</div>
							</div>
							<div class="form-item" :class="{ errorInput: $v.repeatPassword.$error }">
								<input type="password" placeholder="Повторите ваш пароль" v-model="repeatPassword" :class="{ error: $v.repeatPassword.$error }" @change="$v.repeatPassword.$touch()">
								<div class="error" v-if="!$v.repeatPassword.sameAsPassword">Пароли не совпадают</div>
							</div>
							<div class="form-item" :class="{ errorInput: $v.number.$error }">
								<input type="number" placeholder="Ваш номер телефона" v-model="number" :class="{ error: $v.number.$error }" @change="$v.number.$touch()">
								<div class="error" v-if="!$v.repeatPassword.required">Поле обязательно</div>
							</div>
							<div class="form-item">
								<input type="text" placeholder="Город" v-model="city" >
							</div>
							<div class="form-item">
								<input type="text" placeholder="Адрес" v-model="address" >
							</div>
							<div class="buttons-list">
								<button class="button button-primary" type="submit">
									<span v-if="loading">Loading...</span>
									<span>Registration</span>
								</button>
							<div class="buttons-list button-list--info">
								<p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
								<p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
								<p class="typo__p" v-else>{{submitStatus}}</p>
							</div> 
							<div class="buttons-list button-list--info"> 
								<span>У вас уже есть аккаунт? <router-link to="/login">Войти</router-link></span>
							</div> 
							</div>
						</form>
					</div>
				</div>
				
			</div>
		</section>
	</div>
</template>

<script>
	import { required,email,minLength,sameAs} from 'vuelidate/lib/validators'
	export default{
		data(){
			return {
				email: '',
				name: '',
				password: '',
				repeatPassword: '',
				number: '',
				city:'',
				address:'',
				submitStatus: null
			}
		},
		validations:{
			email:{
				required,
				email
			},
			password:{
				required,
				minLength: minLength(6)
			},
			repeatPassword:{
				sameAsPassword: sameAs('password')
			},
			number:{
				required
			}
		},
		methods: {
		    onSubmit() {
		      this.$v.$touch()
		      if (this.$v.$invalid) {
		        this.submitStatus = 'ERROR'
		      } else {
		      	const user = {
		      		email: this.email,
		      		password: this.password,
		      	}
		      	console.log(user);
		      	this.$store.dispatch('registerUser', user)
		      		.then(()=>{
		      			console.log('Register!')
		      			this.submitStatus='OK'
		      			this.$router.push('/')
		      		})
		      		.catch(err=>{
		      			this.submitStatus = err.message
		      		})
		        // do your submit logic here

		      }
		    }
		},
		computed: {
			loading () {
				return this.$store.getters.loading
			}
		}
	}
</script>

<style>
.auth{
	display: flex;
}
.auth__banner,.auth__form{
	width: 50%;
}
.form-item .error {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #fc5c65;
}
.form-item.errorInput .error {
  display: block;
}
input.error{
	border-color: #fc5c65;
}
.buttons-list{
	text-align: right;
	margin-bottom: 20px;
}
.buttons-list.button-list--info{
	text-align: center;
}

a{
	color:#444ce0;
}


	
</style>