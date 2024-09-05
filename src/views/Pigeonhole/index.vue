<script setup>
import BgBoard from '@/components/BgBoard.vue';
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getPigeonholeListApi, getPagePigeonholeListApi } from '@/api/article'
import { smoothScrollTo} from '@/composables/rollingTransition.js'
// eacharts图表
import * as echarts from 'echarts'
// 路由
const router = useRouter()
/**
 * Loading效果
 */
const { isLoading } = useLoading()
onMounted(() => {
  window.scrollTo(0, 0);
})

/**
 * 图表数据
 */

// 获取数据
const chartDataList = ref({})
onMounted(async () => {
  const res = await getPigeonholeListApi()
  // 获取图标数据
  chartDataList.value = {
    xAxis: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ],
    yAxis: res.data
  }
  // 配置echarts
  let options = {
    title: [{
      text: '文章篇数',
      padding: [10, 0, 0, 70],
      textStyle: {
        fontWeight: 'bold',              //标题颜色
        color: '#aac9fa',
        fontSize: '13px'
      },
    },
    {
      text: '各月份文章发布篇数统计图',
      left: 'center',
      textStyle: {
        fontWeight: 'bold',              //标题颜色
        color: '#aac9fa',
        fontSize: '18px'
      },
    }
    ],
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: chartDataList.value.xAxis,
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
        type: 'line',
        barWidth: '40%',
        itemStyle: {
          barBorderRadius: [5, 5, 0, 0],
          color: '#8597b4',
        },
        data: chartDataList.value.yAxis,
        realtimeSort: true
      }
    ],
  }
  // 实例化图标
  let echart = echarts.init(document.getElementById('myChart'))
  // 绘制图表
  echart.setOption(options)
})
// 分页参数
const pageParams = ref({
  page: 1,
  limit: 6
})
const activities = ref([])
const total = ref(0)
const getPagePigeonholeList = async () => {
  const res = await getPagePigeonholeListApi(pageParams.value)
  total.value = res.data.totalElements
  activities.value = res.data.content
}
onMounted(() => {
  getPagePigeonholeList()
})

const handleCurrentChange = async () => {
  await getPagePigeonholeList()
  // 滚动页面680px的位置过渡时间为400ms
  smoothScrollTo(680,400)
}
// 获取文章详情 
const getArticleDetail = (id) => {
  router.push(`/article/${id}`)
}
</script>

<template>
  <Loading :is-loading="isLoading" />
  <BgBoard :title="'归档'" :wengan="'在这里，时间被细致分类，每一次翻阅，都是与昔日自己的深刻重逢'" />
  <div class="pigeonhole">
    <!-- 统计表 -->
    <div id="myChart"></div>
    <!-- 归档 -->
    <div class="box">
      <h2 style="color: #aac9fa;margin-left: 78px;margin-bottom: 30px;font-family: cursive;">
        <i class="iconfont icon-guidang" style="font-size: 28px;color: #2a343e;"></i>
        文章归档({{ total }})
      </h2>
      <el-timeline class="timeline">
        <el-timeline-item :timestamp="item.createTime" :center="index === 0 ? false : true" placement="top"
          color="#7898b5" v-for="(item, index) in activities" :key="item">
          <div class="card">
            <!-- 图片 -->
            <div class="img-box">
              <img :src="item.cover" alt="">
            </div>
            <!-- 概述 -->
            <div class="gs" @click="getArticleDetail(item.id)">
              <h3>{{ item.title }}</h3>
              <p>{{ item.describe }}</p>
              <div class="tm" style="margin-bottom: 5px;">
                <i class="iconfont icon-fabu" style="font-size: 14px; margin-right: 2px; color: #aac9fa">
                </i>
                <span style="font-size: 14px">最近更新于{{ item.updateTime }}前</span>
              </div>
              <i class="iconfont icon-fenlei" style="color: #efe0ec"> </i>
              <span>{{ item.categoryName }}</span>
              <i class="iconfont icon-biaoqian" style="color: #c7e6f4;margin-left: 7px;"></i>
              <span>{{ item.labelName }}</span>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="fy" style="margin: 10px 0 20px 20px;">
      <el-pagination background layout="prev, pager, next" :default-page-size="pageParams.limit"
        @current-change="handleCurrentChange" v-model:current-page="pageParams.page" :total="total" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#myChart {
  padding-top: 30px;
  width: 1000px;
  height: 430px;
}

.pigeonhole {
  border-radius: 20px;
  margin: 20px auto;
  width: 1030px;
  background-color: #626a73;
  border: 1px solid #aac9fa;

  .fy {
    padding-left: 60px;
    width: 300px;

    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      background-color: #8597b4 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)) {
      background-color: #626a73 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .btn-prev.is-first .el-icon) {
      color: #e4e7ed !important; //修改默认的背景色
      font-weight: bold;
    }

    :deep(.el-pagination.is-background .btn-next.is-last .el-icon) {
      color: #e4e7ed !important; //修改默认的背景色
      font-weight: bold;
    }

    :deep(.el-pagination.is-background .btn-prev.is-first) {
      background-color: #626a73 !important; //修改默认的背景色
    }

    :deep(.el-pagination.is-background .btn-next.is-last) {
      background-color: #626a73 !important; //修改默认的背景色
    }
  }


  .box {

    .timeline {
      margin-left: 30px;
      width: 700px;
      color: #aac9fa;

      .card {
        width: 720px;
        border-radius: 6px;
        height: 180px;
        background-color: #7a8aa3;
        border: 1px solid #aac9fa;
        display: flex;

        .img-box {
          margin: 10px;
          width: 220px;
          height: 160px;

          img {
            width: 220px;
            height: 160px;
            object-fit: cover;
            color: #223040;
          }
        }

        .gs {
          margin-left: 5px;

          h3 {
            margin-top: 22px;
            font-family: cursive;
            font-weight: bold;
            font-size: 19px;
          }

          p {
            color: #9fbbe7;
            font-weight: bold;
            margin-bottom: 38px;
          }

          span {
            color: #303133;
            font-weight: bold;
            font-family: cursive;
          }
        }
      }

      .card:hover {
        cursor: pointer;
      }
    }

  }
}
</style>