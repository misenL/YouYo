import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '登 录',
    userImg: '',
    userSex: '',
    userEmail: 'xxxxx@xx.com',
    userSeting: [1, 1, 0],
    userCollection: [],
    userDown: [],
    userAPKAdmin: [],
    // 记录底部切换
    recordNav: 4,
  },
  mutations: {
    setUserName(state, data) {
      state.userName = data;
    },
    setUserEmail(state, data) {
      state.userEmail = data;
    },
    setUserImg(state, data) {
      state.userImg = data;
    },
    setUserSex(state, data) {
      state.userSex = data;
    },
    setUserSeting(state, data) {
      state.userSeting = data
    },
    setUserCollection(state, data) {
      state.userCollection = data
    },
    setRecordNav(state, data) {
      state.recordNav = data
    },
    setUserDown(state, data) {
      state.userDown = data
    },
    setUserAPKAdmin(state, data) {
      state.userAPKAdmin = data      
    }
  },
  plugins: [vuexAlong]
})

// // 全部保存
// vuexAlong.watch(['userName'],true);
// vuexAlong.watch(['userPath'],true);
 
// const state = {
//     userName: 'name',
//     userPath: 'img'
// };
// const mutations = {}
// export default new Vuex.Store({
//   state: state,
//   mutations: mutations,
//   plugins:[vuexAlong]
// })
