<template>
    <div class="homePage">
        <div class="homePageTop themeColor">
            <span>YouYo</span>
        </div>
        <!-- 轮播 -->
        <div class="homePageCarousel">
            <van-swipe 
             @change="carouselChange" 
             class="homePageSwipe"
             :autoplay="3000">
                <van-swipe-item class="homePageSwipeItem" v-for="(item, index) in carouselImg" :key="index">
                    <img :src="item.img" alt="">
                </van-swipe-item>
                <!-- <div class="custom-indicator" slot="indicator">
                    {{ current + 1 }}/{{carouselImg.length}}
                </div> -->
            </van-swipe>
        </div>
        <!-- 内容 -->
        <div class="homePageContent">
            <!-- 日推 -->
            <div class="everydayTwo">
                <li @click="toList(evItem)" v-for="(evItem, evIndex) in recommendTop" :key="evIndex">
                    <div class="evImg">
                        <img :src="evItem.apkIcon" alt="">
                        <img :src="evItem.apkIcon" alt="">                        
                    </div>
                    <div class="evWord">
                        <span>{{evItem.apkName}}</span>
                        <img src="../../static/appIcon/star.png" alt="">
                        <span>{{evItem.apkStar[0]}}</span>
                    </div>
                </li>
            </div>
            <!-- end -->
            <div class="recommendOne">
                <li @click="toList(oneItem)" v-for="(oneItem, oneIndex) in recommendOne" :key="oneIndex">
                    <img class="recommendOneIcon" :src="oneItem.apkIcon" alt="">
                    <div class="recommendOneWord">
                        <span>{{oneItem.apkName}}</span>
                        <span>{{oneItem.apkManufacturer}}</span>                        
                    </div>
                    <div 
                     v-on:touchstart.stop="" 
                     v-on:click.stop="gameDown(oneItem)" 
                     class="recommendOneButton themeColor">
                        安装
                    </div>
                </li>
            </div>
            <!-- end -->
            <div class="recommendEdit">
                <li @click="toList(editItem)" v-for="(editItem, editIndex) in recommendEdit" :key="editIndex">
                    <img class="recommendEditIcon" :src="editItem.apkIcon" alt="">
                    <span class="recommendEditName">{{editItem.apkName}}</span>
                    <div class="recommendEditStar">
                        <img src="../../static/appIcon/star.png" alt="">
                        <span>{{editItem.apkStar[0]}}</span>                    
                    </div>
                </li>
            </div>
            <!-- end -->
            <div class="recommendTwo">
                <li @click="toList(twoItem)" v-for="(twoItem, twoIndex) in recommendTwo" :key="twoIndex">
                    <img class="recommendTwoIcon" :src="twoItem.apkIcon" alt="">
                    <div class="recommendTwoWord">
                        <span>{{twoItem.apkName}}</span>
                        <span>{{twoItem.apkManufacturer}}</span>                        
                    </div>
                    <div 
                     v-on:touchstart.stop="" 
                     v-on:click.stop="gameDown(twoItem)" 
                     class="recommendTwoButton themeColor">
                        安装
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data () {
        return {
            carouselImg: [
                {img: '../../static/gameImgs/game1.jpg'},
                {img: '../../static/gameImgs/game2.jpg'},
                {img: '../../static/gameImgs/game3.jpg'},
                {img: '../../static/gameImgs/game4.jpg'},               
                {img: '../../static/gameImgs/game5.jpg'},                                
            ],
            // current: 0
            recommendTop: [],           // 第一个推荐
            recommendEdit: [],          // 编辑推荐
            recommendOne: [],
            recommendTwo: []
        }
    },
    created () {
        this.$http.get(this.HOST+'getAPKInfo/allInfo').then(function (resp) {
            this.recommendTop = resp.body.slice(0,2);
            this.recommendOne = resp.body.slice(2,7)        // 数组下标1-5
            this.recommendTwo = resp.body.slice(7,12)        // 数组下标1-5            
        },function(resp){
                console.log('get err:');
        });
        // 根据评分查询
        this.$http.get(this.HOST+'getAPKInfo/topList').then(function (resp) {
            console.log(resp);
            this.recommendEdit = resp.body.slice(0,10)
        },function(resp) {
            console.log('get err:');            
        })
    },
    methods: {
        // 轮播
        carouselChange(index) {
            this.current = index;
        },
        // 点击游戏跳转
        toList (ele) {
            console.log(ele);
            this.$router.push({
                path:'/gameDetails/introduction',
                query:{
                    _id: ele._id,
                }
            })
        },
        // 安装
        gameDown (ele) {
            console.log(ele);
            let arrayLength = ele.apkPath.split('/').length;
            let appName = ele.apkPath.split('/')[arrayLength-1];
            window.location.href = this.HOST+'uploadAPK/downApk/'+appName;
            // post到后台数据保存
            this.$http.post(this.HOST+'users/userDownAPK',{
                userEmail: this.$store.state.userEmail,
                gameId: ele._id
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })
        }

    }
}
</script>

