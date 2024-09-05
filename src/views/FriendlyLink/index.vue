<script setup>
import Loading from '@/components/Loading.vue';
import useLoading from '@/composables/useLoading';
import BgBoard from '@/components/BgBoard.vue';
import { onMounted, ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus';
import { applyForLink, queryApply, getLinklist, updateLink } from '@/api/link.js'
const { isLoading } = useLoading()
// 友链数据
const linkList = ref([])
// 获取友链数据
const getLinkList = async () => {
  const res = await getLinklist()
  console.log(res);
  linkList.value = res.data
}
onMounted(() => {
  window.scrollTo(0, 0);
  getLinkList()
})

// 跳转链接
const goToPath = (path) => {
  window.open(path)
}
// 友链id
const linkId = ref()
// 申请链接弹层
const linkDiglog = ref(false)
const onLink = (id) => {
  if (id) {
    linkId.value = id
    linkDiglog.value = true
    // 修改
    const link = linkList.value.find(item => item.id === linkId.value)
    linkForm.value.name = link.name
    linkForm.value.description = link.description
    linkForm.value.linkAddress = link.linkAddress
    linkForm.value.linkUrl = link.linkUrl
    linkForm.value.id = id
  } else {
    linkDiglog.value = true
  }
}


// 表单数据(友链数据)
const linkForm = ref({
  name: '',
  description: '',
  linkAddress: '',
  linkUrl: '',
  identification: ''
})
// 表单
const linkFormRef = ref(null)
// 表单校验规则
const linkFormRules =
{
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { pattern: '^\\S{1,12}$', message: '网站不能超过12个字符', trigger: 'blur' }
    // 注意：max 规则默认是包括空格的，如果需要排除空格，可以使用自定义验证  
  ],
  description: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { pattern: '^\\S{1,16}$', message: '描述不能超过16个字符', trigger: 'blur' }
    // 同样，如果需要排除空格，使用自定义验证  
  ],
  linkAddress: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  identification: [
    { required: true, message: '请输入标识', trigger: 'blur' }
  ]
}
// 关闭弹层
const closeDiglog = () => {
  // 清楚表单校验规则
  linkFormRef.value.resetFields()
  linkDiglog.value = false
  // 清除表单数据  
  linkForm.value = {
    name: '',
    description: '',
    linkAddress: '',
    linkUrl: ''
  };
  linkId.value = ''
}
// 上传头像
const handleAvatarSuccess = (response) => {
  // 接收到响应对象
  linkForm.value.linkUrl = response.data
}
// 确认申请
const handleOk = () => {
  linkFormRef.value.validate(async (isOk) => {
    if (isOk) {
      if (linkId.value) {
        // todo修改接口
        console.log("修改");
        await updateLink(linkForm.value)
        window.localStorage.setItem("linkUser", JSON.stringify(linkForm.value))
        ElMessage.success("12小时内审核完成期待你的友链");
        linkDiglog.value = false
      } else {
        // 发起友链申请
        const res = await applyForLink(linkForm.value)
        // 将信息存储到本地中
        window.localStorage.setItem("linkUser", JSON.stringify(linkForm.value))
        ElMessage.success(res.data)
        linkDiglog.value = false
      }
    }
  })
}
// 反馈消息
const feedback = async () => {
  // 获取到本地的友链信息
  const jsonLink = window.localStorage.getItem("linkUser")
  // 判断
  if (!jsonLink) {
    return
  }
  // 转换json
  const linkForm = JSON.parse(jsonLink)
  // 将唯一的地址传给后端
  const res = await queryApply(linkForm.linkAddress)
  // 通知用户
  ElNotification({
    title: '审核详情',
    message: ({ style: 'color: #249bdb' }, res.data.message),
    type: res.data.status === 2 ? 'success' : 'error'
  })
}
// 组件挂载前
onMounted(() => {
  window.localStorage.getItem("linkUser") && feedback()
})
</script>

