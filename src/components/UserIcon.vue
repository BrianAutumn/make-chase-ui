<template>
  <div class="user-text">
    {{me?.displayName?.charAt(0)}}
  </div>
  <User class="user-background"/>
</template>

<script>
import {QUERY_ME} from "@/graphql/queries";
import User from "@/assets/icons/user.svg"

export default {
  name: "UserIcon",
  components:{User},
  apollo: {
    me: {
      query: QUERY_ME
    }
  }
}
</script>

<style scoped>
.user-background {
  width: 150px;
  height: 150px;
}

.user-text {
  color:#e31313;
  position: absolute;
  font-family: 'Rock Salt', cursive;
  font-size: 25px;
  font-weight: bold;
}
</style>