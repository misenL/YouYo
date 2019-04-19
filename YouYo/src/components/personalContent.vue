<template>
    <div class="personalPage">
        <div class="personalTop">
            <div class="topFloatDiv themeColor">
                <!-- 设置和客服 -->
                <p class="settingService">
                    <img src="../../static/appIcon/seting.png" @click="gotoSeting" alt="">
                    <img src="../../static/appIcon/service.png" @click="gotoService" alt="">
                </p>
            </div>
            <div class="floatDiv">
                <!-- 头像和用户名 -->
                <div class="portraitName" @click="toLogin()">
                    <img class="portraitImg" :src="userImg" alt="">
                    <span class="personalName">{{userName}}</span>
                </div>
                <!-- 积分和获赞 -->
                <div class="integralThumbs">
                    <!-- <div>
                        <span>积分</span>
                        <span>{{integral}}</span>
                    </div>
                    <div>
                        <span>获赞</span>
                        <span>{{thumbs}}</span>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- top end -->
        <div class="personalCenter">
            <li
             v-for="item in personalCenterContent"
             :key="item.index"
             @click="personalContent(item.index)">
                <div>
                    <img class="personalLiOneImg" :src="item.oneImg" alt="">
                    <span class="personalLiOneSpan">{{item.twoSpan}}</span>
                </div>
                <div>
                    <span class="personalLiTwoSpan"></span>
                    <img class="personalLiTwoImg" :src="item.fourImg" alt="">
                </div>
            </li>
        </div>
        <!-- center end -->
        <div class="personalBottom">
            <li
             v-for="(item, index) in personalBottomContent"
             :key="index"
             @click="personalContent(item.index)">
                <div>
                    <img class="personalLiOneImg" :src="item.oneImg" alt="">
                    <span class="personalLiOneSpan">{{item.twoSpan}}</span>
                </div>
                <div class="personalBottomRight">
                    <!-- 夜间模式滑块 -->
                    <div v-if="item.index == 7" class="nightSlider daytimeColor" @click="nightSlider">
                        <div class="sliderRound daytimeColor daytimeLeft"></div>
                    </div>
                    <!-- 正常按钮 -->
                    <img v-else class="personalLiTwoImg" :src="item.fourImg" alt="">
                </div>
            </li>
        </div>
        <!-- bottom end -->
        <div class="divAlert">还没有客服小姐姐哦~</div>
    </div>
</template>

