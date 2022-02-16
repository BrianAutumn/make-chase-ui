<template>
  <div id="buttonDiv" />
</template>

<script>
import {appConf} from "@/appConf";

export default {
  name: "GoogleLogin",
  mounted() {
    // eslint-disable-next-line
    google.accounts.id.initialize({
      client_id: appConf.google.clientId,
      callback: this.login
    });
    // eslint-disable-next-line
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  },
  methods:{
    login(jwt){
      console.log('JWT',jwt)
      this.$store.dispatch('login',jwt)
    }
  }
}
</script>

<style scoped>

</style>