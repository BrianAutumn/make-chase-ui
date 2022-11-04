<template>
  <MainFrame>
    <v-container class="home-content">
      <v-row>
        <v-col>
          <router-link :to="{name:'GameBrowser'}">Games</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="{name:'Privacy'}">Privacy Notice</router-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <router-link :to="{name:'Terms'}">Terms of Service Notice</router-link>
        </v-col>
      </v-row>
    </v-container>
  </MainFrame>
</template>

<script>
import MainFrame from "@/components/MainFrame";
export default {
  name: "HomePage",
  components: {MainFrame}
}
</script>

<style scoped>
.home-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>