<template>
  <Loading :is-loading="isLoading" />
  <BgBoard title="友链" wengan="在这里，每条一友链，都是灵感跃动的桥梁" />
  <div class="friend">
    <div class="jsxx">
      <div class="js-box1">
        <i class="iconfont icon-xinxi" style="font-size: 22px;color:#9fbbe7;">&nbsp;本站信息</i>
        <p>网站名称: Hao's Blog</p>
        <p>网站地址: http://blog.haoyuming.top</p>
        <p>网站描述: 这是一个用来记录知识和生活的博客</p>
      </div>
      <div class="js-box2">
        <div class="sj">
          <i class="iconfont icon-shenqing" style="font-size: 22px;color:#9fbbe7;">&nbsp;申请方式</i>
          <p>点击右方按钮</p>
          <p>不会添加带有广告营销和没有实质性内容的友链</p>
          <p>申请之前请将本网站添加为您的友链哦</p>
        </div>
        <div class="an">
          <button type="button" class="btn" @click="onLink(null)">友链申请</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 友链展示 -->
  <div class="zs">
    <div class="zs-box" v-for="item in linkList" :key="item">
      <div class="box1">
        <img :src="item.linkUrl" class="bgn" alt="">
        <img :src="item.linkUrl" alt="" class="img-box">
        <i class="iconfont icon-xiugai" @click="onLink(item.id)"></i>
      </div>
      <div class="box2" @click="goToPath(item.linkAddress)">
        <h2 class="t">{{ item.name }}</h2>
        <h2 class="xg">{{ item.description }}</h2>
      </div>
    </div>
  </div>
  <!-- 申请弹层 -->
  <el-dialog center style="background-color: #434345;border-radius: 10px;" width="600px" v-model="linkDiglog"
    @close="closeDiglog">
    <template #title>
      <span style="color:#97bbe7;font-weight: bold;">友链绘卷展开</span>
    </template>
    <!-- 头像 -->
    <el-upload style="margin-left:227px; height: 80px;width: 80px;border-radius: 4px;border: 1px solid #409eff;"
      :on-success="handleAvatarSuccess" action="/prod-api/web/link/fileUpload" show-file-list="false">
      <img v-if="linkForm.linkUrl" :src="linkForm.linkUrl" class="avatar" />
      <el-button v-else
        style="background-color: #434345;border: none;margin:34px 0px 0px 23px;font-size: 13px;width: 15px;height: 15px;"><span
          style="color: #8597b4;">+</span></el-button>
    </el-upload>
    <!-- 表单 -->
    <el-form ref="linkFormRef" :model="linkForm" :rules="linkFormRules" label-width="80px">
      <el-form-item class="lyinput" label="网站名称" prop="name" style="margin: 20px 0 0 65px;">
        <el-input placeholder="请填写网站名称" :maxLength="20" v-model="linkForm.name" style="width: 240px;"></el-input>
      </el-form-item>
      <el-form-item class="lyinput" label="网站描述" prop="description" style="margin: 20px 0 0 65px;">
        <el-input placeholder="请填写网站描述" :maxLength="20" v-model="linkForm.description"
          style="width: 240px;background-color: #434345;"></el-input>
      </el-form-item>
      <el-form-item class="lyinput" label="网站地址" prop="linkAddress" style="margin: 20px 0 0 65px;">
        <el-input placeholder="请填写网站地址" :maxLength="20" v-model="linkForm.linkAddress"
          style="width: 240px;background-color: #434345;"></el-input>
      </el-form-item>
      <el-form-item class="lyinput" label="网站标识" prop="identification" style="margin: 20px 0 0 65px;">
        <el-input placeholder="请填写网站标识" type="password" :maxLength="20" v-model="linkForm.identification"
          style="width: 240px;background-color: #434345;"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="closeDiglog">取 消</el-button>
        <el-button size="small" type="primary" @click="handleOk" :loading="confirmLoading">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.avatar {
  width: 80px;
  height: 80px;
}

.dialog-footer {
  margin-right: 30px;
}


:deep(.el-form-item__label) {
  color: #dcdfe6;
}

