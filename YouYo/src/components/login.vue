<template>
    <div class="loginPage">
        <div class="loginTop themeColor">
            <img @click="loginReturn" src="../../static/appIcon/return.png" alt="">
            <span>登录</span>
        </div>
        <!-- end -->
        <div class="loginCenter">
            <div class="loginDiv">
                <div class="loginUserName">
                    <input type="text" v-model="userName" placeholder="用户名或邮箱">
                    <!-- <img src="../../static/appIcon/more.png" alt=""> -->
                </div>
                <!-- <p class="userNameTips">用户名或邮箱不存在</p> -->
            </div>
            <!-- end -->
            <div class="loginDiv">
                <div class="passWord">
                    <input type="password" v-model="passWord" placeholder="密码">
                    <!-- <img src="../../static/appIcon/add.png" alt="">                 -->
                </div>
                <!-- <p class="passWordTips">密码错误</p> -->
            </div>
            <!-- end -->
            <div class="loginButton themeColor" @click="loginButton">登录</div>
            <div class="additional">
                <span @click="register()">新用户注册</span>
                <span @click="retrievePassword()">忘记密码</span>
            </div>
        </div>
        <!-- end -->
        <div class="loginBottom">
            <p>或使用您的账户登录</p>
            <div class="checkLoginType">
                <div>
                    <img src="../../static/appIcon/QQ.png" alt="">
                    <span>QQ</span>
                </div>
                <div>
                    <img src="../../static/appIcon/wechat.png" alt="">
                    <span>WeChat</span>
                </div>
                <div>
                    <img src="../../static/appIcon/Google.png" alt="">
                    <span>Google</span>
                </div>
            </div>
        </div>
        <!-- end -->
        <div class="loginAlert">
            <span>{{loginAlert}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            userName: '',
            passWord: '',
            loginAlert: '用户名或密码错误'
        }
    },
    methods: {
        //返回按钮
        loginReturn () {
            this.$router.push({
                path:'/personalContent'
            });
        },
        // 没填的框标红
        noFilledCSS (el) {
            $('.'+el).addClass('noFilled');
            setTimeout(()=>{
                $('.'+el).removeClass('noFilled');
            },1200)
        },
        //登录按钮
        loginButton () {
            // 如果没填
            switch ('') {
                case this.userName:
                    this.$options.methods.noFilledCSS('loginUserName');
                    return false
                    break;
                case this.passWord:
                    this.$options.methods.noFilledCSS('passWord');
                    return false
                    break;
            };
            // 判断是邮箱还是用户名
            var myEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            let postName = '';
            let postEmail = '';
            if (myEmail.test(this.userName)) {          // 如果是邮箱格式
                postEmail = this.userName
            }else {         // 如果不是邮箱格式
                postName = this.userName
            }
            // post API
            this.$http.post(this.HOST+'users/login',{
                userName: postName,
                password: this.passWord,
                userEmail: postEmail,                
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
                
                // resp.data中获取ResponseData实体
                // 下面的弹框提醒
                this.loginAlert = resp.body.msg.text;
                $('.loginAlert').fadeIn();
                setTimeout(() => {
                    $('.loginAlert').fadeOut();    
                },1500)                
                // 判断成功或错误
                if (resp.body.msg.text == '登录成功') {
                    // 将数据存入vuex
                    this.$store.commit('setUserName', resp.body.msg.userName);
                    this.$store.commit('setUserEmail',resp.body.msg.userEmail);
                    this.$store.commit('setUserImg',resp.body.msg.userImg);
                    this.$store.commit('setUserSex',resp.body.msg.userSex);  
                    this.$store.commit('setUserCollection',resp.body.msg.userCollection)  
                    // 超级用户跳转
                    if (resp.body.msg.superAdmin) {
                        // alert('superAdmin');
                        this.$router.push({
                            path:'/superAdmin'
                        });
                        return
                    }                
                    setTimeout(() => {
                        // 跳转路由
                        this.$router.push({
                            path:'/personalContent'
                        });
                    },1000)                
                }
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })

        },

        // 点击新用户注册按钮
        register ()　{
            console.log('register');
            this.$router.push({
                path:'/register'
            })
        },
        // 找回密码 retrievePassword
        retrievePassword () {
            console.log('retrievePassword');
            this.$router.push({
                path:'/retrievePassword'
            })
        }
    }
}
</script>

<style>
.loginPage {
    background: #f1f1f1;
    height: 100vh;
}
/* loginTop the style */
.loginTop {
    /* background: rgb(192, 3, 3); */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
    color: white;
    height: 10vh;
}
.loginTop img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
/* end */
/* loginCenter the style */
.loginCenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
}
/* loginCenter input style */
.loginCenter input {
    width: 100%;
    border: none;
    outline: none;
    background-color: #f1f1f1;
    font-size: .26rem;
    margin-left: .05rem;
}
.loginDiv {
    width: 87%;
    height: 9.5vh;
}
.loginUserName ,.passWord {
    border: 0px solid #ff2222;
    border-bottom: #9e9e9e solid 1px;
    /* background: #bce362; */
    /* width: 87%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border .6s    
}
.loginUserName > img, .passWord > img {
    width: .3rem;
    height: .3rem;
    margin: 0 .2rem;
}
.userNameTips, .passWordTips {
    font-size: .2rem;
    color: red;
    width: 87%;    
    margin: .05rem 0 .5rem .05rem;
    display: none
}
/* 没有填写 */
.noFilled {
    border: 1px solid #ff2222 !important;
    box-shadow: 0 0 3px #ff2222;
} 
/* end */
/* loginCenter loginButton style */
.loginButton {
    /* background: rgb(192, 3, 3); */
    color: white;
    width: 87%;
    height: .68rem;
    text-align: center;
    line-height: .68rem;
    font-size: .26rem;
    margin-top: .5rem;
}
.additional {
    width: 87%;
    margin-top: .25rem;
    font-size: .25rem;
    color: rgb(192, 3, 3);
    display: flex;
    justify-content: space-between;
}
/* end */
/* loginBottom style */
.loginBottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .2rem;
    color: #575757;
    margin-top: .75rem;
}
.checkLoginType {
    width: 66%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .5rem;    
}
.checkLoginType> div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .24rem;    
}
.checkLoginType img {
    width: .7rem;
    height: .7rem;
    border-radius: .35rem;
    margin-bottom: .15rem;
}
/* end */
/* loginAlert style */
.loginAlert {
    display: none;
    width: 30vw;
    margin-left: 35vw;
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
</style>
