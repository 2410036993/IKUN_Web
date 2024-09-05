<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue'
import Loading from '@/components/Loading.vue';
import useLoading from '@/composables/useLoading';
import { MdPreview } from 'md-editor-v3'
import { getArticleDetailApi } from '@/api/article.js'
/**
 * Loading效果
 */
const { isLoading } = useLoading()
// 实例化路由
const route = useRoute()
// 存储id
const articleId = ref(null)
// 用来存储提取到的所有标题
const titles = ref([]);
// 文章内容
const articleDetail = ref({})

// 使用正则表达式匹配以'#'开头的行，同时捕获'#'的数量作为标题级别
const regex = /^(#{1,6})\s+(.*)$/gm; // g表示全局搜索，m表示多行模式
// 捕获到的数据
let match;
// 获取到文章详情
const getArticleDetail = async () => {
  // 调用接口
  const res = await getArticleDetailApi(articleId.value)
  // 处理标题
  while ((match = regex.exec(res.data.content)) !== null) {
    // match[1] 是 '#' 的数量，表示标题级别
    // match[2] 是标题的实际文本内容，已经去除了前面的 '#' 和空格
    // 检查 titles.value 中是否已存在具有相同 title 的对象  
    const existingTitle = titles.value.find(t => t.title === match[2]);
    if (!existingTitle) {
      // 如果不存在，则添加新标题  
      titles.value.push({ level: match[1].length, title: match[2] });
    }

  }
  // 存储文章内容
  articleDetail.value = res.data
}

// 获取到传过来的文章id
onMounted(() => {
  articleId.value = route.params.id
  // 并调用获取到文章信息接口
  getArticleDetail()
})
// 页面跳转回到顶部
onMounted(() => {
  window.scrollTo(0, 0);
})

// 阻止锚点默认行为
const handleClick = (e) => {
  e.preventDefault()
}
// 监听路由变化
watch(() => route.params.id, (newId) => {
  // 判断新值
  if (newId) {
    // 重新渲染更新
    articleId.value = route.params.id
    getArticleDetail()
  }
}, {
  // 深度观察对于基本类型（如字符串或数字）不是必需的，  
  // 但如果你需要观察对象或数组内部的变化，可以启用它。  
  // 对于路由查询参数，这里不需要深度观察。  
  deep: false,
  // 立即执行回调函数一次，在侦听器创建的时候  
  // 使用这个选项可以模拟Vue 2的watch的immediate属性  
  immediate: true
});
</script>

<template>
  <Loading :is-loading="isLoading" />
  <!-- 文章基本信息 -->
  <div class="box-xk">
    <div class="title">{{ articleDetail.title }}</div>
    <div class="wa">{{ articleDetail.describe }}</div>
    <div class="detail">
      <i class="iconfont icon-fabu" style="font-size: 14px; color: #aac9fa">
      </i>
      <span style="font-size: 14px">发表于 {{ articleDetail.createTime }}前</span>
      <i class="iconfont icon-gengxin" style="font-size: 14px; color: #2f77f1">
      </i>
      <span style="font-size: 14px">更新于 {{ articleDetail.updateTime }}前</span>
      <i class="iconfont icon-fenlei " style="color: #efe0ec"> </i>
      <span class="fl">{{ articleDetail.categoryName }} </span>
      <i class="iconfont icon-biaoqian " style="color: #c7e6f4"></i>
      <span class="bq">{{ articleDetail.labelName }}</span>
      <i class="iconfont icon-redu" style="color: #f56c6c;"></i>
      <span>{{ articleDetail.hot }}</span>
    </div>
  </div>
  <!-- 文章内容区域 -->
  <div class="article">
    <!-- 预览组件 -->
    <div class="md" style="width: 992px;margin-right: 10px;">
      <MdPreview v-model="articleDetail.content" :theme="light" style="background-color: #626a73;border-radius: 8px;">
      </MdPreview>
    </div>
    <div class="mt" style="background-color: #86868b;">
      <el-affix :offset="77">
        <!-- 锚点容器 -->
        <el-anchor :container="containerRef" direction="vertical" type="default" :offset="20" @click="handleClick"
          style="background-color: #626a73;border-radius: 5px;">
          <!-- 标题 -->
          <h2 style="margin: 0px 0 15px 3px;padding: 0;color: #37424e">目录</h2>
          <el-anchor-link
            :class="{ twoStyle: item.level === 2, threeStyle: item.level === 3, fourStyle: item.level === 4, fiveStyle: item.level == 5, sizeStyle: item.level === 6 }"
            :href="`#${item.title}`" v-for="(item, index) in titles" :key="index"
            style="padding-left: 3px;padding-right: 12px;">
            {{ item.title }}
          </el-anchor-link>
        </el-anchor>
      </el-affix>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  border-radius: 20px;
  margin: 15px auto;
  width: 1180px;
  display: flex;

  .md {

    ::v-deep(.md-editor-preview li) {
      color: #303133 !important;
    }

    ::v-deep(.md-editor-preview p) {
      color: black;
    }

    ::v-deep(.md-editor-preview) {

      h5,
      h4,
      h3,
      h2,
      h1,
      h6 {
        color: black !important;
        font-weight: bold;
      }
    }
  }


  .mt {
    ::v-deep(.el-anchor__link) {
      font-size: 13px;
      color: #aac9e1;
    }

    .twoStyle {
      padding-left: 14px !important;
    }

    .threeStyle {
      padding-left: 28px !important;

    }

    .fourStyle {
      padding-left: 42px !important;

    }

    .fiveStyle {
      padding-left: 56px !important;
    }

    .sizeStyle {
      padding-left: 70px !important;
    }
  }
}

.title,
.wa {
  letter-spacing: 2px;
  color: #aac9fa;
  text-shadow: 21px 21px 88px #85cdff;
  font-size: 38px;
  /* 如果背景图片颜色较深，你可能想要白色文字 */
  text-align: center;
  /* 使标题居中对齐 */
  position: absolute;
  /* 绝对定位标题 */
  top: 38%;
  /* 将标题的顶部定位到容器高度的50% */
  left: 50%;
  /* 将标题的左边定位到容器宽度的50% */
  transform: translate(-50%, -50%);
  /* 通过transform属性将标题的中心点对齐到容器的中心点 */
  margin: 0;
}

.wa {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  top: 67%;
  color: #8597b4;
  font-family: KaiTi;
}

.detail {
  position: relative;
  top: 82%;
  left: 32%;

  span {
    color: #626a73;
  }

  i {
    margin-left: 10px;
    margin-right: 5px;
  }

  .bq:hover,
  .fl:hover {
    cursor: pointer;
    color: #a2bfeb;
  }
}

/* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
.box-xk {
  width: 100%;
  height: 200px;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%) !important;
  overflow: hidden;
  position: relative;
}
</style>