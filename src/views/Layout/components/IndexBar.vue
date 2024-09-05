<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { searchData } from '@/api/home'
import { useRouter } from "vue-router";
// 初始化激活状态
const activeIndex = ref('/home')
// 菜单激活回调
const handleSelect = () => {
}

// 搜索的值
const searchValue = ref()
// 输入了值的回调
const querySearch = (queryString, callback) => {
  // 如果输入的值为空就不查询后端
  if (queryString.trim('' === '')) {
    return
  }
  // 800毫秒后返回结果
  setTimeout(async () => {
    const res = await searchData(queryString)
    // 回调
    callback(res.data)
  }, 800)

}






// 上次滚动的位置
let lastScrollTop = 0;
// 是否固定
const isFixed = ref(false)
// 定义一个处理滚动事件的函数
const handleScroll = () => {
  // 当前滚动的位置
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  // 判断滚动方向
  if (currentScrollTop > lastScrollTop) { // 如果当前滚动位置大于上一次的滚动位置，表示用户正在向下滚动
    isFixed.value = false; // 不固定导航栏
  } else { // 否则，用户正在向上滚动
    if (currentScrollTop > 480) { // 当滚动超过480px时才固定导航栏，避免刚开始滚动就立即固定
      isFixed.value = true;
    } else {
      isFixed.value = false; // 如果没有超过480px，不固定
    }
  }
  // 更新上次滚动位置
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // 防止负值
};



// 在组件挂载后开始监听滚动事件
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 在组件卸载前移除滚动事件的监听器
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const goToHome = () => {
  window.scrollTo(0, 0); // 滚动到页面顶部  
}
const openHouTai = (i) => {
  if (i) {
    // 存在跳转gitee
    window.open("https://gitee.com/haomagitee");
  } else {
    // 跳转后台
    window.open('http://admin.haoyuming.top:8888')
  }
}
</script>

<template>
  <!-- 导航栏 -->
  <el-menu :default-active="activeIndex" router background-color="#131f2b" active-text-color="#3fa8db"
    text-color="#626a73" :class="{ 'el-menu-demo': true, 'fixed-nav': isFixed }" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <div class="title">
      <h2 @click="goToHome">Hao's Blog</h2>
    </div>
    <el-menu-item index="/home" @click="goToHome">
      <i class="iconfont icon-shouye" style="font-size: 13px;"></i><span>首页</span>
    </el-menu-item>

    <el-menu-item index="/talk" @click="goToHome">
      <i class="iconfont icon-shuoshuo"></i>
      <span>说说</span>
    </el-menu-item>
    <el-menu-item index="/message" @click="goToHome">
      <i class="iconfont icon-liuyan"></i>
      <span>留言</span>
    </el-menu-item>
    <el-menu-item index="/link">
      <i class="iconfont icon-youqinglianjie"></i>
      <span>友链</span>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>
        <i class="iconfont icon-16"></i>
        <span>文章</span>
      </template>
      <el-menu-item index="/pigeonhole">归档</el-menu-item>
      <el-menu-item index="/category">分类</el-menu-item>
      <el-menu-item index="/label">标签</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <i class="iconfont icon-xiangmu" style="font-size: 12px;"></i>
        <span>项目</span>
      </template>
      <!-- TODO:跳转到该项目的后台地址 -->
      <el-menu-item @click="openHouTai(null)">项目后台</el-menu-item>
      <!-- TODO:跳转到该项目的gitee -->
      <el-menu-item @click="openHouTai(1)">项目地址</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="7">
      <template #title>
        <i class="iconfont icon-geren1"></i>
        <span>个人</span></template>
      <el-menu-item index="/aboutme">关于我</el-menu-item>
      <el-menu-item index="/learning">学习路</el-menu-item>
      <el-menu-item index="/photo" @click="goToHome">
        看相册
      </el-menu-item>
    </el-sub-menu>
    <div class="flex-grow">
      <div class="input">
        <!-- 搜索 -->
        <!-- style：搜索框的样式 -->
        <!-- fetch-suggestions：输入数据时的回调 -->
        <!-- select：选中值的回调 -->
        <el-autocomplete placeholder="请输入文章标题" style="width: 290px;background-color: #86868b;" v-model="searchValue"
          :fetch-suggestions="querySearch" clearable @select="handleSelectPush">
          <!-- 输入框尾部的内容 -->
          <template #suffix>
            <i class="iconfont icon-sousuo1" style="margin-right: 4px"></i>搜索
          </template>
          <!-- 回调的内容 -->
          <template #default="scope">
            <p v-html="scope.item.value"></p>
          </template>
        </el-autocomplete>
      </div>
    </div>
  </el-menu>
</template>
<style lang="scss" scoped>
.fixed-nav {
  position: sticky;
  top: 0%;
  left: 0;
  z-index: 1000;
  width: 100%;
  opacity: 0.8;
}

.title {
  flex-grow: 1;
  margin-left: 30px;
  line-height: 35px;
  margin-right: 80px;

  h2 {
    font-size: 28px;
    text-shadow: 1px 1px 2px #85cdff;
    color: #85cdff;
    font-style: italic;
  }

}

.title:hover {
  cursor: pointer;
}

.flex-grow {
  margin-left: 85px;
  margin-right: 30px;
  display: flex;
  align-items: center;


}

.el-menu-demo {
  height: 76px;
  font-weight: bold;
  border: none;
}

span {
  margin-left: 10px !important;
}

.input-with-select {
  margin-left: 20px;
  margin-top: 25px;
  max-width: 320px;
}

.icon {
  padding-left: 10px;
  font-size: 29px;
  color: #626a73;
}
</style>
