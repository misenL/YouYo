<template>
    <div class="page">
        <div class="detailsTop">
            <div class="topOperation themeColor">
                <img @click="clickReturn" class="leftOperation" src="../../static/appIcon/leftArrow.png" alt="">
                <div class="rightOperation">
                    <img src="../../static/appIcon/share.png" alt="">
                    <!-- <img src="../../static/appIcon/topMore.png" alt="">                 -->
                </div>
            </div>
            <!-- end -->
            <div class="topGameInfo">
                <div>
                    <img class="topGameImg" :src="gameInfo.apkIcon" alt="">
                    <div>
                        <p class="topGameName">
                            <span>{{gameInfo.apkName}}</span>
                            <span class="APKorXAPK themeColor">{{gameInfo.apkOrXapk}}</span>
                        </p>
                        <p class="topGamefirm">
                            <span>{{gameInfo.apkManufacturer}}</span>
                            <img src="../../static/appIcon/jiantou.png" alt="">
                        </p>
                        <p class="topGameSize">
                            <span>{{gameInfo.apkSize}}MB</span>
                        </p>
                    </div>
                </div>
                <p class="topInstall">
                    <img v-if="shoucang" @click="checkShoucang" src="../../static/appIcon/shoucangCheck.png" alt="">
                    <img v-else="shoucang" @click="checkShoucang" src="../../static/appIcon/shoucang.png" alt="">
                    <!-- <button type="submit" @click="gameDown">安装</button> -->
                    <span class="installButton themeColor" @click="gameDown">安装</span>
                </p>
            </div>
        </div>
        <!-- end -->
        <div class="detailsCenter">
            <ul>
                <li 
                  v-for="item in items" :key="item.id">
                    <span :class="{detailsListCheck: item.isList}" @click="checkRouter(item)"><b>{{item.label}}</b><b>{{item.gameNum}}</b></span>
                </li>
            </ul>
        </div>
        <div class="detailsBottom">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name: 'gameDetails',
    data() {
        return {
            gameInfo: [],
            shoucang: false,
            items: [
                {label: '详情', isList:  true, id: 1, checkRouter: 'introduction'},
                // {label: '评论', isList: false, id: 2, checkRouter: 'comment', gameNum: 2548},
                {label: '推荐', isList: false, id: 2, checkRouter: 'recommend'}                
            ]
        }
    },
    created　() {
        console.log(this.$route.query._id);
        // 判断是否收藏
        if ($.inArray(this.$route.query._id, this.$store.state.userCollection)) {
            console.log('true');
            
        } else {
            console.log('false');
            
        }
        // get 代码
        this.$http.get(this.HOST+'getAPKInfo/gameIntro/'+this.$route.query._id).then(function (resp) {
                // resp.data中获取ResponseData实体
            console.log(resp.body);
            
            this.gameInfo = resp.body;
            this.gameInfo.apkSize = this.gameInfo.apkSize.toFixed(2)
            this.shoucang = resp.body.myCollection;
        },function(resp){
                // 发生错误
                console.log('get err:');
        })

    },
    methods: {
        // 游戏下载
        gameDown () {
            console.log(this.gameInfo.apkPath.split('/'));
            let arrayLength = this.gameInfo.apkPath.split('/').length;
            let appName = this.gameInfo.apkPath.split('/')[arrayLength-1];

            console.log(appName);
            window.location.href = this.HOST+'uploadAPK/downApk/'+appName;
            // post到后台数据保存
            this.$http.post(this.HOST+'users/userDownAPK',{
                userEmail: this.$store.state.userEmail,
                gameId: this.$route.query._id
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })
            
        },
        //收藏爱心
        checkShoucang () {
            this.shoucang = !this.shoucang;
            // post API
            this.$http.post(this.HOST+'users/gameCollection',{
                userEmail: this.$store.state.userEmail,
                gameId: this.$route.query._id
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
                
                // resp.data中获取ResponseData实体
                // 下面的弹框提醒
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })
            // 存当前收藏的游戏
            console.log(this.$store.state.userEmail);
            this.$http.post(this.HOST+'users/getUserInfo',{
                userEmail: this.$store.state.userEmail
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
                // 存入vuex
                this.$store.commit('setUserCollection',resp.body[0].userCollection)  
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })

        },
        //切换路由
        checkRouter (ele) {
            this.$router.push({
                path:'/gameDetails/'+ele.checkRouter,
                query:{
                    _id: this.gameInfo._id,
                    label: this.gameInfo.apkLabel,
                    Manufacturer: this.gameInfo.apkManufacturer,
                }
            })
            // console.log(this.items);
            this.items.forEach((el)=>{
                el.isList = false
            })
            ele.isList = true;
        },
        //返回按钮
        clickReturn () {
            // this.$router.go(-1)
            this.$router.push({
                path:'/gameList/listContent'
            })
            this.$store.commit('setRecordNav', 1);            
        }
    },
}
</script>

<style>
/* some common styles */
    .page {
        background: #eee;
        font-size: .3rem;
        overflow-y: auto;
        max-height: 100vh;
    }
    .detailsTop, .detailsCenter {
        background: white;
    }
    /* end */
/* this is top operation */
    .topOperation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* background: rgb(255, 222, 77); */
        height: .85rem;
    }
    .leftOperation {
        width: .38rem;
        height: .38rem;
        margin-left: .25rem;
    }
    .rightOperation img {
        width: .35rem;
        margin-right: .35rem;
    }
    /* .rightOperation img:first-child {
        margin-right: .35rem;
    } */
/* end */
/* this is game info */
    .topGameInfo {
        padding: .3rem 0;
        /* background: #ffadb4; */
    }
    .topGameInfo > div:first-child {
        display: flex;
        justify-content:flex-start;
        align-items: flex-start;
    }
    .topGameImg {
        width: 1.3rem;
        height: 1.3rem;        
        border-radius: .4rem;
        margin: 0 .25rem;
    }
    .APKorXAPK {
        font-size: .22rem;
        padding: 0 .1rem;
        border-radius: .05rem;
        color: white;
        /* background: #c00303; */
    }
    .topGamefirm {
        display: flex;
        align-items: center;
        font-size: .28rem;
        color: #a0a0a0;
        margin-top: .05rem;
    }
    .topGamefirm img {
        width: .25rem;
    }
    .topGameSize {
        color: #c00303;
        margin-top: .05rem;
        font-size: .26rem;
    }
    .topInstall {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .topInstall img {
        width: .4rem;
        margin-right: .2rem;
    }
    .installButton {
        color: white;        
        /* background: #c00303;     */
        margin-right: .4rem;
        width: 1rem;
        height: .6rem;
        text-align: center;
        line-height: .6rem;
        border-radius: .1rem;    
    }
    /* end */
    /* this is center style */
    .detailsCenter {
        margin-top: .17rem;
    }
    .detailsCenter ul {
        height: .65rem;
        border-bottom: 1px solid #eee;
        /* background: #ffadb4;         */
    }
    .detailsCenter li {
        display: flex;
        justify-content: center;
        float: left;
        width: 50%;
        text-align: center;
        font-size: .29rem;
        color: rgb(144, 144, 144);
    }
    .detailsCenter span {
        display: flex;
        justify-content: center;
        height: .65rem;
        line-height: .65rem;
        width: .35rem;
    }
    .detailsListCheck {
        border-bottom: 2px solid lightseagreen;
        color: lightseagreen;
    }
    .detailsCenter b {
        display: flex;
        white-space: nowrap;        
        font-weight: 500;
        width: 1rem;
    }
    .detailsCenter b:last-child {
        font-size: .2rem;
    }
    /* end */
</style>
