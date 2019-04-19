<template>
    <div class="setingDetailPage">
        <div>
            <div class="setingTop themeColor shadowThemeColor">
                <img src="../../static/appIcon/leftArrow.png" @click="clickReturn" alt="">
                <span>设置</span>
                <span></span>
            </div>
            <!-- end -->
            <div class="setingContent">
                <div class="setingOne shadowThemeColor">
                    <li>
                        2G/3G/4G下不显示图片
                        <!-- 滑块 -->
                        <div
                         @click="setingSlider('setingImg')" 
                         id="setingImgF" 
                         :class="setingImg?'setingOpenColor':'setingCloseColor'" 
                         class="setingSlider setingCloseColor">
                            <div id="setingImg" 
                             :class="setingImg?'setingOpenColor setingOpenLeft':'setingCloseColor setingCloseLeft'" 
                             ></div>
                        </div>
                    </li>
                    <!-- 一行end -->
                    <li>
                        仅使用WiFi网络下载游戏
                        <div 
                         @click="setingSlider('setingGame')" 
                         id="setingGameF" 
                         :class="setingGame?'setingOpenColor':'setingCloseColor'" 
                         class="setingSlider setingCloseColor">
                            <div id="setingGame" 
                             :class="setingGame?'setingOpenColor setingOpenLeft':'setingCloseColor setingCloseLeft'" 
                             ></div>
                        </div>
                    </li>
                    <li>
                        安装成功后删除安装包
                        <div 
                         @click="setingSlider('setingApk')" 
                         id="setingApkF" 
                         :class="setingApk?'setingOpenColor':'setingCloseColor'" 
                         class="setingSlider setingCloseColor">
                            <div id="setingApk" 
                             :class="setingApk?'setingOpenColor setingOpenLeft':'setingCloseColor setingCloseLeft'" 
                             ></div>
                        </div>
                    </li>
                </div>
                <div class="setingTwo shadowThemeColor">
                    <li>
                        检查新版本
                        <span>当前版本：{{Edition}}</span>
                    </li>
                    <li @click="clearImg">
                        图片缓存
                        <span>{{cache}}</span>
                    </li>
                </div>
            </div>
            <!-- end -->
            <div @click="outLogin" class="outLogin shadowThemeColor">
                退出登录
            </div>
        </div>
        <!-- 退出登录遮罩 -->
        <div class="outLoginMask">
            <div class="outLoginAlert">
                <li>退出登录</li>
                <li>确定要退出当前帐号吗？将不能使用发帖、点赞、收藏等功能</li>
                <li class="alertChoose">
                    <span @click="chooseOutLogin(0)">取消</span>
                    <span @click="chooseOutLogin(1)">确定</span>                    
                </li>
            </div>
        </div>
        <!-- 清理缓存遮罩 -->
        <div class="outCacheMask">
            <div class="customizeAlert">
                <li>确定清理？</li>
                <li>清理了，图片就需要重新下载哦~</li>
                <li class="alertChoose">
                    <span @click="chooseClear(0)">取消</span>
                    <span @click="chooseClear(1)">确定</span>                    
                </li>
            </div>
        </div>
        <div class="clearOK">清理完毕</div>
    </div>
    <!-- page end -->
</template>

