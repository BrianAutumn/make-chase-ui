<template>
  <div class="top-bar">
    <MakeChaseLogo class="logo"/>
    <span class="logo-text">Make Chase</span>
    <div class="spacer"/>
    <UserProfile />
  </div>
</template>

<script>
import MakeChaseLogo from '@/assets/make-chase-logo.svg'
import UserProfile from "@/components/UserProfile";

export default {
  name: "HeaderBar",
  components:{UserProfile, MakeChaseLogo}
}
</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  border: #cb9e57 solid 1px;
}

.logo-text {
  font-family: 'Rock Salt', cursive;
  font-size: 3em;
  color: #e31313;
  cursor:default;
}

.top-bar {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: #cb9e57 solid 1px;
}

.spacer {
  flex-grow: 1;
  min-width: 60px;
}
</style>