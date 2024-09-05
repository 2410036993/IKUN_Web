<script setup>
import MacBookAnimation from "./components/WindowAnimation.vue";
import Typewriter from "./components/Typewriter.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { getHotArticle, getCategoryListApi, getRecommend, articlePageList, getWebsite, getCountApi } from '@/api/home.js'
import { smoothScrollTo } from '@/composables/rollingTransition.js'
import { useRouter } from "vue-router";
// 实例化路由
const router = useRouter()
// 声明一个响应式的数据来存储滚动距离
const scrollDistance = ref(0);
// 定义一个处理滚动事件的函数
const handleScroll = () => {
  scrollDistance.value = window.scrollY;
};

// 在组件挂载后开始监听滚动事件
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 在组件卸载前移除滚动事件的监听器
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 获取头像卡片中的统计数量的值

// 跳转gitee
const goToGitee = () => {
  window.open("https://gitee.com/haomagitee");
};
// 跳转blli
const goToBiLi = () => {
  window.open("https://space.bilibili.com/1680425641?spm_id_from=333.1007.0.0");
};

// 是否显示图片
const isShowImg = ref(true);
// 延时函数
let timeId = null;
const img = ref("/src/assets/images/QQ.png");
// 显示二维码
const onPenLx = (url) => {
  img.value = url;
  isShowImg.value = false;
  timeId = setTimeout(() => {
    isShowImg.value = true;
  }, 3000);
};
onUnmounted(() => {
  if (timeId) {
    clearTimeout(timeId);
  }
});
// 最火数据
const hotList = ref([]);
// 分类数据
const categorys = ref([])
// 推荐数据
const recommends = ref([])
// 分页参数
const pageParams = ref({
  page: 1,
  limit: 6
})
// 网站信息
const website = ref({})
// 文章数据
const list = ref([])
// 总记录数
const total = ref(0)
// 获取统计数据
const countMap = ref()
// 获取首页收据
const getHomeList = async () => {
  // 并发执行多个接口
  const results = await Promise.all([
    getHotArticle(),
    getCategoryListApi(),
    getRecommend(),
    articlePageList(pageParams.value),
    getWebsite(),
    getCountApi()
  ])
  // const hotArticleList = await getHotArticle()
  // const categoryList = await getCategoryListApi()
  // const recommendList = await getRecommend()
  // const pageList = await articlePageList(pageParams.value)
  const [hotArticleList, categoryList, recommendList, pageList, websiteData, countData] = results
  // hotList.value = hotArticleList.data
  // categorys.value = categoryList.data
  // recommends.value = recommendList.data
  // list.value = pageList.data.content
  // total.value = pageList.data.totalElements
  // website.value = websiteData.data
  // console.log(countData)
  countMap.value = countData.data
  getTime()
}
onMounted(() => {
  getHomeList()
})
const time = ref()
const getTime = () => {
  const X = new Date("05/25/2024 5:22:00"); // 设置的初始时间
  const Y = new Date();  // 当前时间
  const T = (Y.getTime() - X.getTime());
  const M = 24 * 60 * 60 * 1000;
  const a = T / M;
  const A = Math.floor(a);
  const b = (a - A) * 24;
  const B = Math.floor(b);
  time.value = A + "天" + B + "小时"
}
// 当页面发生变化
const handleCurrentChange = async () => {
  const res = await articlePageList(pageParams.value)
  list.value = res.data.content
  smoothScrollTo(1150, 300)
}

</script>