.lyinput {
  border-radius: 20px;

  :deep(.el-input__wrapper) {
    background-color: #dcdfe6;
    border-radius: 8px;

  }

  :deep(.el-input__wrapper .el-input__inner::placeholder) {
    color: #434345;
    font-size: 13px;
    font-weight: bold;

  }

  :deep(.el-input__wrapper .el-input__inner) {
    color: #131f2b;
  }
}

.zs {
  width: 930px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;


  .zs-box {
    border-radius: 8px;
    width: 300px;
    height: 150px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;

    &:hover {
      transform: perspective(500px) rotateX(-5deg);

      .box1 {
        .img-box {
          transform: translateY(-150px);
        }

        .bgn {
          opacity: 0.4;
        }
      }

      .box2 {
        cursor: pointer;
        transform: translateY(-50px);
        color: #aac9fa;
        font-weight: bold;

        .xg {
          opacity: 1;
        }
      }
    }

    .box2 {
      color: #8597b4;
      position: absolute;
      transition: all 0.4s ease;

      /* 添加过渡效果 */
      h2 {
        margin-left: 10px;
        z-index: 10;
        font-weight: bold;
      }

      .xg {
        font-size: 18px;
        opacity: 0;
      }

    }

    .box1 {
      display: flex;
      justify-content: space-between;
      overflow: hidden;

      .bgn {
        position: absolute;
        width: 300px;
        height: 150px;
        object-fit: cover;
        opacity: 0.6;
        transition: all 0.4s ease;
      }

      .img-box {
        margin: 10px 0 0 5px;
        width: 75px;
        height: 75px;
        border-radius: 50%;
        z-index: 10;
        transition: all 0.4s ease;
      }

      i {
        margin: 10px 5px 0 0;
        font-size: 20px;
        z-index: 10;
        color: #aac9fa;
        font-weight: bold;
      }
    }

  }
}

.friend {
  border-radius: 20px;
  margin: 20px auto;
  width: 930px;
  height: 320px;
  background-color: #626a73;
  border: 1px solid #aac9fa;
  box-shadow: 0 5px 15px #8597b4;

  .jsxx {
    width: 100%;
    height: 320px;
    border-radius: 20px;

    .js-box1 {
      margin-top: 14px;
      margin-left: 20px;

      p {
        margin-left: 30px;
        color: #1f2d3d;
        font-family: cursive;
        font-weight: bold;
        font-size: 17px;
      }
    }

    .js-box2 {
      margin-left: 20px;
      display: flex;

      p {
        margin-left: 30px;
        color: #1f2d3d;
        font-family: cursive;
        font-weight: bold;
        font-size: 17px;
      }

      .an {
        margin-left: 410px;
        display: flex;

        .btn {
          margin-top: 108px;
          align-items: center;
          appearance: none;
          background-image: radial-gradient(100% 100% at 100% 0, #8197b4 0, #aac9fa 100%);
          border: 0;
          border-radius: 6px;
          box-shadow: rgba(40, 30, 60, .2) 0 2px 3px, rgba(40, 30, 60, .2) 0 7px 10px -3px, rgba(53, 62, 101, .5) 0 -3px 0 inset;
          box-sizing: border-box;
          color: #fff;
          cursor: pointer;
          display: inline-flex;
          font-family: "JetBrains Mono", monospace;
          height: 33px;
          justify-content: center;
          line-height: 1;
          list-style: none;
          overflow: hidden;
          padding-left: 16px;
          padding-right: 16px;
          position: relative;
          text-align: left;
          text-decoration: none;
          transition: box-shadow .15s, transform .15s;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          white-space: nowrap;
          will-change: box-shadow, transform;
          font-size: 17px;
        }

        .btn:focus {
          box-shadow: #aac9fa 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #aac9fa 0 -3px 0 inset;
        }

        .btn:hover {
          box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #aac9fa 0 -3px 0 inset;
          transform: translateY(-2px);
        }

        .btn:active {
          box-shadow: #aac9fa 0 3px 7px inset;
          transform: translateY(2px);
        }
      }
    }
  }
}
</style>