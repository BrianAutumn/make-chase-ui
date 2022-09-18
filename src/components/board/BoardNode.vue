<template>
  <g :class="{'selectable-node':selectable,'non-selectable-node':!selectable}" @click="selected">
    <circle :cx="node.x" :cy="node.y" r="3" fill="white"/>
    <circle :cx="node.x" :cy="node.y" r="2" :class="nodeClass"/>
    <text :x="node.x" :y="node.y" :class="labelClass">{{ node.label }}</text>
  </g>
</template>

<script>

const SELECTABLE = ['AVAILABLE', 'SELECTED']

export default {
  name: "BoardNode",
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  methods: {
    selected() {
      if (this.selectable) {
        this.$emit('selected', this.node)
      }
    }
  },
  computed: {
    labelClass() {
      return [`label-${this.node.state.toLowerCase()}`, 'text-label']
    },
    nodeClass() {
      return [`node-${this.node.state.toLowerCase()}`]
    },
    selectable() {
      return SELECTABLE.includes(this.node.state)
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

.label-normal {
  fill: whitesmoke;
}

.label-selected {
  fill: black;
}

.label-available {
  fill: whitesmoke;
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

.node-committed {
  fill: limegreen;
}

.text-label {
  font-size: 2px;
  text-anchor: middle;
  dominant-baseline: central;
}
</style>