<template>
  <div id="res"></div>
</template>

<script>
export default {
  props: {
    dataSet: Object,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawLine();
  },
  watch: {
    dataSet: function (newValue) {
      this.drawLine();
    },
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("res"));
      // 绘制图表
      myChart.setOption({
        //鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        //图例
        legend: {
          orient: 'vertical',//图例的显示方式  默认横向显示
          x:'right',
          y: "center",
          data: ["False", "True"],
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16,
          },
        },
        //饼图中各模块的颜色
        color: ["#32dadd", "#b6a2de", "#5ab1ef"],
        series: [
          {
            type: "pie",
            radius: "50%", //饼图中饼状部分的大小所占整个父元素的百分比
            center: ["50%", "50%"], //整个饼图在整个父元素中的位置
            data: [
              //每个模块的名字和值
              { name: "False", value: this.dataSet.False },
              { name: "True", value: this.dataSet.True },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              label: {
                show: true, //饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true, //官网demo里外部标注上的小细线的显示隐藏    默认显示
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
#res {
  width: 500px;
  height: 500px;
}
</style>