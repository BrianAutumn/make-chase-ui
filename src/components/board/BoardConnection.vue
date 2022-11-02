<template>
  <g :class="{'selectable':selectable,'non-selectable':!selectable}" @click="onClick" @touchend="onClick" @touchstart="touchFix" @touchmove="touchFix">
    <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" stroke="white" stroke-width="2"/>
    <line :x1="from.x" :y1="from.y" :x2="to.x" :y2="to.y" :class="connectionClass" stroke-width="0.5"/>
  </g>
</template>

<script>
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
    onClick() {
      if (this.selectable) {
        this.$emit('selected', this.connection)
      }
    },
    touchFix(e){
      if(this.selectable && !this.selected){
        e.stopPropagation();
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
      let classes = [];
      for(let state of this.connection.state){
        classes.push(`connection-${state.toLowerCase()}`)
      }
      return classes
    },
    selectable() {
      return this.connection.state.includes('SELECTABLE')
    },
    selected() {
      return this.connection.state.includes('SELECTED')
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

.connection-moving {
  stroke: limegreen;
}

.connection-blocked {
  stroke: lightgray;
}

.connection-blocking {
  stroke: red;
}
</style>