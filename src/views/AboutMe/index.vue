<script setup>
import BgBoard from '@/components/BgBoard.vue'
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus';
import { getAboutApi } from '@/api/about'
/**
 * Loading效果
 */
const { isLoading } = useLoading()
onMounted(() => {
  window.scrollTo(0, 0);
})

// 关闭标签
const closeTag = (name) => {
  ElMessage.info(`您已获得${name}技术栈!`)
}
const aboutMe = ref({})
const getAbout = async () => {
  const res = await getAboutApi()
  aboutMe.value = res.data
}
onMounted(() => {
  getAbout()
})
</script>

<template>
  <BgBoard :title="'关于我'" :wengan="'在这里，我与你分享我的故事，让心灵在文字中交织舞动'" />
  <Loading :is-loading="isLoading" />
  <div class="about-me">
    <div class="about-me-box">
      <!-- 教育背景 -->
      <div class="bg">
        <!-- 图标 -->
        <div class="icon-box">
          <i class="iconfont icon-jiaoyubeijing"></i>
          <h2>教育背景</h2>
        </div>
        <!-- 左中右结构 -->
        <div class="desc">
          <p>{{ aboutMe.time }}</p>
          <p>{{ aboutMe.school }}</p>
          <p>{{ aboutMe.major }}</p>
        </div>
      </div>
      <!-- 技术栈 -->
      <div class="technology">
        <div class="icon-box">
          <i class="iconfont icon-jishuzhanqingdan" style="font-size: 22px;margin:0 10px 0 8px;"></i>
          <h2>技术栈</h2>
        </div>
        <div class="tabs">
          <el-tag @close="closeTag(tag.name)" style="width: 80px;height: 30px;margin-right: 10px;margin-top: 10px;"
            v-for="tag in aboutMe.technology" :key="tag.id" effect="dark" closable type="info">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <!-- 经历 -->
      <div class="jl">
        <div class="icon-box">
          <i class="iconfont icon-drxx18" style="font-size: 18px;margin:0 10px 0 7px;"></i>
          <h2>经历</h2>
        </div>
        <div class="text">
          <p>
            {{ aboutMe.experience }}
          </p>
        </div>
      </div>
      <!-- 文案 -->
      <div class="jt">
        <div class="icon-box">
          <i class="iconfont icon-lizhijitang" style="font-size: 20px;margin:0 10px 0 7px;"></i>
          <h2>来份鸡汤吧</h2>
        </div>
        <div class="text">
          <p>{{ aboutMe.chicken }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.about-me {
  width: 1030px;
  margin: 20px auto;
  border: 1px solid #aac9fa;
  border-radius: 20px;
  background-color: #626a73;

  .about-me-box {
    padding: 22px;

    .bg {
      width: 980px;
      height: 100px;
      border-bottom: 1px solid #aac9fa;

      .icon-box {
        display: flex;
        align-items: center;
        color: #9fbbe7;

        i {
          font-size: 38px;
          margin-right: 5px;
        }

        h2 {
          margin: 0;
          padding: 0;
          font-family: kaiti;
        }
      }

      .desc {
        display: flex;
        justify-content: space-between;
      }
    }

    .technology {
      width: 980px;
      margin-top: 15px;
      padding-bottom: 25px;
      border-bottom: 1px solid #aac9fa;

      .icon-box {
        display: flex;
        align-items: center;
        color: #9fbbe7;

        i {
          font-size: 38px;
          margin-right: 5px;
        }

        h2 {
          margin: 0;
          padding: 0;
          font-family: kaiti;
        }
      }

      .tabs {
        margin-top: 5px;
      }
    }

    .jl {
      width: 980px;
      margin-top: 15px;
      padding-bottom: 25px;
      border-bottom: 1px solid #aac9fa;

      .icon-box {
        display: flex;
        align-items: center;
        color: #9fbbe7;

        i {
          font-size: 38px;
          margin-right: 5px;
        }

        h2 {
          margin: 0;
          padding: 0;
          font-family: kaiti;
        }
      }

      p {
        text-indent: 2em;
        letter-spacing: 2px;
      }
    }

    .jt {
      width: 980px;
      margin-top: 15px;
      padding-bottom: 10px;

      .icon-box {
        display: flex;
        align-items: center;
        color: #9fbbe7;

        i {
          font-size: 38px;
          margin-right: 5px;
        }

        h2 {
          margin: 0;
          padding: 0;
          font-family: kaiti;
        }
      }

      p {
        text-indent: 2em;
        letter-spacing: 2px;
      }
    }
  }

}
</style>