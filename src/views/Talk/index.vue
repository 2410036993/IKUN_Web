<script setup>
import BgBoard from '@/components/BgBoard.vue';
import Loading from '@/components/Loading.vue';
import useLoading from './../../composables/useLoading.js'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { getTalk, saveTalkUser, updateLike, getIsLike, comment } from '@/api/talk'
import {  getWebsite } from '@/api/home.js'
const websiteData = ref({})
onMounted(async () => {
  const res = await getWebsite()
  websiteData.value = res.data
})
/**
 * Loading效果
 */
const { isLoading } = useLoading()


// 准备说说信息
const talkList = ref([])
// 获取所有的说说信息
const getTalkList = async () => {
  const res = await getTalk()
  talkList.value = res.data
}
// 获取说说信息
onMounted(() => {
  // 获取说说信息
  getTalkList()
  // 获取本地
  getTalkUser()
})

// 用户信息
const userInfo = ref({})
userInfo.value = {
  avatar: '',
  remork: '',
  userName: ''
}

// 从本地获取到用户信息
const getTalkUser = () => {
  // 获取到本地的说说用户信息
  const jsonLink = window.localStorage.getItem("talkUser")
  // 判断
  if (!jsonLink) {
    return
  }
  // 转换对象
  userInfo.value = JSON.parse(jsonLink)
}

// 说说头像上传
const handleAvatarSuccess = (response) => {
  userInfo.value.avatar = response.data
}

// 用户信息弹层
const isDislog = ref(false)
// 关闭弹层
const onClose = () => {
  isDislog.value = false
}
// 发送评论
const onRemork = async (id) => {
  console.log(id);
  // 判断用户是否有信息
  if (userInfo.value.avatar && userInfo.value.userName.trim('')) {
    // 有信息可以发送评论
    if (userInfo.value.remork.trim('')) {
      // 更新后端
      await comment(userInfo.value.talkUserId, id, userInfo.value.remork)
      // 提示用户
      ElMessage.success('言之有物 感激不尽！')
      // 渲染视图
      getTalkList()
      // 重置表单
      userInfo.value.remork = ''
    } else {
      // 没有输入但是有信息
      ElMessage('言语未至 心意难达！请留下您的宝贵言论再发送哦~')
    }
  } else {
    isDislog.value = true
  }
}


// 保存用户信息 
const handleOk = async () => {
  // 判断用户是否认证过了
  if (userInfo.value.avatar && userInfo.value.userName.trim('')) {
    // 保存到后端
    const res = await saveTalkUser(userInfo.value)
    userInfo.value.talkUserId = res.data
    // 存储到本地
    window.localStorage.setItem("talkUser", JSON.stringify(userInfo.value))
    // 提示用户登录成功
    ElMessage.success('认证成功 点赞与评论操作随你行！')
    // 认证过了关闭弹窗
    isDislog.value = false
  } else {
    // 用户没有认证
    ElMessage('认证小插曲 请检查信息后重试~')
  }
}

// 点赞
const onLike = async (id) => {
  console.log(id);
  // 用户认证了
  if (userInfo.value.avatar && userInfo.value.userName.trim('')) {
    // 查询用户是否已经点赞过了
    const res = await getIsLike(userInfo.value.talkUserId, id)
    const isLike = res.data
    // 修改点赞
    await updateLike(userInfo.value.talkUserId, isLike, id)
    // 修改数量
    if (isLike === 1) {
      ElMessage.success('点赞成功!')
      getTalkList()
    } else {
      ElMessage.success('取消成功!')
      getTalkList()
    }
    // 点赞成功
  } else {
    isDislog.value = true
  }
}
// 动态计算
</script>

