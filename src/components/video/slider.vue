<template>
  <div class="slider-container">    
    <range-slider class="slider" :style="{ width: sliderWidth + 'px' }"
                  v-model="sliderValue" 
                  :min="min" 
                  :max="max" 
                  :step="step" @change="valueChanged"></range-slider>
    <input class="slider-input" type="text" 
           v-show="showInput" 
           :value="sliderValue" />
  </div>
</template>

<script>
  import RangeSlider from 'vue-range-slider'
  import '@/assets/css/vue-range-slider.css'

  export default {
    name: 'vSlider',  // 滑块组件
    components: {
      RangeSlider
    },
    props: {
      min: {
        type: Number,
        default: 1,
      },
      max: {
        type: Number,
        default: 100,
      },
      step: {
        type: Number,
        default: 1,
      },
      showInput: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sliderWidth: 100,
        sliderValue: 1
      }
    },
    watch: {
      showInput: function(val) {
        //this.sliderWidth = val ? 100 : 100;
      }
    },
    methods: {
      valueChanged(val) {
        this.$emit('valueChanged', val);    
      }
    }
  }
</script>

<style scoped>
  .slider-container{
    position: relative;
    display: flex;
  }
  .slider-input{
    width: 22px;
    border: none;
    background: none;
    margin-top: 1px;
  }
</style>
