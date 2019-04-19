<template>
    <div class="posterDetails">
        <div class="posterDetailsTop themeColor shadowThemeColor">
            <img src="../../static/appIcon/leftArrow.png" @click="clickReturn" alt="">
            <span>评论详情</span>
            <img src="../../static/appIcon/deleteWhite.png" alt="">
        </div>
        <div class="posterDetailsCenter">
            <div class="gotoGame">
                <img :src="gmaeImg" alt="">
                <span>{{gameName}}</span>
                <img src="../../static/appIcon/rightArrow.png" alt="">
            </div>
            <div class="posterDetailsUser">
                <img src="../../static/gameIcon/1.jpg" alt="">
                <div class="userInfo">
                    <span>MiSen</span>
                    <span>5</span>
                </div>
                <span class="posterDate">2018-09-21</span>
            </div>
            <div class="posterDetailsContent">
                天赋推荐:银刚狼，环境家或者是修仙者（推图首选大块头）最后一个最好是清扫者，没有也没事，可以考虑洞察师或者是速游者（如果你经常打沉船）。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。
                天赋推荐:银刚狼，环境家或者是修仙者（推图首选大块头）最后一个最好是清扫者，没有也没事，可以考虑洞察师或者是速游者（如果你经常打沉船）。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。
            </div>
            <div class="posterThumbs">
                <div>
                    <img src="../../static/appIcon/thumbsUp.png" alt="">
                    <span>{{thumbsUp}}</span>
                </div>
                <div>
                    <img src="../../static/appIcon/thumbsDown.png" alt="">
                    <span>{{thumbsDown}}</span>
                </div>
            </div>
        </div>
        <div class="posterDetailsBottom">

        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            gmaeImg: '../../static/gameIcon/3.png',
            gameName: '崩坏3',
            thumbsUp: 100,
            thumbsDown: 50
        }
    },
    methods: {
        clickReturn () {
            this.$router.go(-1)
        }
    }
}
</script>

<style>
.posterDetails {
    background: #f1f1f1;
    height: 100vh;
}
/* posterDetailsTop style */
.posterDetailsTop {
    height: 10vh;
    font-size: .3rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.posterDetailsTop img {
    width: .38rem;
    margin: 0 .4rem;
}
/* posterDetailsCenter style */
.posterDetailsCenter {
    background: white;
    display: flex;
    flex-direction: column;
    margin-top: .1rem;
    align-items: center;
}
/* 贴子内容的goto game */
.gotoGame {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #dadada;
    width: 94vw;
}
.gotoGame img {
    width: .8rem;
    margin: .1rem 0;
}
.gotoGame img:last-child {
    width: .3rem;
    margin-left: auto;
}
.gotoGame span {
    margin-left: .1rem;
    font-size: .26rem;
    color: #5d5d5d
}
/* 贴子内容的那段用户信息 */
.posterDetailsUser {
    width: 94vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
}
.posterDetailsUser img {
    width: .8rem;
    border-radius: .4rem;
    margin: .1rem 0
}
.userInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: .1rem;
}
.userInfo span:last-child {
    font-size: .23rem;
    color: #01d10f;
}
.posterDate {
    font-size: .2rem;
    color: #8b8b8b;
    margin-left: auto;
}
/* posterDetailsContent style */
.posterDetailsContent {
    width: 94vw;
    padding-bottom: .2rem;
    font-size: .25rem;
    max-height: 52vh;
    overflow-y: auto;
    border-bottom: 1px solid #dadada;
    line-height: 26px
}
/* posterThumbs style  */
.posterThumbs {
    display: flex;
    justify-content: flex-end;
    width: 94vw;
    height: 6vh;
}
.posterThumbs img {
    width: .3rem
}
.posterThumbs span {
    font-size: .2rem;
    margin-left: .1rem;
}
.posterThumbs div:first-child {
    color: #01d10f;
}
.posterThumbs div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.posterThumbs div:first-child {
    margin-right: .5rem;
}
</style>
