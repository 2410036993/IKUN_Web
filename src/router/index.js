import {
  createRouter,
  createWebHistory
} from 'vue-router'
const router = createRouter({
  // 根据开发环境选择
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      showLoader: true
    },
    redirect: '/home',
    children: [{
        path: '/home',
        component: () => import('@/views/Home/index.vue')
      },
      {
        path: '/photo',
        component: () => import('@/views/PhotoAlbum/index.vue')
      },
      {
        path: '/photo/:id/:category',
        component: () => import('@/views/PhotoAlbum/components/PhotoDetail.vue')
      },
      {
        path: '/category',
        component: () => import('@/views/Category/index.vue')
      },
      {
        path: '/label',
        component: () => import('@/views/Label/index.vue')
      },
      {
        path: '/allarticle/:name/:id',
        component: () => import('@/components/ArticleClassify.vue')
      },
      {
        path: '/pigeonhole',
        component: () => import('@/views/Pigeonhole/index.vue')
      },
      {
        path: '/message',
        component: () => import('@/views/MessageBoard/index.vue')
      },
      {
        path: '/talk',
        component: () => import('@/views/Talk/index.vue')
      },
      {
        path: '/link',
        component: () => import('@/views/FriendlyLink/index.vue')
      },
      {
        path: '/article/:id',
        component: () => import('@/views/Article/index.vue')
      },
      {
        path: '/aboutme',
        component: () => import('@/views/AboutMe/index.vue')
      },
      {
        path: '/learning',
        component: () => import('@/views/LearningPath/index.vue')
      }
    ]
  }]


})

// 默认导出
export default router