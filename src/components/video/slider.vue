<template>
  <div class="slider-container">
    <range-slider class="slider" :min="minValue" :max="maxValue" :step="step" v-model="sliderValue"></range-slider>
  </div>
</template>

<script>
  import RangeSlider from 'vue-range-slider'
  import '@/assets/css/vue-range-slider.css'

  export default {
    name: 'vSlider',
    components: {
      RangeSlider
    },
    props: {
      minValue: {
        type: Number,
        default: 1,
      },
      maxValue: {
        type: Number,
        default: 100,
      },
      sliderValue: {
        type: Number,
        default: 1,
      },
      step: {
        type: Number,
        default: 1,
      },

    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