<style>
.homePage {
    background: #f1f1f1;
    height: 100vh;
    overflow-y: auto;
}
.homePageTop {
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.homePageTop span {
    color: white;
    font-size: .3rem;
}
/* 轮播 style */
.homePageCarousel {
    height: 22vh;
    background: white;
    overflow:hidden;
}
.homePageSwipe {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22vh;
}
.homePageSwipeItem {
    padding: 0 1vw;
}
.homePageCarousel img {
    width: 98vw;
    height: 21vh;
    border-radius: 5px;
}
.van-swipe__track {
    width: 100vw !important;
    height: 21vh;
    display: flex;
    justify-content: flex-start;
    /* overflow-x:hidden */
}
.custom-indicator {
    font-size: .24rem;
    /* color: white; */
    float: right;
    height: 3vh;
}
/* end */
.homePageContent {
    margin-top: .6vh;
    border-top: 1px solid #cecece;
    border-radius: 5px;
    background: white;
    height: 62vh;
    overflow-y: auto;
}
/* everyday */
.everydayTwo {
    display: flex;
    justify-content: space-around;
}
.everydayTwo li {
    width: 40vw;
    margin: 2vh 1vw 1vh 1vw;
}
.evImg {
    height: 40vw;
    width: 40vw;
}
.evImg img:first-child {
    width: 40vw;
    height: 40vw;
    margin-bottom: -20vw;
    border-radius: 7vw;
}
.evImg img:last-child {
    width: 15vw;
    height: 15vw;
    margin-left: 24vw;
    border-radius: 3vw;
}
.evWord {
    font-size: .28rem;
    margin-top: .12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.evWord span:first-child {
    margin-left: .2rem;
}
.evWord img {
    width: 5vw;
    height: 5vw;
    margin-left: auto;
}
.evWord span:last-child {
    margin-right: .2rem;
    margin-left: .1rem;
}
/* recommendOne style */
.recommendOne li, .recommendTwo li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .27rem;
    margin: .1rem .2rem .2rem .2rem;
    padding: .1rem;
    border-radius: .2rem;
    border: 1px solid #e9e8e8;
    box-shadow: 0 1px 5px #b4b4b4;
}
.recommendOneIcon, .recommendTwoIcon {
    width: 15vw;
    height: 15vw;
    border-radius: 3vw;
    margin-right: .2rem;    
}
.recommendOneWord, .recommendTwoWord {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: auto;
}
.recommendOneWord span:last-child,
.recommendTwoWord span:last-child{
    font-size: .23rem;
    margin-top: .1rem;
}
.recommendOneButton, .recommendTwoButton {
    color: white;
    /* background: #c00303; */
    margin-right: .4rem;
    width: 1rem;
    height: .6rem;
    text-align: center;
    line-height: .6rem;
    border-radius: .1rem;
}
/* recommendEdit style */
.recommendEdit {
    width: 96vw;
    margin: 0 .1rem;
    border-radius: 3vw;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .27rem;
    padding-bottom: .1rem
}
.recommendEdit li {
    margin: 0 .08rem;
}
.recommendEditIcon {
    width: 15vw;
    height: 15vw;
    border-radius: 3vw;
}
.recommendEditName {
    width: 1rem;
    padding-left: .07rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.recommendEditStar {
    display: flex;
    align-items: center;
    font-size: .23rem;
}
.recommendEditStar img {
    width: 5vw;
    height: 5vw;
    margin-right: .1rem;
}
</style>
