<template>
  <div>
    <v-card class="action-card" :style="cssVars" @touchstart="onTouchStart">
      <v-card-text>
        <v-btn @click="submit">
          {{actionLabel}}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "ActionCard",
  props: {
    coords: {
      type: Object,
      default: () => {
        return {x: 0, y: 0}
      }
    },
    actionLabel: {
      type:String,
      default:'Submit'
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    onTouchStart(e){
      e.stopPropagation();
      e.preventDefault();
    }
  },
  computed: {
    cssVars() {
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