<template>
  <g :class="{'selectable':selectable,'non-selectable':!selectable}" @click="selected">
    <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" stroke="white" stroke-width="2"/>
    <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" :class="connectionClass" stroke-width="0.5"/>
  </g>
</template>

<script>
const SELECTABLE = ['AVAILABLE', 'SELECTED']

export default {
  name: "BoardConnection",
  props: {
    nodes: {
      type: Array,
      required: true
    },
    connection: {
      type: Object,
      required: true
    }
  },
  methods: {
    selected() {
      if (this.selectable) {
        this.$emit('selected', this.connection)
      }
    }
  },
  computed: {
    from() {
      return this.nodes.find(node => node.label === this.connection.nodes[0])
    },
    to() {
      return this.nodes.find(node => node.label === this.connection.nodes[1])
    },
    connectionClass() {
      return [`connection-${this.connection.state.toLowerCase()}`]
    },
    selectable() {
      return SELECTABLE.includes(this.connection.state)
    }
  }
}
</script>

<style scoped>
.selectable {
  cursor: pointer;
}

.non-selectable {
  cursor: default;
}

.connection-normal {
  stroke: black;
}

.connection-selected {
  stroke: yellow;
}

.connection-available {
  stroke: blue;
}

.connection-committed {
  stroke: limegreen;
}
</style>