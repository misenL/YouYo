<template>
    <div class="pageMyCollection">
        <div class="MyCollectionTop themeColor">
            <div class="MyCollectionTopContent">
                <img @click="MyCollectionReturn" src="../../static/appIcon/return.png" alt="">                
                <li>我的收藏</li>
            </div>
            <div class="MyCollectionTopList">
                <li>游戏</li>
            </div>
        </div>
        <!-- end -->
        <div class="MyCollectionCenter">
            <li 
             class="MyCollectionList" 
             v-for="(item, index) in gameList" 
             :key="index"
             @click="toGameInfo(item._id)">
                <img class="MyCollectionCenterImg" :src="item.apkIcon" alt="">
                <div class="MyCollectionListCenter">
                    <p>{{item.apkName}}</p>
                    <p>{{item.apkStar[0]}}</p>
                    <span v-for="n in item.apkLabel">{{n}}</span>
                </div>
                <div class="MyCollectionListRight">
                    <span v-if="item.installOrOpen">打开</span>
                    <span v-else>安装</span>
                </div>
            </li>
        </div>
        <!-- end -->
    </div>
</template>

<script>
export default {
    data ()　{
        return {
            gameList: []
        }
    },
    created () {
        console.log(this.$store.state.userCollection);        
        // post 用户收藏
        this.$http.post(this.HOST+'users/allCollection',{
            userCollection: JSON.stringify(this.$store.state.userCollection)
        },{
            emulateJSON: true
        }).then(function (resp) {
            console.log(resp);
            this.gameList = resp.body
            // resp.data中获取ResponseData实体
        },function (resp) {
            // 发生错误
            alert('抱歉服务器异常')                
        })
    },
    methods: {
        // 跳转详情页
        toGameInfo (el) {
            console.log('_id:',el);
            this.$router.push({
                path:'/gameDetails/introduction',
                query:{
                    _id: el,
                }
            })
        },
        // 返回按钮
        MyCollectionReturn () {
            console.log('MyCollectionReturn');
            this.$router.push({
                path:'/personalContent'
            })
        }
    }
}
</script>

<style>
.pageMyCollection {
    background: #f1f1f1;
    height: 100vh;
    color: white;
}
/* MyCollectionTop style */
.MyCollectionTop {
    /* background: #c00303; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.MyCollectionTopContent {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
    color: white;
    height: 9vh;
}
.MyCollectionTopContent img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
.MyCollectionTopList {
    width: 100%;
    height: 5vh;
    font-size: .26rem;
}
.MyCollectionTopList li {
    height: 4.6vh;
    width: 50%;
    /* background: #e255e2; */
    text-align: center;
    line-height: 3.7vh;
    border-bottom: .4vh white solid;
}
/* end */
/* MyCollectionCenter style */
.MyCollectionCenter {
    color: black;
    padding-top: .15rem;
}
.MyCollectionList {
    display: flex;
    justify-content: space-between;
    background: white;
    border-bottom: #e9e9e9 solid 1px;
    padding: .1rem 0;
}
.MyCollectionCenterImg {
    width: 16vw;
    height: 16vw;
    margin: .12rem;
    border-radius: .2rem
}
.MyCollectionListCenter {
    font-size: .25rem;
    color: #707070;
    width: 50vw;
    padding-top: .1rem;
    margin-left: -.4rem;
}
.MyCollectionListCenter p {
    margin-bottom: .1rem;
    font-size: .2rem;
}
.MyCollectionListCenter :first-child {
    font-size: .26rem;
    color: black;
}
.MyCollectionListCenter span {
    background: #eeeeee;
    padding: 0 .08rem .03rem .08rem;
    margin-right: .15rem;
    border-radius: .08rem;
    font-size: .2rem;
}
.MyCollectionListRight {
    font-size: .28rem;
    width: 20vw;
    display: flex;
    justify-content: left;
    align-items: center;
}
.MyCollectionListRight span {
    border: 1px #c00303 solid;
    border-radius: .05rem;
    width: 15vw;
    height: 7vw;
    text-align: center;
    line-height: 7vw;
    color: #c00303;
    box-shadow: 1px 3px 5px #c0030357;
}
/* end */
</style>
