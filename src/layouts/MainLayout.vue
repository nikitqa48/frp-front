<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
     <q-form
      @submit="onSubmit"
      class="fixed-center"
    >

    <div class="form_button">
    <q-btn 
    :dense=true
    flat round color="black" icon="close" @click="show=!show"/>
    </div>
    <div class="form_container">
          <h2 class="left-top">
      Связаться с нами
    </h2>
    <hr class="border_bottom">
   <div class="form_inside">
     <div class="inside">
        <q-input
        v-model="login"
        label-color = 'black'
        class="input"
        
        label="Логин *"
 
      />
      <q-input
        v-model="password"
        class="input_right"
        type="password"
        label-color = 'black'
        label="Пароль *"
      
      />
     </div>
  
      
   </div>
   </div>
      <div>
        <q-btn label="Отправить" type="submit" color="primary"/>
        <div @click="fe" class='black'> 123123 </div>
      </div>
    </q-form>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import Axios from 'axios'
export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      header:null,
      login:null,
      password:null,
      leftDrawerOpen: false,
    }
  },
  created(){

  },
  methods:{
    onSubmit () {
      console.log(localStorage.auth_token)
      const url = 'http://127.0.0.1:8000/auth/token/login'
      let data2 = {
        password:this.password,
        username:this.login
      }
      let data = JSON.stringify(data2)
    // Форматирую полученные данные в json формат
      fetch(url, {
        method:'POST',
        body:data,
        headers:{
          'content-type':'application/json', 
        }
      }).then(function(response){
        if(response.status == '400'){
          alert('Неверный логин или пароль')
        }
        else {
            return response.json()    
        }

        // Отправляю запрос на сервер
        
      }).then(function(data){
        // Получаю в ответ токен с сервера
          localStorage.setItem('auth_token', data.auth_token)
      })
    },
    fe(){
      console.log('token' +localStorage.auth_token)
    let myHeaders = new Headers();
myHeaders.append("Authorization", "token"+' '+localStorage.auth_token);


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/auth/users/me", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }
  },
  mounted(){

  }
}
</script>
<style scoped>
*{
  color:black;
}
</style>