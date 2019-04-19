<template>
    <div class="mySearchPage">
        <!-- 搜索框 -->
        <div class="AmySearch themeColor">
            <img class="AsearchClose" @click="searchReturn" src="../../static/appIcon/leftArrow.png" alt="" srcset="">
            <div class="AinputAndClose">
                <input 
                 v-model="search" 
                 class="AinputContent" 
                 type="text"
                 @blur="searchBlur"
                 @focus="searchFocus"
                 placeholder='输入游戏名搜索'/>
                <img @click="closeSearch" src="../../static/appIcon/close.png" alt="" srcset="">                
            </div>
            <button @click="toSearch" class="AsearchButton">搜索</button>
        </div>
        <!-- end -->
        <div class="searchContent">
            <ul class="listUl" v-on:touchstart="hiddenMenu">
                <li class="listGame"
                v-for="item in list"
                :key="item.id"
                v-bind:class="{touchColor:item.touch}"
                v-on:touchstart="touchColor(item)"
                v-on:touchend="removeColor"
                @click="checkIntro(item)">
                    <div>
                        <img class="listLeft" :src="item.apkIcon" alt="" srcset="">
                        <div class="listText">
                            <span>{{item.apkName}}</span>
                            <span>{{item.apkStar[0]}}</span>
                            <span>{{item.apkCreate}}</span>                 
                        </div>
                        <div class="listRight"
                        v-on:click.stop="showMenu(item)"
                        v-on:touchstart.stop="">
                            <span></span>
                            <span></span>
                            <span></span>                 
                        </div>
                    </div>
                    <transition name="slide-fade">
                        <div class="listMenu" v-if="item.menuShow" 
                        v-on:click.stop="listMenu(item)"
                        v-on:touchstart.stop="">
                            <li @click="listMenuItem(1,item)" class="ifTrueColor" v-if="item.ifInstall">已安装</li>
                            <li @click="listMenuItem(1,item)" v-else="item.ifInstall">安装</li>                    
                            <li @click="listMenuItem(2,item)">详情</li>
                            <li @click="listMenuItem(3,item)" class="ifTrueColor" v-if="item.ifCollect">取消收藏</li>
                            <li @click="listMenuItem(3,item)" v-else="item.ifCollect">收藏</li>                    
                        </div>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mySearch',
    data () {
        return {
            search: '',
            page: 1,
            pageSize: 10,
            list: []
        }
    },
    created() {
        console.log(this.$route.query.searchCon);
        let str = this.$route.query.searchCon
        this.$http.post(this.HOST+'getAPKInfo/search',{
            searchContent: str
        },{
            emulateJSON: true
        }).then(function (resp) {
            console.log(resp);
            for(let i in resp.body) {
                resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                resp.body[i].menuShow = false
            }
            this.list = resp.body;
        },function (resp) {
            // 发生错误
            alert('抱歉服务器异常')                
        })
    },
    methods: {
        // 返回按钮
        searchReturn () {
            this.$router.push({
                path:'/gameList/listContent',
                query:{
                    // id: ele.id,
                }
            });        
        },
        // 清空搜索
        closeSearch () {
            this.search = ''
        },
        // 点击搜索按钮
        toSearch () {
            if (this.search != '') {
                // 更新搜索内容
                this.$http.post(this.HOST+'getAPKInfo/search',{
                    searchContent: this.search
                },{
                    emulateJSON: true
                }).then(function (resp) {
                    console.log(resp);
                    for(let i in resp.body) {
                        resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                        resp.body[i].menuShow = false
                    }
                    this.list = resp.body;
                },function (resp) {
                    // 发生错误
                    alert('抱歉服务器异常')                
                })
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
        //显示菜单
        showMenu(ele) {
            console.log(ele);
            //循环隐藏所有列表                
            this.list.forEach(function (el) {
                el.menuShow = false;
            });
            ele.menuShow = true;
        },
        //菜单触发的函数
        listMenu(ele) {
            console.log(ele);
            
        },
        listMenuItem(number,ele) {
            console.log(number,ele);
            if (number == 2) {      // 详情
                this.$router.push({
                    path:'/gameDetails/introduction',
                    query:{
                        _id: ele._id,
                    }
                })
            }
        },
        //手指触摸li变背景色
        touchColor(ele) {
            ele.touch = true;
        },
        //手指离开屏幕取消li背景色
        removeColor() {
            this.list.forEach(function (el) {
                el.touch = false;
            })
        },
        //点击屏幕隐藏菜单
        hiddenMenu(ele) {
            console.log('hiddenMenu');
            //循环隐藏所有列表                
            this.list.forEach(function (el) {
                el.menuShow = false;
            });
        },
        //查看游戏详情
        checkIntro(ele) {
            console.log(ele);
            this.$router.push({
                path:'/gameDetails/introduction',
                query:{
                    _id: ele._id,
                }
            })
        }
    }
}
</script>

<style>
/* .mySearchPage {

} */
/* this is list content  */
.listUl {
    margin-left: .2rem;
}
/*手指触摸屏幕li变色*/
.touchColor {
    background: #f0f0f080;
}
.listGame div:first-child {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #eee;
}
.listLeft {             /*this is img style*/
    width: 1rem;
    height: 1rem;
    margin: .12rem;
    border-radius: .2rem
}
.listText {
    width: 5rem;
    margin-left: .05rem;
    font-size: .23rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.listRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
/* end */
.listText span:first-child {
    margin: .1rem 0 .0rem  0;
}
.listRight span {
    background: #adadad;
    height: 4px;
    width: 4px;
    border-radius: 2px;
    margin: 0.02rem
}
.listText span:nth-of-type(2) {
    color: rgb(25, 25, 253);
    font-weight: 600;
    /* margin-bottom: .15rem */
}
.listText span:last-child {
    color: #bdbdbd;
    margin-bottom: .1rem
}
/* end */
/* this is list in menu */
.listMenu {
    width: 2.1rem;
    position: absolute;
    font-size: .26rem;
    right: .5rem;
    margin-top: -.9rem;
    text-align: left;
    border-radius: .1rem;
    border: 1px solid rgb(177, 222, 240);
    box-shadow: -4px 10px 10px #cfcfcf;
    background: white;
    z-index: 99;
}
.listMenu li {
    margin: .15rem 0;
    padding: 0 .5rem .05rem .3rem;
}
.ifTrueColor {
    color: #999999;
}
/* .listMenuShow {
    display: none;
} */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/* end */

.searchTop {
    height: 7vh;
}
.searchContent {
    height: 93vh;
    overflow-y: auto;
}
/* search style */
.AmySearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
}
.AsearchClose {
    width: .38rem;
    height: .38rem;
    margin-left: .32rem;
}
.AinputAndClose {
    display: flex;
    align-items: center;
}
.AinputAndClose> img {
    width: 4vw;
    height: 4vw;
    margin-left: -5.5vw;
}
.AinputContent {
    width: 54vw;
    /* width: 58vw;     */
    height: 3.4vh;
    padding-left: .2rem;
    padding-right: 7vw;
    border: none;
    outline: none;
    border-radius: 1.7vh;
    font-size: .24rem;
    letter-spacing: 2px;
    /* margin-left: .5rem;     */
}
.AsearchButton {
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
