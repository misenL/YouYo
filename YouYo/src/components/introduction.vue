<template>
    <div class="introductionPage">
        <!-- check img the mask -->
        <div class="MaskImg" @click="clickMask">
            <img @click.stop="" :src="MaskImg" alt="">
        </div>
        <!-- end -->
        <!-- 简介 -->
        <div>
            <p><b>简介</b></p>
            <div>
                <div class="introduction">{{introduction.apkIntroduce}}</div>
                <div class="introductionMore" @click="moreIntroduction">
                    更多
                </div>         
            </div>
        </div>
        <!-- end -->
        <!-- gameScreenshot -->
        <div class="gameScreenshot">
            <p><b>游戏截图</b></p>
            <div class="hiddenScorll">
                <!-- this is game img -->
                <div class="gameImgs">
                    <img @click="checkImg(gameImg)" v-for="gameImg in gameImgs" :src="gameImg" alt="">
                </div>
            </div>
        </div>
        <!-- end -->
        <!-- Label -->
        <div class="label">
            <p><b>标签</b></p>
            <div class="labelContent">
                <div class="labelLeft">
                    <span v-for="label in labels" :key="label.id">
                        {{label}}
                    </span>
                </div>
                <div class="labelRight">
                    <!-- <img src="../../static/appIcon/add.png" alt="">                    
                    <img src="../../static/appIcon/jiantou.png" alt=""> -->
                </div>
            </div>
        </div>
        <!-- end -->
    </div>
</template>

<script>
export default {
    name: 'introduction',
    data() {
        return {
            introduction: '',
            MaskImg: '',
            gameImgs: [],
            labels: [],
        }
    },
    created() {
        console.log(this.$route.query._id);      
        // get 代码
        this.$http.get(this.HOST+'getAPKInfo/gameIntro/'+this.$route.query._id).then(function (resp) {
                // resp.data中获取ResponseData实体
            console.log(resp.body);
            
            this.introduction = resp.body;
            this.gameImgs = resp.body.apkImg;
            this.labels = resp.body.apkLabel;
            // this.labels = this.labels[0].split(",")
        },function(resp){
                // 发生错误
            console.log('get err:');
        })

    },
    methods: {
        // 改变简介高度
        moreIntroduction () {
            console.log('moreIntroduction');
            $('.introduction').css(
                'height', '100%'
            )
            $('.introductionMore').hide();
        },
        //点击截图查看大图
        checkImg (ele) {
            console.log(ele);
            this.MaskImg = ele;
            $('.MaskImg').fadeIn()
            $('.MaskImg').css(
                'display', 'flex'
            )
        },
        //点击遮罩隐藏大图
        clickMask () {
            $('.MaskImg').fadeOut()
        }
    }
}
</script>

<style>
    /* this is mask style */
    .MaskImg {
        position: absolute;
        display: none;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .9);
        /* opacity: .92; */
    }
    .MaskImg img {
        width: 100%;
    }
    /* end */
    .introductionPage {
        padding: .25rem .3rem;
        font-size: .28rem;
        background: #ffffff;
    }
    .introduction {
        font-size: .25rem;
        margin-top: .3rem;
        height: 1rem;
        overflow: hidden;
    }
    .introductionMore {
        float: right;
        color: lightseagreen;
        font-size: .25rem;
        height: .32rem;
        width: .8rem;
        text-align: right;
    }
    /* this is game Screenshot */
    .gameScreenshot {
        border-bottom: 1px solid #868686;
    }
    .gameScreenshot p {
        margin: .4rem 0 .3rem 0;
    }
    .hiddenScorll {
        height: 2.3rem;
        overflow: hidden;
    }
    .gameImgs {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow-x: auto;
        padding-bottom: .3rem; 
    }
    .gameImgs img {
        height: 2.2rem;
        border-radius: .1rem;
        margin-left: .2rem;
    }
    /* top no margin */
    .gameImgs img:first-child {
        margin: 0;
    }
    /* :end */
    /* this is label style */
    .label p:first-child {
        margin: .3rem 0 .2rem 0;
    }
    .labelContent {
        display: flex;
        justify-content: space-between;
        align-items: flex-start
    }
    .labelLeft {
        /* background: #ddf2f4; */
        width: 5.4rem;   
        height: 100%;     
    }
    .labelRight {
        /* background: #efddfd; */
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: .1rem;
    }
    .labelRight img {
        width: .25rem;
    }
    .labelRight img:first-child {
        margin-right: .3rem;
    }    
    .labelLeft span {
        border: red 1px solid;
        color: rgb(223, 0, 0);
        border-radius: .1rem;
        padding: .07rem .15rem;
        margin: .1rem .2rem 0 0;
        font-size: .25rem;
        float: left;
    }
    /* end */
</style>
