<template>
  <div>
    <v-card class="action-card" :style="cssVars">
      <v-card-text>
        <v-btn @click="submit">
          Move Here
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "ActionCard",
  props:{
    coords:{
      type:Object,
      default:() => {return {x:0,y:0}}
    },
  },
  methods:{
    submit(){
      this.$emit('submit')
    },
  },
  computed:{
    cssVars(){
      return {
        '--x': `${this.coords.x}px`,
        '--y': `${this.coords.y}px`
      }
    }
  }
}
</script>

<style scoped>
.action-card {
  position: fixed;
  left: var(--x);
  top: var(--y);
  z-index: 100;
  width: fit-content;
}

.container {
  width: 100%;
  height: 100%;
}
</style>