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
import store from '../store/index'
import state from '../store/module-example/state'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      token:null,
      login:null,
      password:null,
      leftDrawerOpen: false,
      
    }
  },
  methods:{
    onSubmit () {
      const url = 'http://127.0.0.1:8000/auth/token/login'
      let data2 = {
        password:this.password,
        username:this.login
      }
      let data = JSON.stringify(data2)
      console.log(data)
      fetch(url, {
        method:'POST',
        body:data,
        headers:{'content-type':'application/json'}
      }).then(function(response){
        return response.json()
      }).then(function(data){
        console.log(data)
        MutationEvent:{
          SET_TOKEN: (state, data) => {
            state.token = data
          }
        }
         let a = this.$store.state.token
        let set = function(data){
          $store.commit('auth/set_token', val)
        }
      })
    }
  },

}
</script>
