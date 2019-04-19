<template name="listContent">
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
                    <!-- <li @click="listMenuItem(1,item)" v-else="item.ifInstall">安装</li>                     -->
                    <li @click="listMenuItem(2,item)">详情</li>
                    <li @click="listMenuItem(3,item)" class="ifTrueColor" v-if="item.ifCollect">取消收藏</li>
                    <li @click="listMenuItem(3,item)" v-else="item.ifCollect">收藏</li>                    
                </div>
            </transition>
        </li>
    </ul>
</template>

<script type="text/babel">
    export default {
        name: 'listContent',
        data() {
            return {
                page: 1,
                pageSize: 10,
                list: [
                    // {
                    //     img: "../../static/gameIcon/1.jpg",
                    //     title: "gameName",
                    //     renewTime: '2018-12-25',
                    //     score: 89.1,
                    //     touch: false,
                    //     menuShow: false,
                    //     ifInstall: false,           // false未安装，   
                    //     ifCollect: true,           // false未收藏
                    //     id:0
                    // }
                ]
            }
        },
        watch:{
            $route(to,from){
                console.log(this.$route.query.label);
                switch (this.$route.query.id) {
                    case 1:
                        console.log('1');
                        // get 热推 代码
                        this.$http.get(this.HOST+'getAPKInfo/allInfo').then(function (resp) {
                            for(let i in resp.body) {
                                resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                            }
                            this.list = resp.body;
                        },function(resp){
                            console.log('get err:');
                        })
                        break;
                    case 2:
                        console.log('2');
                        // get 榜单 代码
                        this.$http.get(this.HOST+'getAPKInfo/topList').then(function (resp) {
                            for(let i in resp.body) {
                                resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                            }
                            this.list = resp.body;
                        },function(resp){
                            console.log('get err:');
                        })
                        break;
                    default:
                        console.log('>2');
                        this.$http.get(this.HOST+'getAPKInfo/otherLable/'+this.$route.query.label).then(function (resp) {
                            for(let i in resp.body) {
                                resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                            }
                            this.list = resp.body;
                        },function(resp){
                            console.log('get err:');
                        })
                        break;
                }
            }
        },
        created() {
            // get 代码
            this.$http.get(this.HOST+'getAPKInfo/allInfo').then(function (resp) {
                for(let i in resp.body) {
                    resp.body[i].apkCreate = resp.body[i].apkCreate.substr(0,10)
                    resp.body[i].menuShow = false
                }
                this.list = resp.body;
                console.log(this.list);
                
            },function(resp){
                 console.log('get err:');
            })
        },
        methods: {
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
</style>