<script>
export default {
    name: 'personalContent',
    data () {
        return {
            userName: '登 录',
            userImg: '',
            isLogin: false,
            integral: 2323,
            thumbs: 23,
            morningNight: 0,            //0代表早晨，1代表夜晚
            alertHide: '',          //弹框计时器
            personalCenterContent: [
                // {oneImg: '../../static/appIcon/Reply.png', twoSpan: '我的帖子', notice: 23, fourImg: '../../static/appIcon/rightArrow.png', index: 1},
                {oneImg: '../../static/appIcon/Collection.png', twoSpan: '我的收藏', notice: 23, fourImg: '../../static/appIcon/rightArrow.png', index: 2},
                // {oneImg: '../../static/appIcon/myTopic.png', twoSpan: '我的回复', notice: 23, fourImg: '../../static/appIcon/rightArrow.png', index: 3},
                {oneImg: '../../static/appIcon/down.png', twoSpan: '下载管理', notice: '', fourImg: '../../static/appIcon/rightArrow.png', index: 4},
            ],
            personalBottomContent: [
                {oneImg: '../../static/appIcon/theme.png', twoSpan: '主题效果', fourImg: '../../static/appIcon/rightArrow.png', index: 5},
                // {oneImg: '../../static/appIcon/proposal.png', twoSpan: '举个建议', fourImg: '../../static/appIcon/rightArrow.png', index: 6},
                {oneImg: '../../static/appIcon/night.png', twoSpan: '夜间模式', fourImg: '../../static/appIcon/rightArrow.png', index: 7},
            ]
        }
    },
    methods: {
        // 点击我的贴子之类的触发事件
        personalContent (el) {
            console.log(el);
            switch (el) {
                case 1:
                    this.$router.push({
                    path:'/myPoster',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    break;
                case 2:
                    this.$router.push({
                    path:'/myCollection',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    break;
                case 4:
                    this.$router.push({
                    path:'/downAdmin',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    break;
                case 5:
                    this.$router.push({
                    path:'/modifyColor',
                        // query:{
                        //     id: ele.id,
                        // }
                    })
                    break;
            }
        },
        // 切换路由登录
        toLogin() {
            console.log('toLogin');
            if (this.userName == '登 录') {         // 如果未登录
                this.$router.push({
                path:'/login',
                    // query:{
                    //     id: ele.id,
                    // }
                })
            } else {                //如果已登录
                this.$router.push({
                path:'/modifyData',
                    // query:{
                    //     id: ele.id,
                    // }
                })
            }
        },
        // 设置按钮
        gotoSeting () {
            this.$router.push({
            path:'/setingDetail',
                // query:{
                //     id: ele.id,
                // }
            })
        },
        // 夜间滑块触发事件
        nightSlider() {
            if (!this._data.morningNight) {     // 改变为夜晚
                // 改变颜色
                $('.nightSlider').removeClass('daytimeColor');
                $('.sliderRound').removeClass('daytimeColor');
                $('.nightSlider').addClass('nighttimeColor');
                $('.sliderRound').addClass('nighttimeColor');
                // 改变外边距
                $('.sliderRound').removeClass('daytimeLeft');                
                $('.sliderRound').addClass('nighttimeLeft');
                this._data.morningNight = 1
            } else {
                // 改变颜色                
                $('.nightSlider').removeClass('nighttimeColor');
                $('.sliderRound').removeClass('nighttimeColor');
                $('.nightSlider').addClass('daytimeColor');
                $('.sliderRound').addClass('daytimeColor');
                // 改变外边距                
                $('.sliderRound').removeClass('nighttimeLeft');                
                $('.sliderRound').addClass('daytimeLeft');                
                this._data.morningNight = 0
            }
        },
        // 客服
        gotoService() {
            console.log(this._data.alertHide);
            clearInterval(this._data.alertHide);
            $('.divAlert').fadeIn(200);
            this._data.alertHide = setInterval(() => {
                $('.divAlert').fadeOut(200);                    
            },1000)
        }
    },
    created() {
        // console.log(this.$route.query.userName);
        this.userName = this.$store.state.userName;
        if (this.userName == '登 录') {
            this.userImg = '../../static/portrait.jpg'            
        }else {
            this.userImg = this.$store.state.userImg
        }
    }
}
</script>

<style>
/* 父级高度和背景色的样式 */
.personalPage {
    height: 92vh;
    background: #f1f1f1;
}
.personalTop {
    height: 31vh;
    /* background: #c00303; */
    margin-bottom: 1.5vh;
}
.personalCenter {
    /* height: 28vh; */
    background: white;
    margin-bottom: 1.5vh;    
}
.personalBottom {
    /* height: 13.5vh; */
    background: white;    
}
/* end */
/* top 的样式 */
.personalTop {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.topFloatDiv {
    width: 100vw;
    height: 17vh;
    margin-bottom: -.3rem;
}
.floatDiv {
    width: 94vw;
    background: white;
    border-radius: 6px;
    /* border-top-left-radius: 6px;
    border-top-right-radius: 6px; */
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;    
    box-shadow: 0 2px 3px #cecece
}
.settingService {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: .8rem 0 0 0;
}
.settingService img {
    width: .4rem;
    margin-right: .3rem;
}
.settingService img:first-child {
    width: .5rem
}
.portraitImg {
    width: 1.4rem;
    height: 1.4rem;    
    border-radius: .7rem;
    margin-top: -.4rem;
    box-shadow: 2px 2px 2px #cecece;
    
}
.personalName {
    font-size: .28rem;
    color: black;
    margin-top: 2px;
}
.integralThumbs {
    height: 2vh;
    font-size: .2rem;
    color: black;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: .15rem;
}
/* 上下分布 */
.integralThumbs div, .portraitName {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* end */
/* cneter and Bottom li的样式了 */
.personalCenter li, .personalBottom li {
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* 底下的li不会有底部边框 */
.personalCenter li:last-child, .personalBottom li:last-child {
    border-bottom: none    
}
.personalCenter li div, .personalBottom li div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
/* end */
/* li里面的四个元素的排列 */
.personalLiOneImg {
    width: .33rem;
    margin: .28rem;
}
.personalLiTwoImg {
    width: .25rem;
    margin: 0 .3rem    
}
.personalLiOneSpan {
    font-size: .26rem;
}
.personalLiTwoSpan {
    font-size: .2rem;
    margin-right: .1rem;
    background: #ececec;
    padding: 0 .1rem;
    border-radius: .2rem;
}
/* end */
/* 夜间模式滑块 */
.nightSlider {
    width: .7rem;
    height: .18rem;
    border-radius: .12rem;
    margin-right: .3rem;
    transition: background 1s;    
}
.nightSlider div {
    height: .3rem;
    width: .3rem;
    border-radius: .15rem;
    border-width: 1px;
    border-style: solid;
    background: white;
    transition: margin-left 1s;
    transition: border-color 1s;
}
/* 滑块颜色切换 */
.daytimeColor {
    background: #d4d4d4;
    border-color: #bebebe;
}
.nighttimeColor {
    background: #c00303;
    border-color: #b90303;
}
/* 滑块滑动切换 */
.daytimeLeft {
    margin-left: 0rem;
}
.nighttimeLeft {
    margin-left: .38rem;
}
/* end */
/* 自定义弹框 */
.divAlert {
    display: none;
    width: 30vw;
    padding: 1.5vw;    
    margin-left: 33.5vw;
    text-align: center;
    position: absolute;
    border-radius: 1px;
    bottom: 10vh;
    color: white;
    font-size: .25rem;
    letter-spacing: 1px;
    background: #000000;
}
</style>
