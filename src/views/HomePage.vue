<template>
  <MainFrame>
    <div class="home-container">
      <v-btn @click="gamesButton">
        Games
      </v-btn>
      <router-link :to="{name:'Privacy'}">Privacy Notice</router-link>
      <router-link :to="{name:'Terms'}">Terms of Service Notice</router-link>
    </div>
  </MainFrame>
</template>

<script>
import MainFrame from "@/components/MainFrame";
export default {
  name: "HomePage",
  components: {MainFrame},
  methods:{
    gamesButton(){
      this.$router.push({name:'GameBrowser'})
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:10px;
  padding:3px;
}
</style>