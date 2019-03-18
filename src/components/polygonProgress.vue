<template>
  <svg height="125px" width="125px" x-mlns="http://www.w3.org/200/svg">
    <defs>
    </defs>
    <polygon points="10 0,0 10,20 10" fill="red" stroke="#000000" stroke-width="1"/>
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
