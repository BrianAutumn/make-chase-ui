<template>
<v-container>
  <v-row>
    <v-col>
      Hello!
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <GoogleLogin @login="login"/>
    </v-col>
  </v-row>
  <v-row v-show="loginFail">
    <v-col>
      Login Failed!!!
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import GoogleLogin from "@/components/GoogleLogin";
import {mapState} from "vuex";
export default {
  name: "LoginPage",
  components: {GoogleLogin},
  data(){
    return {
      loginFail:false
    }
  },
  methods:{
    login(result){
      if(result){
        console.log((this.loginDestination && {...this.loginDestination}) || {name:'DefaultPageAuth'})
        this.$router.push((this.loginDestination && {...this.loginDestination}) || {name:'DefaultPageAuth'})
      }else{
        this.loginFail = true;
      }
    }
  },
  computed:{
    ...mapState(['loginDestination'])
  }
}
</script>

<style scoped>

</style>