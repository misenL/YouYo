<template>
    <div>
        <!-- themeColor -->
        <!-- 搜索框 -->
        <div class="mySearch themeColor">
            <!-- <img class="searchClose" src="../../static/appIcon/leftArrow.png" alt="" srcset=""> -->
            <div class="inputAndClose">
                <input 
                 v-model="search" 
                 class="inputContent" 
                 type="text"
                 @blur="searchBlur"
                 @focus="searchFocus"
                 placeholder='输入游戏名搜索'/>
                <img @click="closeSearch" src="../../static/appIcon/close.png" alt="" srcset="">                
            </div>
            <button @click="toSearch" class="searchButton">搜索</button>
        </div>
        <!-- end -->
        <div class="topList">
            <div class="overHidden">
                <ul>
                    <li v-for="item in items"
                      :key="item.id"
                      :class="{Listactive:item.isList}"
                      v-on:click="switchList(item)">
                        <span><b>{{item.label}}</b></span><span class="rightBorder"></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ListContent">
            <transition class="Router" :name="transitionName">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
  name: 'gameHome',
  data() {
      return {
            transitionName: 'slide-right',
            search: '',
            items: [
                {label: '热推', isList:true,  id:1},
                {label: '榜单', isList:false, id:2},
                {label: '单机', isList:false, id:3},
                {label: '生存', isList:false, id:4},
                {label: '竞技', isList:false, id:5},
                {label: '动作', isList:false, id:6},
                {label: '卡牌', isList:false, id:7},
                {label: '益智', isList:false, id:8},
                {label: 'MOBA', isList:false, id:9},
            ]
      }
  },
  methods: {
      // 清空搜索
      closeSearch () {
          this.search = ''
      },
      // 点击搜索按钮
      toSearch () {
          if (this.search != '') {
            // 跳转到搜索内容页
            this.$router.push({
                path:'/mySearch/searchList',
                query:{
                    searchCon: this.search,
                }
            });        
          }
      },
      // 文本框失焦
      searchBlur () {
          console.log('blur');
      },
      // 文本框或焦
      searchFocus () {
          console.log('focus');
      },
      switchList(ele) {
        console.log(ele);
        //循环所有列表
        this.items.forEach(function (el) {
            el.isList = false;
        });
        ele.isList = true;
        // 两次加载路由
        this.$router.push({
            path:'/',
            query:{
                id: ele.id,
            }
        });        
        this.$router.push({
            path:'/gameList/listContent',
            query:{
                id: ele.id,
                label: ele.label
            }
        });    
      }
  }
}
</script>

<style>
/* topList start */
.topList {
    position: fixed;
    width: 100%;
    height: 7vh;
    /* background: #f3f; */
    overflow: hidden;
    border-bottom: 1px solid #eee;
}
.overHidden {
    overflow-x: scroll;
    height: 1rem;
}
.topList ul {
    width: 12.1rem;
    height: 1rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
.topList li {
    /* background: #000; */
    float: left;
    width: 2rem;
    height: 1rem;;
    font-size: .28rem;
    text-align: center;
    line-height: .8rem;
    display: flex;
    align-items: center;
    justify-content:flex-end;
}
.topList span {
    display: block;
    height: .8rem;
    width: 20%;
}
.topList span b {
    margin-left: -.08rem;
}
.rightBorder {
    display: block;
    width: 35%!important;
    border-right: 1px solid  #eee;
    height: .4rem!important;
}
.Listactive span:first-child {
    /* background: #e3e3e3; */
    border-bottom: 3px solid rgb(50, 179, 230);
}
/* end */
.ListContent {
    position: absolute;
    margin-top: 1rem;
    margin-bottom: 8vh;
    width: 100%;
    height: 76.5vh;
    padding-bottom: 8.5vh;
    overflow-y: auto;
}
/*路由跳转动画*/
.Router {
     position: absolute;
     width: 100%;
     transition: all .8s ease;
     top: 40px;
}

.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
/* end */
/* search style */
.mySearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
}
.searchClose {
    width: .38rem;
    height: .38rem;
    margin-left: .32rem;
}
.inputAndClose {
    display: flex;
    align-items: center;
}
.inputAndClose> img {
    width: 4vw;
    height: 4vw;
    margin-left: -5.5vw;
}
.inputContent {
    /* width: 54vw; */
    width: 58vw;    
    height: 3.4vh;
    padding-left: .2rem;
    padding-right: 7vw;
    border: none;
    outline: none;
    border-radius: 1.7vh;
    font-size: .24rem;
    letter-spacing: 2px;
    margin-left: .5rem;    
}
.searchButton {
    outline: none;
    border: none;
    border-radius: 1.2vh;
    width: 13vw;
    height: 3.5vh;
    margin-right: .4rem;
    background: white;
    letter-spacing: 1px;
}
/* end */
</style>
