import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import homePage from '@/components/homePage'
import bottomNavs from '@/components/bottomNavs'
import gameList from '@/components/gameList'
import listContent from '@/components/listContent'
import gameDetails from '@/components/gameDetails'
import introduction from '@/components/introduction'
import comment from '@/components/comment'
import personalContent from '@/components/personalContent'
import login from '@/components/login'
import register from '@/components/register'
import retrievePassword from '@/components/retrievePassword'
import myCollection from '@/components/myCollection'
import downAdmin from '@/components/downAdmin'
import modifyColor from '@/components/modifyColor'
import myPoster from '@/components/myPoster'
import myPosterDetails from '@/components/myPosterDetails'
import setingDetail from '@/components/setingDetail'
import modifyData from '@/components/modifyData'
import recommend from '@/components/recommend'
import mySearch from '@/components/search'
// 超级管理员
import superAdmin from '@/components/superAdmin'
// end


Vue.use(Router)

export default new Router({
  // history模式去掉url的“#”号
  // mode: 'history',
  mode: 'hash',
  routes: [
    // 首页，进入显示的页面
    {
      path: '/',
      name: 'bottomNavs',
      component: bottomNavs,
      children: [
        // 首页（收藏）的内容
        {
          path: '/',
          name: 'homePage',
          component: homePage
        },
        // 推荐的头部导航和router-view组件
        {
          path: '/gameList',
          name: 'gameList',
          component: gameList,
          children: [
            // 推荐的内容组件
            {
              path: 'listContent',
              name: 'listContent',
              component: listContent
            }
          ]
        },
        // 个人中心
        {
          path: '/personalContent',
          name: 'personalContent',
          component: personalContent
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 找回密码
    {
      path: '/retrievePassword',
      name: 'retrievePassword',
      component: retrievePassword
    },
    // 修改个人资料
    {
      path: '/modifyData',
      name: 'modifyData',
      component: modifyData
    },
    // 我的收藏
    {
      path: '/myCollection',
      name: 'myCollection',
      component: myCollection
    },
    // 下载管理
    {
      path: '/downAdmin',
      name: 'downAdmin',
      component: downAdmin
    },
    // 主题效果
    {
      path: '/modifyColor',
      name: 'modifyColor',
      component: modifyColor
    },
    // 我的贴子
    {
      path: '/myPoster',
      name: 'myPoster',
      component: myPoster
    },
    // 贴子详情
    {
      path: '/myPosterDetails',
      name: 'myPosterDetails',
      component: myPosterDetails
    },
    // 设置
    {
      path: '/setingDetail',
      name: 'setingDetail',
      component: setingDetail
    },

    // 游戏详情分类
    {
      path: '/gameDetails',
      name: 'gameDetails',
      component: gameDetails,
      children: [
        {
          path: 'introduction',
          name: 'introduction',
          component: introduction
        },
        {
          path: 'comment',
          name: 'comment',
          component: comment
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: recommend
        }
      ]
    },
    // 超级用户
    {
      path: '/superAdmin',
      name: 'superAdmin',
      component: superAdmin
    },
    // 搜索内容
    {
      path: '/mySearch',
      name: 'mySearch',
      component: mySearch,
      children: [
        {
          path: 'searchList',
          name: 'searchList',
          component: listContent
        }
      ]
    },
  ]
})
