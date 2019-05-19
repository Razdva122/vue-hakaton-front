import store from'../store'
import Vue from 'vue'
import Router from 'vue-router'
import Uimini from 'uimini/dist/css/uimini.css'
import Home from '@/components/Home'
import Pet from '@/components/Pet'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'


Vue.use(Uimini)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/',
  		name: 'home',
  		component: Home,
      beforeEnter(to,from,next){
        if(store.getters.checkUser){
          next()
        }else{
          next('/login')
          alert('Войдите на сайт!')
        }
      }
  	},
  	{
  		path: '/pet',
  		name: 'pet',
  		component: Pet,
      beforeEnter(to,from,next){
        if(store.getters.checkUser){
          next()
        }else{
          next('/login')
          alert('Войдите на сайт!')
        }
      }
  	},
  	{
  		path: '/login',
  		name: 'login',
  		component: Login,
      beforeEnter(to,from,next){
        if(store.getters.checkUser){
          next('/')
          alert('Вы уже вошли!')
        }else{
          next()
        }
      }
  	},
  	{
  		path: '/registration',
  		name: 'registration',
  		component: Registration,
      beforeEnter(to,from,next){
        if(store.getters.checkUser){
          next('/')
          alert('Вы уже вошли!')
        }else{
          next()
        }
      }
  	},
  ]
})