<script>
// import Vue from 'vue'
export default {
    data () {
        return {
            Edition: '2.1.955',
            cache: '2.3MB',
            setingImg: 0,           // 0:没开启，1：已开启
            setingGame: 1,
            setingApk: 0
        }
    },
    // 页面加载
    created() {
        let vuexArry = this.$store.state.userSeting;   
        this.setingImg = vuexArry[0];
        this.setingGame = vuexArry[1];
        this.setingApk = vuexArry[2];        
    },
    // 页面销毁
    destroyed () {
        let setingArry = [];
        setingArry.push(this.setingImg, this.setingGame, this.setingApk);
        console.log(setingArry);
        this.$store.commit('setUserSeting', setingArry)
    },
    methods: {
        clickReturn () {
            this.$router.go(-1)
        },
        // 设置滑块
        setingSlider (el) {
            console.log(el);
            let str = 'this.'+el;
            // 通过eval转成js语言,再根据传参的值选择触发
            if(eval(str)){
                // 改变颜色                
                $('#'+el+'F').removeClass('setingOpenColor');
                $('#'+el).removeClass('setingOpenColor');
                $('#'+el+'F').addClass('setingCloseColor');
                $('#'+el).addClass('setingCloseColor');
                // 改变外边距                
                $('#'+el).removeClass('setingOpenLeft');                
                $('#'+el).addClass('setingCloseLeft');   
                switch (el) {
                    case 'setingImg':
                        this.setingImg = 0
                        break;
                    case 'setingGame':
                        this.setingGame = 0
                        break;
                    case 'setingApk':
                        this.setingApk = 0
                        break;
                }
            }else{
                // 改变颜色
                $('#'+el+'F').removeClass('setingCloseColor');
                $('#'+el).removeClass('setingCloseColor');
                $('#'+el+'F').addClass('setingOpenColor');
                $('#'+el).addClass('setingOpenColor');
                // 改变外边距
                $('#'+el).removeClass('setingCloseLeft');                
                $('#'+el).addClass('setingOpenLeft');
                switch (el) {
                    case 'setingImg':
                        this.setingImg = 1
                        break;
                    case 'setingGame':
                        this.setingGame = 1
                        break;
                    case 'setingApk':
                        this.setingApk = 1
                        break;
                }
            }
        },
        // 清理缓存
        clearImg () {
            $('.outCacheMask').fadeIn(200);
        },
        // 是否清理选择
        chooseClear (el) {
            console.log(el);
            if (el) {
                // 确定
                $('.outCacheMask').fadeOut(200);
                // 清理完成提示框
                $('.clearOK').fadeIn(200);
                this.cache = '0Byte'
                setInterval(() => {
                    $('.clearOK').fadeOut(200);                    
                },1000);                
            }else{
                // 取消
                $('.outCacheMask').fadeOut(200);
            }
        },
        // 退出登录
        outLogin () {
            $('.outLoginMask').fadeIn(200);       
        },
        // 退出登录遮罩
        chooseOutLogin (el) {
            console.log(el);
            if (el) {
                // 确定
                $('.outLoginMask').fadeOut(200);
                this.$store.commit('setUserName', '登 录');
                this.$router.go(-1);
            }else{
                // 取消
                $('.outLoginMask').fadeOut(200);
            }
        }
    }
}
</script>

<style>
.setingDetailPage {
    height: 100vh;
    background: #f1f1f1;
}
/* setingTop style */
.setingTop {
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.setingTop img {
    width: .38rem;
    margin: 0 -.6rem 0 .4rem
}
.setingTop span {
    color: white;
    font-size: .28rem;
    letter-spacing: 2px;
}
/* setingContent style */
.setingContent {
    font-size: .25rem;
    letter-spacing: 1px;
}
/* setingOne */
.setingOne {
    margin: .05rem 0 .13rem 0
}
.setingOne li, .setingTwo li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    background: white;
    height: 7vh;
    padding-left: .3rem;
}
.setingOne li:last-child,
.setingTwo li:last-child {
    border-bottom: none;
}
.setingTwo li span {
    font-size: .2rem;
    color: #999999;
    padding-right: .3rem;    
}
/* outLogin style  */
.outLogin {
    background: white;
    height: 7vh;
    margin-top: .13rem;
    letter-spacing: 1px;
    font-size: .287rem;
    color: #b80000;
    text-align: center;
    line-height: 6.8vh;
    border-radius: 3px
}
/* 滑块样式 */
.setingSlider {
    width: .7rem;
    height: .18rem;
    border-radius: .12rem;
    margin-right: .3rem;
    display: flex;
    align-items: center;
    transition: background 1s;    
}
.setingSlider div {
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
.setingCloseColor {
    background: #d4d4d4;
    border-color: #bebebe;
}
.setingOpenColor {
    background: #c00303;
    border-color: #b90303;
}
/* 滑块滑动切换 */
.setingCloseLeft {
    margin-left: 0rem;
}
.setingOpenLeft {
    margin-left: .38rem;
}
/* end */
/* outCacheMask Mask style */
.outCacheMask {
    display: none;
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    /* opacity: 0.9; */
    top: 0;
    left: 0;
}
/* 自制的弹框 */
.customizeAlert, .outLoginAlert {
    background: white;
    font-size: .26rem;
    height: 15vh;
    width: 74vw;
    padding: 5vw 6vw 6vw 6vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 40vh;
    margin-left: 7vw;
    border-radius: 4px;
    box-shadow: 2px 10px 15px #474747
}
.outLoginAlert {
    margin-top: 35vh;    
}
.customizeAlert li:first-child,
.outLoginAlert li:first-child {
    font-size: .3rem;
    margin-bottom: .16rem;
}
.alertChoose {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
}
.alertChoose span {
    color: #999999;
}
.alertChoose span:first-child {
    color: #c00303;
    margin-right: .7rem;
}
/* end */
/* clearOK style  */
.clearOK {
    display: none;
    width: 16vw;
    margin-left: 40.5vw;
    text-align: center;
    position: absolute;
    border-radius: 1px;
    bottom: 10vh;
    padding: 1.5vw;
    color: white;
    font-size: .25rem;
    letter-spacing: 1px;
    background: #000000;
}
/* outLoginMask mask style  */
.outLoginMask {
    display: none;
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    /* opacity: 0.9;     */
    top: 0;
    left: 0;
}
</style>
