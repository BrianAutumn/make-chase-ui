<template>
  <MainFrame>
    <div class="login-content">
      <GoogleLogin/>
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
        console.log((this.loginDestination && {...this.loginDestination}) || {name: 'DefaultPageAuth'})
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