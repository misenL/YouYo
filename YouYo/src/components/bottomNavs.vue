<template>
    <div>
        <router-view></router-view>        
        <div class="gameNav">
        <ul>
            <li
             v-for="item in gameNavs"
             :key="item.index"
             @click="changeRouter(item.index)">
                <div class="navDiv" :class="item.choose?'navThemeColor':''">
                    <img :src="item.icon1" alt="">
                </div>
                <span>{{item.name}}</span>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    name : 'bottomNavs',
    data () {
        return {
            gameNavs: [
                {name: '空间', icon1: './static/appIcon/one.png', choose: false, index: 0},
                {name: '动态', icon1: './static/appIcon/two.png', choose: false, index: 1},
                {name: 'games', icon1: './static/appIcon/three.png', choose: false, index: 2}
            ],
        }
    },
    created () {
        if (this.$store.state.recordNav == 4) {
            this.gameNavs[0].choose = true
        }else {
            this.gameNavs[this.$store.state.recordNav].choose = true
        }
    },
    methods: {
        changeRouter(index) {
            console.log(index);
            this._data.gameNavs.forEach((el, index) => {
                el.choose = false;
            });
            switch (index) {
                case 0:
                // 切换路由首页
                    this.$router.push({
                    path:'/',
                        // query:{
                        //     id: ele.id,
                        // }
                    });
                    this._data.gameNavs[index].choose = true;
                    this.$store.commit('setRecordNav', 0);
                    break;
                case 1:
                // 切换路由分类推荐
                    this.$router.push({
                    path:'/gameList/listContent',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    this._data.gameNavs[index].choose = true;
                    this.$store.commit('setRecordNav', 1);                    
                    break;
                case 2:
                // 切换路由个人中心
                    this.$router.push({
                    path:'/personalContent',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    this._data.gameNavs[index].choose = true;
                    this.$store.commit('setRecordNav', 2);                    
                    break;            
                // default:
                //     break;
            }
        }
    },
}
</script>

<style>
/* 底部的导航栏 */
.gameNav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8vh;
  background: #ffffff;
  border-top: 1px solid #eee;
}
.gameNav ul {
  display: flex;
  justify-content: space-around;
  font-size: .23rem;
  height: 8vh;
}
.gameNav li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.gameNav img {
  width: .4rem;
  height: .4rem;
  margin-bottom: .05rem;
}
.navDiv {
    width: .6rem;
    height: .6rem;
    border-radius: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
