<template>
  <g :class="[{'selectable-node':selectable,'non-selectable-node':!selectable},'no-pan']" @click="onClick" @touchend="onClick" @touchstart="onTouchStart">
    <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
    <circle :cx="node.x" :cy="node.y" r="2" :class="nodeClass"/>
  </g>
</template>

<script>
export default {
  name: "BoardNode",
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick(e) {
      if (this.selectable) {
        this.$emit('selected', this.node)
        e.stopPropagation();
      }
    },
    onTouchStart(e){
      if(this.selectable){
        e.stopPropagation();
      }
    }
  },
  computed: {
    nodeClass() {
      let classes = [];
      for(let state of this.node.state){
        classes.push(`node-${state.toLowerCase()}`)
      }
      return classes
    },
    selectable() {
      return this.node.state.includes('SELECTABLE')
    }
  }
}
</script>

<style scoped>
.selectable-node {
  cursor: pointer;
}

.non-selectable-node {
  cursor: default;
}

.node-normal {
  fill: black;
}

.node-selected {
  fill: yellow;
}

.node-available {
  fill: blue;
}

.node-moving {
  fill: limegreen;
}

.node-blocking {
  fill: red;
}

.node-blocked {
  fill: lightgray;
}

.text-label {
  font-size: 2px;
  text-anchor: middle;
  dominant-baseline: central;
}
</style>