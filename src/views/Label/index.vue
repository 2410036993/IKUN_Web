<script setup>
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import BgBoard from '@/components/BgBoard.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getLabelAndEchartsList } from '@/api/article'
// eacharts图表
import * as echarts from 'echarts'
const xAxis = ref([])
const yAxis = ref([])
onMounted(async () => {
  window.scrollTo(0, 0);
})
// 初始化echarts
onMounted(async () => {
 // 调用接口获取到数据
 const res = await getLabelAndEchartsList()
  fengLeiList.value = res.data.labelNameList[0]
   xAxis.value = res.data?.echartsNameList[0]
   yAxis.value = res.data?.echartsCountList[0]

  // 图表配置
  let options = {
    title: [{
      text: '文章篇数',
      padding: [10, 0, 0, 70],
      textStyle: {
        fontWeight: 'bold',              // 标题颜色
        color: '#aac9fa',
        fontSize: '13px'
      },
    },
    {
      text: '标签文章篇数Top10统计图',
      left: 'center',
      textStyle: {
        fontWeight: 'bold',              // 标题颜色
        color: '#aac9fa',
        fontSize: '18px'
      },
    }
    ],
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: xAxis.value,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#aac9fa'
          },
          interval: 0,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#aac9fa'
          }
        },
      },
    ],
    series: [
      {
        name: '文章篇数',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#8597b4',
        },
        data: yAxis.value ,
        realtimeSort: true
      }
    ],
  }
  // 实例化图标
  let echart = echarts.init(document.getElementById('myChart'))
  // 绘制图表
  echart.setOption(options)
})

/**
 * Loading效果
 */
const { isLoading } = useLoading()

// 标签效果
const fengLeiList = ref([])

const router = useRouter()

// 点击进入标签页
const onTabs = (item) => {
  router.push(`/allarticle/${item}/${2}`)
}
</script>

<template>
  <Loading :isLoading="isLoading" />
  <BgBoard :title="'标签'" :wengan="'在这里，标签是时光的印记，每一页都充满了生活的色彩与温度'" />
  <div class="fl">
    <div class="flh">
      <el-badge :value="item.labelCount" :show-zero="false" class="item" :offset="[1, 3]" :color="item.color"
        v-for="item in fengLeiList" :key="item">
        <el-button size="large" :color="item.btColor" @click="onTabs(item.labelName)"
          style="border-radius: 10px;width: 98px;color: white;font-weight: bold;text-align: center;opacity: 0.7;"><span
            style="color: #afafaf;margin-right: 3px;"># </span> {{ item.labelName
          }}
        </el-button>
      </el-badge>
    </div>
    <!-- 统计表 -->
    <div id="myChart"></div>
  </div>

</template>

<style lang="scss" scoped>
#myChart {
  margin-top: 30px;
  width: 1000px;
  height: 400px;
}

.fl {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 1030px;
  height: 600px;
  background-color: #626a73;
  border: 1px solid #7992b0;

  .flh {
    margin: 10px;
    width: 980px;
    display: flex;
    flex-wrap: wrap;

    .item {
      margin-top: 16px;
      margin-left: 40px;

      &:nth-child(0) {
        margin-left: 10px;
      }
    }
  }
}
</style>