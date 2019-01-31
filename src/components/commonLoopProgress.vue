<template>
  <svg :height="option.size" :width="option.size" x-mlns="http://www.w3.org/200/svg">
    <defs>
                 
      <linearGradient :id="option.gradualId" x1="100%" y1="100%" x2="100%" y2="30%">         
        <stop offset="40%"   :stop-color="option.innerColor"/>
        <stop offset="100%"  :stop-color="option.toInnerColor?option.toInnerColor:option.innerColor"/>
      </linearGradient>
             
    </defs>
    <circle
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke="option.outerColor"
      :stroke-width="option.strokeWidth"
      fill="none"
      stroke-linecap="round"/>
    <circle
      id="progressRound"
      :stroke-dasharray="completenessHandle"
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke-width="option.strokeWidth"
      :stroke="`url(#${option.gradualId})`"
      :stroke-linecap="option.strokeLinecap"
      fill="none"
      class="progressRound"
    />
  </svg>
</template>
<script>
  export default {
    name: 'CommonLoopProgress',
    props: {
      completeness: {
        type: Number,
        required: true,
        default: 0
      },
      progressOption: {
        type: Object,
        default: () => {
        },
      },
    },
    data() {
      return {}
    },
    computed: {
      completenessHandle() {
        let circleLength = Math.floor(2 * Math.PI * this.option.radius);
        let val = parseFloat(this.completeness / this.option.max).toFixed(2);
        console.log(val);
        val = Math.max(this.option.min, val);
        val = Math.min(this.option.max, val);
        return `${val * 100 * circleLength / 100},10000`
      },
      option() {
        // 所有进度条的可配置项
        let num = parseInt(Math.random() * (101) + 1, 10);
        let baseOption = {
          radius: 50, //半径
          strokeWidth: 5, //border宽度
          outerColor: '#E6E6E6',
          innerColor: '#FFDE00',
          max: 100,
          min: 0,
          gradualId: 'svg_' + num,
          strokeLinecap: 'round'
        };
        Object.assign(baseOption, this.progressOption);
        // 中心位置自动生成
        baseOption.cy = baseOption.cx = baseOption.radius + baseOption.strokeWidth / 2;
        baseOption.size = (baseOption.radius + baseOption.strokeWidth / 2) * 2;
        return baseOption
      },
    },
  }
</script>
<style scoped>
  .progressRound {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dasharray 1s ease-in;
  }
</style>
