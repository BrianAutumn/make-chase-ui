<template>
  <div id="buttonDiv" />
</template>

<script>
export default {
  name: "GoogleLogin",
  mounted() {
    // eslint-disable-next-line
    google.accounts.id.initialize({
      client_id: "92116833711-06i78gunp707ht8vla0cdnsft3f1n5ks.apps.googleusercontent.com",
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
    }
  }
}
</script>

<style scoped>

</style>