<template>
  <div class="videotree-container">
    <el-tree show-checkbox
             default-expand-all
             node-key="nodeGuid"             
             :data="treeData"
             :props="defaultProps"
             @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  export default {
    name: 'videotree',
    components: {
    },
    props: {
      treeData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        defaultProps: {
          label: 'title',
          children: 'children'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        var nodeId = data.nodeGuid;
        var host = data.host;
        var port = data.port;
      }
    }
  }
</script>

<style scoped>
  .videotree-container{
    position: relative;
    width: 100%;
    height: 100% !important;
  }
</style>
