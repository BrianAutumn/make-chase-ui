<template>
  <div class="user-icon elevation-3">
    <div class="user-text">
      BT
    </div>
    <User class="user-background"/>
  </div>
</template>

<script>
import User from '@/assets/icons/user.svg'

export default {
  name: "UserProfile",
  components:{User}
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