<script setup>
import { getWebsite } from '@/api/home.js'
import { onMounted, ref } from 'vue';
const websiteData = ref({})
onMounted(async () => {
  const res = await getWebsite()
  websiteData.value = res.data
})
const goToPath = (path) => {
  window.open(path)
}
</script>

<template>
  <div class="footer">
    <!-- 标题 -->
    <div class="title">
      <p>Hao</p>
      <span>{{websiteData.footerSignature}}</span>
    </div>
    <div class="tx">
      <div class="box">
        <img src="/src/assets/images/tx.jpg" alt="" class="avater" />
      </div>
      <span>©小豪的博客 2024</span>
      <p>赣ICP备2024033867号</p>
      <div class="js">
        <div class="bigbox1"
          @click="goToPath('https://account.aliyun.com/login/login.htm?oauth_callback=https%3A%2F%2Fhome.console.aliyun.com%2Fhome%2Fdashboard%2FProductAndService&lang=zh')">
          <div class="box1">阿里云</div>
          <div class="box2">ESC服务器</div>
        </div>
        <div class="bigbox2"
          @click="goToPath('https://gitee.com/devqianlong/md-editor-v3#%E5%8A%9F%E8%83%BD%E4%B8%80%E8%A7%88')">
          <div class="box3">MdEditorV3</div>
          <div class="box4">MD编辑器</div>
        </div>
        <div class="bigbox3" @click="goToPath('https://element-plus.org/zh-CN/guide/design.html')">
          <div class="box5">ElementPlus</div>
          <div class="box6">前端框架</div>
        </div>
        <div class="bigbox4" @click="goToPath('https://www.minio.org.cn/')">
          <div class="box7">Minio</div>
          <div class="box8">对象存储系统</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.footer {
  height: 220px;
  width: 100%;
  background-color: #626a73;
  display: flex;

  .title {
    margin-left: 80px;
    margin-top: 20px;
    width: 700px;

    p {
      padding: 10px;
      font-size: 30px;
      color: #aac9fa;
      font-family: KaiTi;
      font-style: italic;
      font-weight: normal;
    }

    span {
      font-size: 18px;
      color: #8597b4;
      font-weight: bold;
      line-height: 26px;
      font-family: KaiTi;
    }
  }

  .tx {
    margin-top: 20px;
    margin-left: 230px;
    width: 790px;
    height: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .box {
      /* 设置容器大小（如果需要的话） */
      width: 90px;
      /* 或者你想要的任何大小 */
      height: 90px;

      /* 如果你想要旋转后保持元素的中心点不变，可以添加这个 */
      transform-origin: center center;

      img {
        width: 100%;
        border-radius: 50%;
        /* 使用 object-fit 来确保图片在容器内正确缩放 */
        object-fit: cover;
        /* 确保图片在容器中居中显示 */
        display: block;
      }


    }

    span {
      margin-top: 13px;
      font-size: 14px;
    }

    p {
      margin-top: 4px;
      font-size: 14px;
    }

    .js {
      margin-left: 139px;
      margin-top: 10px;
      width: 100%;
      height: 20px;
      display: flex;

      .bigbox1,
      .bigbox2,
      .bigbox3,
      .bigbox4 {
        width: 114px;
        height: 100%;
        display: flex;
        font-size: 12px;
        align-items: center;
        color: white;

        div {
          border-radius: 10%;
          text-align: center;
          height: 100%;
        }

        .box1 {
          width: 46px;
          background-color: #131f2c;
        }

        .box2 {
          width: 60px;
          background-color: #f37f40;
        }
      }

      .bigbox2 {
        width: 150px;
        height: 100%;

        .box3 {
          width: 100px;
          background-color: #131f2c;
        }

        .box4 {
          width: 80px;
          background-color: #148b65;
        }
      }

      .bigbox3 {
        margin-left: 8px;
        width: 139px;
        height: 100%;

        .box5 {
          width: 98px;
          background-color: #131f2c;
        }

        .box6 {
          width: 70px;
          background-color: #409eff;
        }
      }

      .bigbox4 {
        margin-left: 9px;
        width: 120px;
        height: 100%;

        .box7 {
          width: 40px;
          background-color: #131f2c;
        }

        .box8 {
          width: 80px;
          background-color: #c72c48;
        }
      }


      .bigbox1,
      .bigbox2,
      .bigbox3,
      .bigbox4:hover {
        cursor: pointer;
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .box:hover {
      /* 应用旋转动画 */
      animation: rotate 5s linear infinite;
    }
  }


}
</style>
