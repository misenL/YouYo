<template>
<!-- Register  register -->
    <div class="pageRegister">
        <div class="registerTop themeColor">
            <img @click="registerReturn" src="../../static/appIcon/return.png" alt="">
            <span>注册</span>
        </div>
        <!-- end -->
        <div class="registerCenter">
            <div class="inputDiv">
                <span class="registerName showSpan">用户名</span>
                <!-- 为了下划线 -->
                <div id="userName">
                    <input type="text" v-model="userName" placeholder="用户名">
                </div>
                <span id="checkUserName" class="checkSpan">该用户名已被使用</span>
            </div>
            <div class="inputDiv">
                <span class="registerEmail showSpan">邮箱</span>
                <div id="userEmail">
                    <input type="email" v-model="userEmail" placeholder="邮箱">
                </div>
                <span id="checkEmail" class="checkSpan">请检查邮箱格式</span>
            </div>
            <div class="inputDiv">
                <span class="registerpassword showSpan">密码</span>
                <div id="userpassword">
                    <input type="password" v-model="password" placeholder="密码（6-12位）">
                </div>
                <span  id="checkpassword" class="checkSpan">请输入6位以上密码</span>
            </div>
            <div class="inputDiv">
                <span class="passwordCheck showSpan">确认密码</span>
                <div id="twopassword">
                    <input type="password" v-model="passwordCheck" placeholder="确认密码">
                </div>
                <span id="checkTwopassword" class="checkSpan">两次密码不一致</span>
            </div>            
        </div>
        <!-- end -->
        <div class="registerBottom">
            <div class="registerButton themeColor" @click="clickRegister">注册</div>
            <p class="agreement">点击注册即代表同意我们的<a href=""> 服务条款 </a>和<a href=""> 隐私政策 </a>。</p>
        </div>
        <!-- end -->
        <div id="registerAlert" class="registerAlert">
            <span v-if="registerAlert">注册成功</br>即将跳转登录页面</span>
            <span v-else>抱歉</br>服务器异常</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            userName: '',
            userEmail: '',
            password: '',
            passwordCheck: '',
            registerAlert: false
        }
    },
    methods: {
        registerReturn () {
            console.log('registerReturn');
            this.$router.push({
                path:'/login'
            })
        },
        // 没填的框标红
        noFilledCSS (el) {
            console.log(el);
            $('#'+el).addClass('noFilled');
            setTimeout(()=>{
                $('#'+el).removeClass('noFilled');
            },1200)
        },
        // 注册按钮
        clickRegister () {
            console.log(this.HOST);
            // console.log(this._data.userName);
            // 判断是否为空
            switch ('') {
                case this._data.userName:
                    this.$options.methods.noFilledCSS('userName');
                    return false
                    break;
                case this._data.userEmail:
                    this.$options.methods.noFilledCSS('userEmail');
                    return false
                    break;
                case this._data.password:
                    this.$options.methods.noFilledCSS('userpassword');
                    return false
                    break;
                case this._data.passwordCheck:
                    this.$options.methods.noFilledCSS('twopassword');
                    return false
                    break;                
            }
            // 检查格式
            // 邮箱格式
            var myEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if (myEmail.test(this._data.userEmail)) {
                // return true
            }else {
                // 邮箱下面的红色提示出现
                $('#checkEmail').text('请检查邮箱格式')                
                $('#checkEmail').show();
                setTimeout(() => {
                    $('#checkEmail').hide();
                },2000);
                return false
            }
            // 检查密码长度
            if (this._data.password.length>=6) {
                console.log(this._data.password.length);
                // 检查两次密码是否一致
                if (this._data.password != this._data.passwordCheck) {
                    // 如果不相等
                    // 确认密码下面的红色提示出现
                    $('#checkTwopassword').show();
                    setTimeout(() => {
                        $('#checkTwopassword').hide();
                    },2000);
                    return false
                }
            } else {
                // 密码下面的红色提示出现
                $('#checkpassword').show();
                setTimeout(() => {
                    $('#checkpassword').hide();
                },2000);
                return false
            }

            // get 代码
            // this.$http.get(this.HOST+'users/test').then(function (resp) {
            //      // resp.data中获取ResponseData实体
            //     console.log('get success:');
            // },function(resp){
            //      // 发生错误
            //      console.log('get err:');
            // })

            // post 代码
            this.$http.post(this.HOST+'users/register',{  
                userName: this._data.userName,  
                password: this._data.password,
                userEmail: this._data.userEmail,
                userSex: '男',
                userImg: '../../static/portrait.jpg'
            },{  
                emulateJSON:true  
            }).then(function(resp){
                // resp.data中获取ResponseData实体
                console.log('post success:');    
                console.log(resp);
                // 根据用户名判断
                if (resp.bodyText == '该邮箱已被注册') {
                    // 邮箱下面的红色提示出现                    
                    $('#checkEmail').text('该邮箱已被注册');
                    $('#checkEmail').show();
                    setTimeout(() => {
                        $('#checkEmail').hide();
                    },2000)
                }else if(resp.bodyText == '您的注册成功'){
                    this._data.registerAlert = true;
                    $('#registerAlert').fadeIn();
                    setTimeout(() => {
                        $('#registerAlert').fadeOut();    
                        // 跳转到登录页面
                        this.$router.push({
                            path:'/login'
                        })
                    },1500);
                }else {
                    this._data.registerAlert = false;
                    $('#registerAlert').fadeIn();
                    setTimeout(() => {
                        $('#registerAlert').fadeOut();                        
                    },1500)
                }    
            },function(resp){  
                // 发生错误
                console.log('post err:');  
                console.log(resp);
                alert('抱歉服务器异常')                
            });
        }
    }
}
</script>

<style>
.pageRegister {
    background: #f1f1f1;
    height: 100vh;
}
/* registerTop the style */
.registerTop {
    /* background: rgb(192, 3, 3); */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
    color: white;
    height: 10vh;
}
.registerTop img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
/* end */
/* registerCenter style */
.registerCenter {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
}
.inputDiv {
    width: 87%;
    height: 9.5vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.inputDiv > div {
    display: flex;
    border: 0px solid #ff2222;
    border-bottom: #9e9e9e solid 1px;
    transition: border .6s
}
.inputDiv input {
    width: 100%;
    border: none;
    outline: none;
    background-color: #f1f1f1;
    font-size: .25rem;
    margin-left: .05rem;
}
/* 第一行的span */
.showSpan {
    color: #d40505;
    /* display: none; */
    font-size: .23rem;
    margin: 0 .08rem .1rem .08rem;
}
/* 第三行的span */
.checkSpan {
    display: none;
    font-size: .2rem;
    color: red;
    margin: .05rem 0 .2rem .08rem;
}
/* 没有填写 */
.noFilled {
    border: 1px solid #ff2222 !important;
    box-shadow: 0 0 3px #ff2222;
} 
/* end */
/* registerBottom */
.registerBottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .4rem;
}
.registerButton {
    /* background: rgb(192, 3, 3); */
    color: white;
    width: 87%;
    height: .68rem;
    text-align: center;
    line-height: .68rem;
    font-size: .26rem;
    margin-bottom: .2rem;
}
.agreement {
    width: 87%;
    font-size: .20rem;
}
.agreement a {
    color: #d40505;
}
/* 底层弹框 */
.registerAlert {
    display: none;
    width: 30vw;
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
</style>
