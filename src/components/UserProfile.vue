<template>
  <div class="user-icon elevation-3">
    <UserIcon v-if="loggedIn" />
  </div>
</template>

<script>
import {mapState} from "vuex";
import UserIcon from "@/components/UserIcon";
export default {
  name: "UserProfile",
  components:{UserIcon},
  computed:{
    ...mapState(['loggedIn'])
  }
}
</script>

<style scoped>
.user-icon {
  border-radius: 50%;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  overflow: hidden;
  fill:darkslategrey;
  cursor: default;
}
</style>