<template>
  <!-- 导航栏 -->
  <!-- 联想动画 -->
  <MacBookAnimation />
  <!-- 打字机 -->
  <Typewriter />
  <!-- 滚轮 -->
  <div :class="{ gl: true, tm: scrollDistance > 380 }">
    <i class="iconfont icon-xiahua"> </i>
  </div>
  <!-- 首页 -->
  <div class="home">
    <!-- 左侧 -->
    <div class="home-left-box">
      <!-- 轮播图 -->
      <div class="lbt">
        <el-carousel direction="vertical" motion-blur :autoplay="true" @change="getWz" interval="2000">
          <!-- 从后端获取到图片 -->
          <el-carousel-item v-for="item in hotList" :key="item">
            <div class="box" @click="router.push(`/article/${item.id}`)">
              <div class="tp">
                <img :src="item.cover" alt="" />
              </div>
              <div class="txt">
                <div class="t" style="margin-bottom: 20px; color: #aac9e4">
                  <span>{{ item.createTime }}</span>
                </div>
                <div class="b" style="
                    margin-bottom: 20px;
                    color: #aac9fa;
                    font-size: 20px;
                    font-weight: bold;
                  ">
                  <span>{{ item.title }}</span>
                </div>
                <div class="j" style="color: #aac9e4">
                  <span>{{ item.describe }}</span>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类统计 -->
      <div class="fl">
        <!-- 每一行的分类 -->
        <div class="flh">
          <!-- 分类页 -->
          <div class="item" v-for="(item, index) in categorys" :key="item.id"
            @click="router.push(`/allarticle/${item.name}/${1}`)">
            <i class="iconfont icon-xuexi" v-if="index === 0"
              style="font-size: 25px; margin-left: 10px; color: #18b922">
            </i>
            <i class="iconfont icon-bug" v-if="index === 1" style="font-size: 25px; margin-left: 10px; color: #685315">
            </i>
            <i class="iconfont icon-yirichanggui" v-if="index === 2"
              style="font-size: 25px; margin-left: 10px; color: #008db6">
            </i>
            <i class="iconfont icon-shiyonggongju" v-if="index === 3"
              style="font-size: 25px; margin-left: 10px; color: #7d3d74">
            </i>
            <i class="iconfont icon-bushu" v-if="index === 4"
              style="font-size: 25px; margin-left: 10px; color: #208a77">
            </i>
            <i class="iconfont icon-changyongxinxi" v-if="index === 5"
              style="font-size: 25px; margin-left: 10px; color: #c4b9a6">
            </i>
            <span style="font-size: 17px; margin-left: 4px">Haoの{{ item.name }} ({{ item.count }})</span>
            <i class="iconfont icon-youjiantou" style="font-size: 21px; margin-left: 85px; color: black">
            </i>
          </div>
        </div>
        <!-- 查看更多 -->
        <div class="gd">
          <span>查看更多</span>
        </div>
      </div>
      <!-- 最新文章 -->
      <div class="zxwz">
        <!-- 每一行的盒子 -->
        <div class="wz-box">
          <div class="box" v-for="item in list" :key="item">
            <img :src="item.cover" alt="" />
            <div class="gx" style="
                margin-top: 6px;
                margin-bottom: 48px;
                color: #aac9fa;
                font-weight: 500;
                font-size: 18px;
              ">
              <span>{{ item.describe }}</span>
            </div>
            <div class="tt" @click="router.push(`/article/${item.id}`)">
              <span>{{ item.title }}</span>
            </div>
            <div class="fg" style="height: 30px">
              <i class="iconfont icon-fabu" style="font-size: 14px; margin-right: 2px; color: #aac9fa">
              </i>
              <span style="font-size: 14px">发表于 {{ item.createTime }}前 | </span>
              <i class="iconfont icon-gengxin" style="font-size: 14px; margin-right: 2px; color: #2f77f1">
              </i>
              <span style="font-size: 14px">更新于 {{ item.updateTime }}前</span>
            </div>
            <div class="fb">
              <i class="iconfont icon-fenlei" style="color: #efe0ec"> </i>
              <span @click="router.push(`/allarticle/${item.categoryName}/${1}`)">{{ item.categoryName }} | </span>
              <i class="iconfont icon-biaoqian" style="color: #c7e6f4"></i>
              <span @click="router.push(`/allarticle/${item.labelName}/${2}`)">{{ item.labelName }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页条 -->
      <div class="fy" style="margin: 5px 0 0 20px;">
        <el-pagination background layout="prev, pager, next" v-model:current-page="pageParams.page"
          :default-page-size="pageParams.limit" :total="total" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 右侧介绍 -->
    <div class="home-box">
      <!-- 头像卡片 -->
      <div class="card" v-if="isShowImg">
        <!-- 背景 -->
        <div class="img">
          <!-- 头像盒子 -->
          <div class="box">
            <!-- 头像 -->
            <img :src="website.avatar" alt="" class="avater" />
          </div>
          <!-- 名称 -->
          <div class="title">
            <span>H的个人博客</span>
          </div>
        </div>
        <!-- 文案 -->
        <div class="wenan">
          <span>{{ website.signature }}</span>
        </div>
        <!-- 统计数 -->
        <div class="tj">
          <!-- todo从后端请求过来 -->
          <div class="wz">
            <p>文章</p>
            <span>{{ countMap?.articleCount }}</span>
          </div>
          <div class="ly">
            <p>留言</p>
            <span>{{ countMap?.messageCount }}</span>
          </div>
          <div class="ss">
            <p>说说</p>
            <span>{{ countMap?.talkCount }}</span>
          </div>
        </div>
        <!-- 点击直接跳转到HaoMaGitee -->
        <div class="gitee" @click="goToGitee">
          <!-- 图标 -->
          <i class="iconfont icon-GITEE"></i>
          <span>My Gitee</span>
        </div>
        <!-- 联系方式 -->
        <div class="lx">
          <i class="iconfont icon-bilibili" @click="goToBiLi"></i>
          <i class="iconfont icon-weixin" @click="onPenLx('http://59.110.169.188:9000/blog/admin-photo/20240711/e326390dc5db41768b0f79029dbc5f0eWX.png')"></i>
          <i class="iconfont icon-QQ" @click="onPenLx('http://59.110.169.188:9000/blog/admin-photo/20240711/c72c48e65e034767bb624cec9dccf109QQ.png')"></i>
        </div>
      </div>
      <!-- 头像显示位置 -->
      <div class="cradimg" v-else>
        <img :src="img" alt="" class="imgdiv" />
      </div>
      <!-- 欢迎 -->
      <div class="hy">
        <div class="ht">
          <i class="iconfont icon-huanying1"></i>
          <span>欢迎来到我的个人博客！</span>
        </div>
        <p>
          这里是我分享技术见解 生活感悟和创意灵感的平台 希望您能在这里找到感兴趣的内容
          并与我一起交流心得
        </p>
        <p>如遇bug点击右上角反馈箱很愿意得到你的反馈</p>
      </div>
      <!-- 从后端获取到推荐文章 -->
      <div class="gg">
        <div class="gt">
          <i class="iconfont icon-tongzhigonggao"> </i>
          <span>推荐文章</span>
        </div>
        <div class="tpbt" v-for="item in recommends" :key="item.id" @click="router.push(`/article/${item.id}`)">
          <!-- 图片 -->
          <div class="tp">
            <img :src="item.cover" alt="" />
          </div>
          <!-- 标题 -->
          <div class="bt">
            <p>{{ item.title }}</p>
            <span class="time">{{ item.createTime }}</span>
          </div>
        </div>
      </div>
      <!-- 小站咨询 -->
      <div class="zx">
        <div class="zt">
          <i class="iconfont icon-wangzhantongji"></i>
          <span>小站咨询</span>
        </div>
        <!-- 从后端获取到统计数量 -->
        <div class="ztt">
          <div class="ps">
            <p>访客数:</p>
            <span>{{ countMap?.userCount }}</span>
          </div>
        </div>
        <div class="ztt">
          <div class="ps">
            <p>访问量:</p>
            <span>{{ countMap?.requestCount }}</span>
          </div>
        </div>
        <div class="ztt">
          <div class="ps">
            <p>运行时间:</p>
            <span>{{ time }}</span>
          </div>
        </div>
        <div class="ztt">
          <div class="ps">
            <p>最近更新时间:</p>
            <span>{{ countMap?.update }}</span>
          </div>
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

.home {
  margin-bottom: 60px;
  display: flex;
  width: 100%;
  height: 1300px;

  .home-left-box {
    height: 100%;
    margin-top: 22px;
    margin-left: 100px;

    .fl {
      border-radius: 20px;
      display: flex;
      margin-top: 10px;
      width: 1030px;
      height: 180px;
      background-color: #626a73;
      flex-direction: column;

      .flh {
        margin: 24px 24px 0px 24px;
        width: 980px;
        height: 120px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
          width: 320px;
          height: 48px;
          display: flex;
          align-items: center;
          background-color: #8597b4;
          text-align: center;
          color: #aac9e4;
          font-weight: 500;
          border-radius: 9px;

          &:nth-child(0) {
            margin-left: 10px;
          }
        }

        .item:hover {
          cursor: pointer;
          background-color: #aac9fa;
          color: #626a73;
        }
      }

      .gd {
        text-align: center;
        color: #aac9e4;
        font-weight: 600;
        font-size: 15px;
      }

      .gd:hover {
        color: #aac9fa;
        cursor: pointer;
      }
    }

    // 分页条
    .fy {
      :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
        background-color: #8597b4 !important; //修改默认的背景色
      }

      :deep(.el-pagination.is-background .el-pager li:not(.is-disabled)) {
        background-color: #626a73 !important; //修改默认的背景色
      }

      :deep(.el-pagination.is-background .btn-prev.is-first .el-icon) {
        color: #8597b4 !important; //修改默认的背景色
        font-weight: bold;
      }

      :deep(.el-pagination.is-background .btn-next.is-last .el-icon) {
        color: #8597b4 !important; //修改默认的背景色
        font-weight: bold;
      }

      :deep(.el-pagination.is-background .btn-prev.is-first) {
        background-color: #626a73 !important; //修改默认的背景色
      }

      :deep(.el-pagination.is-background .btn-next.is-last) {
        background-color: #626a73 !important; //修改默认的背景色
      }
    }

    // 最新文章
    .zxwz {
      display: flex;
      margin-top: 10px;
      border-radius: 20px;
      width: 1030px;
      height: 710px;

      // 每一行的盒子
      .wz-box {
        margin: 10px 15px 20px 15px;
        width: 1000px;
        height: 668px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        // 盒子
        .box {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          height: 338px;
          width: 325px;
          border-radius: 5%;
          text-align: center;
          background-color: #626a73;
          overflow: hidden;
          position: relative;
          /* 为了定位子元素 */
          color: #8597b4;
          font-family: KaiTi;
          font-weight: bold;

          img {
            width: 100%;
            height: 50px;
            border-radius: 5%;
            /* 使用object-fit来保持图片的宽高比，同时适应盒子 */
            object-fit: cover;
            /* 使用object-position来定位图片在盒子中的位置，只显示上半部分 */
            object-position: 50% 0;
            /* 这将图片向下移动50%，从而只显示上半部分 */
            /* 如果需要，可以设置图片的最大高度为盒子的一半 */
            height: 45%;
            /* 这与.box的height一致，确保只显示上半部分 */
          }

          .fb {
            i {
              margin-right: 2px;
            }
          }

          .tt {
            color: #1f2d3d;
            font-weight: bold;
            margin-bottom: 20px;
            font-size: 20px;
          }

          .tt:hover {
            color: #aac9fa;
            cursor: pointer;
          }

          .fb {
            span:hover {
              color: #aac9fa;
              cursor: pointer;
            }
          }
        }

        .box:nth-child(n + 4) {
          margin-top: 10px;
        }

        .box:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
      }
    }

    // 轮播图
    .lbt {
      padding-top: 20px;
      border-radius: 20px;
      width: 1030px;
      height: 300px;
      background-color: #626a73;

      // 轮播图指示器样式
      ::v-deep .el-carousel__button {
        background-color: #aac9fa;
        /* 其他样式 */
      }

      .box {
        display: flex;

        .tp {
          margin-left: 30px;
          width: 230px;
          height: 290px;

          img {
            border-radius: 20px;
            width: 340px;
            height: 290px;
            /* 图片高度设置为容器高度 */
            object-fit: cover;
          }
        }

        .txt {
          margin-left: 220px;
          margin-top: 70px;
        }
      }
    }

    .lbt:hover {
      cursor: pointer;
    }
  }

  .home-box {
    margin: 22px 20px 0px 35px;
    background-color: #86868b;

    .cradimg {
      max-width: 280px;
      height: 300px;

      .imgdiv {
        width: 100%;
        height: 100%;
        border-radius: 8%;
        object-fit: contain;
      }
    }

    .card,
    .hy,
    .gg,
    .zx {
      max-width: 280px;
      border-radius: 10px;
      height: 390px;
      background: #626a73;
      box-shadow: 1px 1px 1px 1px rgb(128, 133, 163);

      .img {
        width: 100%;
        height: 130px;
        background-image: url("/src/assets/images/tx-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        display: flex;
        border-radius: 10px 10px 0 0;

        .box {
          padding-top: 100px;
          margin-left: 20px;
          /* 设置容器大小（如果需要的话） */
          width: 70px;
          /* 或者你想要的任何大小 */
          height: 70px;

          .avater {
            /* 使图片在其容器内撑满并保持其宽高比 */
            width: 100%;
            border-radius: 9px;
            /* 使用 object-fit 来确保图片在容器内正确缩放 */
            object-fit: cover;
            /* 确保图片在容器中居中显示 */
            display: block;
          }
        }

        .title {
          // color: #3fa8db;
          color: #aac9fa;
          margin-left: 12px;
          margin-top: 130px;
          font-size: 14px;
        }
      }

      .wenan {
        margin-left: 5px;
        margin-top: 45px;
        font-size: 14px;
        color: #aac9fa;
      }

      .tj {
        margin-top: 50px;
        display: flex;
        color: #aac9fa;
        justify-content: space-evenly;
        text-align: center;
        line-height: 24px;

        span {
          font-weight: bold;
        }
      }

      .gitee {
        margin: 20px 40px 0px 40px;
        border-radius: 4px;
        width: 200px;
        height: 25px;
        background-color: #533737;
        color: #aac9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        /* 定义过渡效果 */
        transition: background-color 0.5s ease;

        /* 0.5秒内平滑过渡 */
        i {
          margin-right: 8px;
        }
      }

      .gitee:hover {
        /* 鼠标划入时的背景颜色 */
        background-color: #80272a;
        cursor: pointer;
      }

      .lx {
        margin-top: 14px;
        text-align: center;

        i {
          margin-left: 10px;
          font-size: 24px;
          color: #aac9fa;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .hy {
      margin-top: 5px;
      height: 170px;

      .ht {
        display: flex;
        align-items: center;

        i {
          margin-top: 10px;
          margin-left: 10px;
          font-size: 30px;
          color: #aac9fa;
        }

        span {
          margin-left: 10px;
          margin-top: 10px;
          color: #aac9fa;
          font-weight: bold;
          font-family: "Courier New", Courier, monospace;
        }
      }

      p {
        font-size: 16px;
        margin-top: 10px;
        text-indent: 2em;
        line-height: 22px;
        color: black;
        font-family: KaiTi;
      }
    }

    .gg {
      margin-top: 5px;
      height: 500px;

      .gt {
        display: flex;
        align-items: center;

        i {
          margin-top: 10px;
          margin-left: 10px;
          font-size: 30px;
          color: #aac9fa;
        }

        span {
          margin-left: 10px;
          margin-top: 10px;
          color: #aac9fa;
          font-weight: bold;
          font-family: "Courier New", Courier, monospace;
        }
      }

      .tpbt {
        margin-top: 10px;
        display: flex;
        align-items: center;

        .tp {
          margin-left: 10px;
          margin-top: 10px;
          width: 80px;
          height: 70px;

          img {
            border-radius: 8%;
            width: 80px;
            /* 图片宽度设置为容器宽度 */
            height: 70px;
            /* 图片高度设置为容器高度 */
            object-fit: cover;
          }
        }

        .bt {
          margin-left: 6px;

          p {
            margin-top: 10px;
            font-size: 14px;
            line-height: 20px;
            color: black;
            font-family: KaiTi;
          }

          span {
            color: #aac9fa;
            font-size: 12px;
          }
        }
      }

      .tpbt:hover {
        cursor: pointer;
      }
    }

    .zx {
      margin-top: 5px;
      height: 180px;

      .zt {
        display: flex;
        align-items: center;

        i {
          margin-top: 10px;
          margin-left: 10px;
          font-size: 30px;
          color: #aac9fa;
        }

        span {
          margin-left: 10px;
          margin-top: 10px;
          color: #aac9fa;
          font-weight: bold;
          font-family: "Courier New", Courier, monospace;
        }
      }

      .ztt {
        margin: 10px 18px 0 18px;
        color: #aac9fa;

        .ps {
          display: flex;
          justify-content: space-between;

          span {
            font-weight: bold;
          }
        }
      }
    }
  }
}

.gl {
  margin-top: 165px;
  text-align: center;

  i {
    font-size: 60px;
    color: #3fa8db;
  }
}

.tm i {
  font-size: 30px;
  opacity: 0;
}

.g2 {
  margin-top: 230px;
  text-align: center;
}
</style>
