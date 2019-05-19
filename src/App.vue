<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content"><router-link class="header-logo" to="/"><img src="https://i.imgur.com/46Ei6RB.png" alt="" style="height: 60px;"></router-link>
            <div class="button-burger" @click="menuShow =! menuShow" :class="{active: menuShow}"><span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span></div>
            <div class="navbar-list__wrapper" :class="{active: menuShow}">
              <ul class="navbar-list">
                <li class="navbar-item" v-for="link in linkMenu" :key="link.title" @click="menuShow = false" ><router-link class="navbar-link" :to="`${link.url}`">{{link.title}}</router-link> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuShow: false,
      linkMenu:[
        {title:'Add Pet',url:'/'},
        {title:'My pets',url:'/pet'},
        {title:'Login',url:'/login'},
        {title:'Registration',url:'/registration'},
      ]
    }
  }
}
</script>

<style>
#app{
  padding: 30px;
  background-color: #333;
  color: #fff;
}
</style>
