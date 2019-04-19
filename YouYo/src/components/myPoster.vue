<template>
    <div class="myPosterPage">
        <!-- 头部的返回按钮和红色 -->
        <div class="myPosterTop themeColor boderArgb">
            <img src="../../static/appIcon/leftArrow.png" @click="clickReturn" alt="">
            <span>我的贴子</span>
        </div>
        <!-- end -->
        <div class="myPosterContent">
            <!-- 一个贴子 -->
            <li v-for="(item, index) in posterContent" :key="index" class="posterList">
                <!-- 头部 -->
                <div class="contentTop">
                    <img src="../../static/gameIcon/3.png" alt="">
                    <div class="userName">
                        <span>MiSen</span>
                        <span>{{item.posterDate}}</span>
                    </div>
                </div>
                <!-- 内容 -->
                <span class="posterStar">
                    在
                    <span>{{item.gameName}}</span>
                    发表了
                    <span>{{item.star}}</span>
                    星评价
                </span>
                <div class="contentWord" @click="jumpPosterDetails()">
                    天赋推荐:银刚狼，环境家或者是修仙者（推图首选大块头）最后一个最好是清扫者，没有也没事，可以考虑洞察师或者是速游者（如果你经常打沉船）。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。
                </div>
                <!-- 一个贴子下面的点赞、踩、评论图标 -->
                <div class="listBottom">
                    <span class="thumbsUp">
                        <img src="../../static/appIcon/thumbsUp.png" alt="">
                        <span>{{item.thumbsUp}}</span>
                    </span>
                    <span class="thumbsDown">
                        <img src="../../static/appIcon/thumbsDown.png" alt="">
                        <span>{{item.thumbsDown}}</span>
                    </span>
                    <span class="posterComment" @click="jumpPosterDetails()">
                        <img src="../../static/appIcon/comment.png"  alt="">
                    </span>
                </div>
            </li>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            posterContent: [
                {posterDate: '2018-09-21', gameName: '崩坏3', star: 5, thumbsUp: 10, thumbsDown: 9,},
                {posterDate: '2018-09-21', gameName: '崩坏3', star: 5, thumbsUp: 10, thumbsDown: 9,},
                {posterDate: '2018-09-21', gameName: '崩坏3', star: 5, thumbsUp: 10, thumbsDown: 9,}
            ]
        }
    },
    methods: {
        clickReturn () {
            this.$router.go(-1)
        },
        jumpPosterDetails () {
            this.$router.push({
            path:'/myPosterDetails',
                // query:{
                //     id: ele.id,
                // }
            });
        }
    }
}
</script>

<style>
.myPosterPage {
    background: #f1f1f1;
}
/* this Top style */
.myPosterTop {
    height: 10vh;
    margin-bottom: .1rem;
    font-size: .3rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.myPosterTop img {
    width: .38rem;
    height: .38rem;
    margin: 0 .4rem;
}
/* this myPosterContent style */
.myPosterContent {
    height: 90vh;
    overflow-y: auto;
}
.posterList {
    background: white;
    margin-top: .1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 4px #9e9e9e;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;    
}
.myPosterContent .posterList:last-child {
    margin-bottom: 1rem;
}
/* 贴子头部的那一行信息 */
.contentTop {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 92vw;
    margin: .2rem 0
}
.contentTop img {
    width: .8rem;
    height: .8rem;
    border-radius: .4rem;
}
.userName {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: .3rem;
    margin-left: .1rem;
}
.userName span:last-child {
    font-size: .26rem;
    color: #959595;
}
.posterStar {
    font-size: .26rem;
    width: 92vw;
    margin-bottom: .1rem;
}
.posterStar span {
    color: #1afa29
}
/* 文章的内容了 */
.contentWord {
    width: 92vw;    
    font-size: .26rem;
    color: #333333;
    /* 溢出显示省略号 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    line-height: 25px;
}
/* 贴子下面的点赞、踩、评论图标 */
.listBottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 7vh;
    width: 92vw;    
}
.listBottom > span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
}
.listBottom span img {
    width: .3rem;
}
.listBottom span span {
    font-size: .2rem;
    height: .3rem;
    line-height: .3rem;
    margin-left: 3px;
}
.thumbsUp span {
    color: #1afa29;
}
.thumbsDown span {
    color: #8a8a8a;
}
</style>
