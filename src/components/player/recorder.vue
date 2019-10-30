<template>
  <div class="recorder-container">
    <div class="recorder-content">
      <video-player></video-player>
    </div>
  </div>
</template>

<script>
  import videoPlayer from './videoPlayer'

  export default {
    name: 'vRecorder',    
    components: {
      videoPlayer
    },
    props: {
      videoUrl: String
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .recorder-container{
    position: relative;
    height: 100%;
    background: #000;
  }
  .recorder-content{
    width: 100%;
    height: 100%;
  }
</style>