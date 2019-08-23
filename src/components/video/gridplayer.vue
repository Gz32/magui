<template>
  <div class="grid-container">
    <grid-layout :layout="layoutData" 
                 :col-num="colNum"
                 :row-height="rowHeight"        
                 :is-draggable="false"
                 :is-resizable="false"
                 :autoSize="true"        
                 :margin="[1, 1]"
                 :use-css-transforms="true">
      <grid-item v-for="(item,index) in layoutData" :key="index"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i">{{index}}</grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout'

  export default {
    name: '',
    components: {
    },
    props: {
      layoutType: {
        type: String,
        default: '3x3'
      }     
    },
    data() {
      return {
        colNum: 3,
        rowHeight: 200,
        layoutData: [
	    {"x":0,"y":0,"w":1,"h":1,i: 0},
        {"x":1,"y":0,"w":1,"h":1,i: 1},
        {"x":2,"y":0,"w":1,"h":1,i: 2},
	    {"x":0,"y":1,"w":1,"h":1,i: 3},
        {"x":1,"y":1,"w":1,"h":1,i: 4},
        {"x":2,"y":1,"w":1,"h":1,i: 5},
        {"x":0,"y":2,"w":1,"h":1,i: 6},
        {"x":1,"y":2,"w":1,"h":1,i: 7},
        {"x":2,"y":2,"w":1,"h":1,i: 8}
	    ]
      }
    },
    watch: {
      layoutType: function (val) {
        this.colNum = 3;
        this.rowHeight = 200;
        if (val === '3x3') {
          this.layoutData = [
	    {"x":0,"y":0,"w":1,"h":1,i: 0},
        {"x":1,"y":0,"w":1,"h":1,i: 1},
        {"x":2,"y":0,"w":1,"h":1,i: 2},
	    {"x":0,"y":1,"w":1,"h":1,i: 3},
        {"x":1,"y":1,"w":1,"h":1,i: 4},
        {"x":2,"y":1,"w":1,"h":1,i: 5},
        {"x":0,"y":2,"w":1,"h":1,i: 6},
        {"x":1,"y":2,"w":1,"h":1,i: 7},
        {"x":2,"y":2,"w":1,"h":1,i: 8}
	    ];
        } else if (val === '2x3') {
          this.layoutData = [
	    {x:0,y:0,w:2,h:2,i: 0},
        {x:2,y:0,w:1,h:1,i: 1},
	    {x:2,y:1,w:1,h:1,i: 2},        
        {x:0,y:2,w:1,h:1,i: 3},
        {x:1,y:2,w:1,h:1,i: 4},
        {x:2,y:2,w:1,h:1,i: 5}
	    ];
        } else if (val === '2x4') {
          this.colNum = 4;
          this.rowHeight = 150;
          this.layoutData = [
	    {"x":0,"y":0,"w":3,"h":3,i: 0},
        {"x":3,"y":0,"w":1,"h":1,i: 1},
	    {"x":3,"y":1,"w":1,"h":1,i: 2},
        {"x":3,"y":2,"w":1,"h":1,i: 3},        
        {"x":0,"y":3,"w":1,"h":1,i: 4},
        {"x":1,"y":3,"w":1,"h":1,i: 5},
        {"x":2,"y":3,"w":1,"h":1,i: 6},
        {"x":3,"y":3,"w":1,"h":1,i: 7}
	    ];
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .grid-container{
    position: relative;
    height: 100%;
  }
  .vue-grid-item{
    border: 1px solid #000
  }
</style>