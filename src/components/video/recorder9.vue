<template>
  <div class="recorder9-container">
    <div class="recorder9-item" 
         :class="currSelect==item.guid?'opacity':''"
         v-for="(item,index) in list" 
         :key="index" @click="select(index)"></div>
  </div>
</template>

<script>
  export default {
    name: 'vRecorder9',
    components: {
    },
    props: { 
    },
    data() {
      return {
        currSelect: '11',
        list:[{guid: '11',title: '11'},{guid: '12',title: '12'},{guid: '13',title: '13'},
              {guid: '21',title: '21'},{guid: '22',title: '22'},{guid: '23',title: '23'},
              {guid: '31',title: '31'},{guid: '32',title: '32'},{guid: '33',title: '33'}]
      }
    },
    methods: {
      select(index) {
        this.currSelect = this.list[index].guid;
      }
    }
  }
</script>

<style scoped>
  .recorder9-container{
    position: relative;
    height: 100%; 
    display: flex;    
    flex-wrap: wrap;
  }
  .recorder9-item{
    display: flex;    
    width: 33%;
    height: 33%;
    margin: 1px;
    background-color: #000;
  }
  .opacity{
    opacity: 0.4;
    background: #3d0f0f;
  }

</style>