<template>
  <Loading :is-loading="isLoading" />
  <BgBoard :title="'说说'" :wengan="'在这里，我拾取心语，留下足迹，每一步都编织成生活的诗篇'" />
  <div class="talk">
    <!-- 头像和背景的地方 -->
    <div class="tx-bg">
      <div class="box">
        <img class="bg" :src="websiteData.background" alt="">
        <h5>豪啊</h5>
        <div class="tx">
          <img :src="websiteData.avatar" alt="">
        </div>
      </div>
    </div>
    <!-- 说说的地方 -->
    <div class="ss">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="item in talkList" :key="item" class="infinite-list-item">
          <!-- 头像和文字 -->
          <div class="tx-wz">
            <div class="box">
              <img class="bg" src="../../assets/images/tx.jpg" alt="">
            </div>
            <!-- 头像和创建时间 -->
            <div class="hp">
              <h3>豪啊</h3>
              <p>{{ item.talk.createTime }}</p>
            </div>
          </div>
          <!-- 说说内容和图片 -->
          <div class="content">
            <div class="text">
              <p style="color: white;">{{ item.talk.content }}</p>
            </div>
            <div class="tp">
              <el-image :preview-src-list="item.urlList" :initial-index="index" class="ig" :src="img" fit="fill" v-for="(img,index) in item.urlList"
                :key="img" />
            </div>
            <!-- 点赞和评论 -->
            <div class="dp">
              <i :class="{ 'iconfont': true, 'icon-pinglun': true, }" style="font-size: 22px;"></i>
              <span v-if="item.commentList !== null && item.commentList.length" style="margin-left: 7px;
              ">{{ item.commentList.length }}</span>
              <i :class="{ 'iconfont': true, 'icon-xihuan': true, 'i-active': item.isLike }"
                @click="onLike(item.talk.id)"></i>
              <span v-if="item.talk.likeCount" style="margin-left: 5px;">{{ item.talk.likeCount }}</span>
            </div>
            <!-- 点赞列表 -->
            <div class="box">
              <!-- 点赞图标 -->
              <div class="is">
                <i class="iconfont icon-xihuan"> </i>
              </div>
              <!-- 点赞过的用户的头像 -->
              <div class="dzlist">
                <div class="box" v-for="item in item.talkUserList" :key="item">
                  <img :src="item.url" alt="">
                </div>
              </div>
            </div>
            <!-- 评论列表 -->
            <div class="pl-box" >
              <div class="pl">
                <i class="iconfont icon-pinglun"></i>
              </div>
              <!-- 默认的评论 -->
              <div class="box">
                <!-- 头像 -->
                <div class="img-box">
                  <img src="../../assets/images/tx.jpg" alt="">
                </div>
                <!-- 名称和评论语 -->
                <div class="my">
                  <div class="nt">
                    <span style="font-weight: bold;">豪啊</span>
                    <span>2024-06-19 11:03:06</span>
                  </div>
                  <div class="i" style="position: relative;">
                    <span style="font-weight: 600;">大家可以随意留言哦</span>
                    <i class="iconfont icon-shanchu" style="position: absolute;top: 0%;left: 90%;"></i>
                  </div>
                </div>
              </div>
              <div class="box" v-for="comment in item.commentList" :key="comment">
                <!-- 头像 -->
                <div class="img-box">
                  <img :src="comment.userUrl" alt="">
                </div>
                <!-- 名称和评论语 -->
                <div class="my">
                  <div class="nt">
                    <span style="font-weight: bold;">{{ comment.name }}</span>
                    <span>{{ comment.tcCreateTime }}</span>
                  </div>
                  <span>{{ comment.comment }}</span>
                </div>
              </div>
            </div>
            <!-- 用户评论 -->
            <div class="talk-box">
              <!-- 头像地方 -->
              <div class="img-box">
                <!-- 头像地方 -->
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                <img v-else src="../../assets/images/avatar.jpg" class="avatar" @click="onRemork" />
              </div>
              <!-- 输入框 -->
              <input placeholder="说点什么吧..." v-model="userInfo.remork" class="input"
                @keyup.enter="onRemork(item.talk.id)" />
              <!-- 发送按钮 -->
              <button type="button" class="btn" @click="onRemork(item.talk.id)">评论</button>
            </div>
            <el-dialog style="background-color: #626a73;border-radius: 10px;" center width="400px" v-model="isDislog"
              @close="onClose">
              <template #header>
                <span style="color: #aac9fa;font-weight: bold;font-size: 18px;">点赞与评论的专属印记</span>
              </template>
              <el-upload
                style="margin-left:134px; height: 65px;width: 65px;border-radius: 4px;border: 1px solid #91c1e4;"
                :on-success="handleAvatarSuccess" action="/prod-api/web/talk/fileUpload">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                <el-button v-else
                  style="background-color: #626a73;border: none;margin:24px 0px 0px 16px;font-size: 13px;width: 15px;height: 15px;"><span
                    style="color: #8597b4;">+</span></el-button>
              </el-upload>
              <el-input placeholder="为评论起个名字" v-model="userInfo.userName" class="pinlun-input"></el-input>
              <template #footer>
                <div class="dialog-footer" style="display: flex;">
                  <el-button size="small" @click="onClose" style="margin-left: 114px;">取 消</el-button>
                  <el-button size="small" type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
                </div>
              </template>
            </el-dialog>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.talk {
  border-radius: 20px;
  margin: 20px auto;
  width: 1030px;
  height: 1600px;
  background-color: #626a73;
  border: 1px solid #aac9fa;
  box-shadow: 0 5px 15px #8597b4;

  .ss {
    margin: 20px auto;
    width: 1000px;

    .infinite-list {
      width: 100%;
      height: 1140px;
      padding: 0;
      list-style: none;


      .infinite-list-item {
        display: flex;
        flex-direction: column;
        margin: 10px;
        border-bottom: 2px solid #aac9fa;

        .avatar {
          margin-right: 3px;
          border-radius: 3px;
          width: 66px;
          height: 66px;
        }

        .pinlun-input {
          margin: 20px 0px 0px 70px;
          width: 200px;

          :deep(.el-input__wrapper) {
            border-radius: 20px;
          }
        }

        .talk-box {
          width: 700px;
          height: 80px;
          display: flex;
          align-items: center;

          .btn {
            width: 70px;
            height: 36px;
            border-radius: 8px;
            background-color: #aac9fa;
            color: #8597a6;
            font-weight: bold;
            text-align: center;
            opacity: 0.5;
            border: none;
          }

          .btn:hover {
            cursor: pointer;
            border: 1px solid lightcyan;
          }

          .input {
            margin-right: 3px;
            padding: 3px;
            border: none;
            margin-left: 10px;
            width: 560px;
            height: 30px;
            border-radius: 8px;
            background-color: #aac9fa;
            opacity: 0.5;
          }

          .input:focus {
            border: none;
            outline: 2px solid #91c1e4;
            /* 取消默认的轮廓（如果需要） */
            border-color: #42a5f5;

            /* 自定义边框颜色 */
            box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
          }

          img {
            width: 45px;
            height: 45px;
          }

          .icon-hover:hover {
            cursor: pointer;
          }
        }

        .pl-box {
          margin-top: 19px;
          display: flex;
          font-size: 13px;
          flex-wrap: wrap;

          .pl {
            margin-top: 3px;

            i {
              font-size: 22px;
              color: #aac9e4;
            }
          }

          .img-box {
            margin-left: 9px;
            margin-right: 3px;

            img {
              margin-right: 3px;
              border-radius: 8px;
              width: 36px;
              height: 36px;
            }

            .icon-hover:hover {
              cursor: pointer;
            }
          }

          .box {
            .zk:hover {
              cursor: pointer;
            }

            .my {
              width: 620px;

              .nt {
                margin-bottom: 3px;
                display: flex;
                justify-content: space-between;
                align-items: start;

                span {
                  color: #8597b4;
                }
              }

              span {
                color: white;
              }
            }
          }

          .box:nth-child(n+3) {
            margin-left: 21px;
          }
        }

        .box {
          margin-top: 3px;
          display: flex;

          .is {
            margin-top: 3px;

            i {
              font-size: 22px;
              color: #aac9e4;
            }
          }

          .dzlist {
            margin-bottom: 0;
            margin-left: 9px;
            color: #7c97b4;
            display: flex;
            flex-wrap: wrap;
            width: 890px;

            .box {
              margin-top: 3px;

              img {
                margin-right: 3px;
                border-radius: 6px;
                width: 36px;
                height: 36px;
              }
            }
          }
        }

        .dp {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: end;
          width: 700px;
          height: 30px;

          i {
            color: white;
            margin-bottom: 2px;
            margin-left: 24px;
            font-size: 25px;
          }

          i:hover {
            cursor: pointer;
          }

          .i-active,
          span {
            color: #aac9e4;
          }
        }

        .content {
          margin-left: 10px;
          width: 700px;
          margin-top: 0;

          p {
            margin-right: 5px;
          }

          .tp {
            width: 750px;
            height: 235px;
            display: flex;

            .ig {
              margin-right: 5px;
              width: 230px;
              height: 230px;
              object-fit: cover;
            }
          }
        }



        .tx-wz {
          margin-left: 10px;
          margin-top: 13px;
          width: 300px;
          height: 80px;
          display: flex;
          padding-bottom: 0;

          .box {
            width: 80px;
            height: 80px;
            border-radius: 5px;
            display: flex;

            .bg {
              border-radius: 5px;
              width: 80px;
              height: 80px;
              object-fit: cover;
            }
          }

          .hp {
            margin-top: 2px;
            margin-left: 10px;
            color: #8597b4;

            h3 {
              margin-top: 10px;
              font-weight: bold;
            }

            p {
              font-weight: normal;
              font-size: 14px;
            }
          }

        }

        .infinite-list .infinite-list-item+.list-item {
          margin-top: 10px;
        }
      }
    }

  }

  .tx-bg {
    width: 100%;
    height: 400px;

    .box {
      width: 100%;
      height: 400px;
      border-radius: 20px;
      position: relative;

      .bg {
        border-radius: 20px 20px 3px 3px;
        width: 100%;
        height: 330px;
        object-fit: cover;
      }


      h5 {
        position: absolute;
        left: 76%;
        top: 58%;
        font-size: 30px;
        color: #aac9e4
      }

      .tx {
        position: absolute;
        left: 83%;
        top: 66%;
        width: 150px;
        height: 150px;

        img {
          border-radius: 15px;
          width: 130px;
          height: 130px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>