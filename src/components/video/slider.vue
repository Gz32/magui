<template>
  <div class="slider-container">
    <range-slider class="slider" 
                  v-model="sliderValue" 
                  :min="minValue" 
                  :max="maxValue" 
                  :step="step" ></range-slider>
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
      step: {
        type: Number,
        default: 1,
      }
    },
    data() {
      return {
        sliderValue: 1
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .slider {
    /* overwrite slider styles */
    width: 100px;
  }
</style>
