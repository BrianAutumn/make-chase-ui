<template>
  <MainFrame>
    <div class="login-content">
      <GoogleLogin v-if="!loginFail" @login="login"/>
      <p class="login-error" v-else>Sorry! Could not log you in!</p>
    </div>
  </MainFrame>
</template>

<script>
import {mapState} from "vuex";
import MainFrame from "@/components/MainFrame";
import GoogleLogin from "@/components/GoogleLogin";

export default {
  name: "LoginPage",
  components: {GoogleLogin, MainFrame},
  data() {
    return {
      loginFail: false
    }
  },
  methods: {
    login(result) {
      if (result) {
        this.$router.push((this.loginDestination && {...this.loginDestination}) || {name: 'DefaultPageAuth'})
      } else {
        this.loginFail = true;
      }
    }
  },
  computed: {
    ...mapState(['loginDestination'])
  }
}
</script>

<style scoped>
.login-content {
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top:20px;
  padding-bottom:20px;
}
</style>