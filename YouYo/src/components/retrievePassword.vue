<template>
    <div class="pageRetrievePw">
        <div class="retrievePwTop themeColor">
            <img @click="retrievePwReturn" src="../../static/appIcon/return.png" alt="">
            <span >找回密码</span>
        </div>
        <!-- end retrievePw-->
        <div class="retrievePwCenter">
            <input type="email" @keyup="checkSubmit" v-model="emailAddress" class="one" placeholder="邮箱地址">
            <input type="password" @keyup="checkSubmit" v-model="newPassword" class="two" placeholder="新密码">
            <input type="password" @keyup="checkSubmit" v-model="checkPassword" class="three" placeholder="确认密码">
            <input type="text" @keyup="checkSubmit" v-model="VCode" class="four" placeholder="验证码">
            <p>发送验证码</p>
        </div>
        <!-- end -->
        <div class="retrievePwBottom">
            <div class="noCheck" @click="mySubmit">提交</div>
        </div>
        <!-- end -->    
        <!-- tips     -->
        <div class="maskTips">
            
        </div>
        <!-- end -->
    </div>
</template>

<script>
export default {
    name: 'retrievePassword',
    data() {
        return {
            emailAddress: '',
            newPassword: '',
            checkPassword: '',
            VCode: ''
        }
    },
    methods: {
        checkSubmit () {
            let myEmail = this._data.emailAddress;
            let myPassword = this._data.newPassword;
            let myCheck = this._data.checkPassword;
            let myCode = this._data.VCode;
            // 判断是否填完
            if (myEmail!='' && myPassword!='' && myCheck!='' && myCode!='') {
                // 改变提交按钮颜色
                $('.noCheck').css({
                    'background': '#d40505'
                })
            }else {
                $('.noCheck').css({
                    'background': '#c7c7c7'
                })
            }
        },
        mySubmit () {
            let myEmail = this._data.emailAddress;
            let myPassword = this._data.newPassword;
            let myCheck = this._data.checkPassword;
            let myCode = this._data.VCode;
            // 如果有未填的
            if (myEmail=='' || myPassword=='' || myCheck=='' || myCode=='') {
                $('.maskTips').text('请检查邮箱格式')
                switch ('') {
                    case myEmail:
                        $('.one').focus();
                        break;
                    case myPassword:
                        $('.two').focus();                        
                        break;
                    case myCheck:
                        $('.three').focus();                                                
                        break;
                    case myCode:
                        $('.four').focus();                                                
                        break;
                }
            } else {
                // 邮箱格式
                var emailCheck = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if (emailCheck.test(myEmail)) {
                    // return true
                }else {
                    // 提示框出现
                    $('.maskTips').text('请检查邮箱格式');        
                    $('.maskTips').fadeIn();
                    setTimeout(() => {
                        $('.maskTips').fadeOut();    
                    },1500)                
                    return false
                }

                // 检查两次密码是否一致
                if (myPassword != myCheck) {
                    // 提示框出现
                    $('.maskTips').text('两次密码不一致');        
                    $('.maskTips').fadeIn();
                    setTimeout(() => {
                        $('.maskTips').fadeOut();    
                    },1500)                
                    return false
                }

                // 检查验证码是否为5555
                if (myCode != '5555') {
                    // 提示框出现
                    $('.maskTips').text('验证码错误');        
                    $('.maskTips').fadeIn();
                    setTimeout(() => {
                        $('.maskTips').fadeOut();    
                    },1500)                
                    return false
                }
            }
            // post后台了
            this.$http.post(this.HOST+'users/forgetPassword',{
                userEmail: myEmail,
                password: myPassword,
                // VCode: myCode,                
            },{
                emulateJSON: true
            }).then(function (resp) {
                if (resp.bodyText == 'seccuss') {
                    console.log(resp);
                    // 修改成功跳转路由
                    // 提示框出现
                    $('.maskTips').text('修改成功');        
                    $('.maskTips').fadeIn();
                    setTimeout(() => {
                        $('.maskTips').fadeOut();    
                        this.$router.go(-1)
                    },1500)                
                }else {
                    console.log(resp);
                    
                }

            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')                
            })
        },
        retrievePwReturn ()　{
            console.log('registerReturn');
            this.$router.push({
                path:'/login'
            })
        }
    }
}
</script>

<style>
.pageRetrievePw {
    background: #f1f1f1;
    height: 100vh;
}
/* registerTop the style */
.retrievePwTop {
    /* background: rgb(192, 3, 3); */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
    color: white;
    height: 10vh;
}
.retrievePwTop img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
/* end */
/* retrievePwCenter style */
.retrievePwCenter {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;    
}
.retrievePwCenter input {
    width: 87%;
    height: .6rem;
    border: none;
    /* 改变默认选择颜色 */
    outline-color: #d40505;
    margin: .23rem 0 0 0;
    padding: .1rem;
}
.retrievePwCenter p {
    width: 87%;
    font-size: .20rem;
    text-align: end;
    margin-top: .3rem;
    color: #d40505;
}
/* end */
/* retrievePwBottom */
.retrievePwBottom {
    display: flex;
    justify-content: center;
}
.retrievePwBottom div{
    color: white;
    width: 87%;
    height: .8rem;
    text-align: center;
    line-height: .78rem;
    font-size: .26rem;
    margin-top: .8rem;
    border-radius: .12rem;
}
/* 如果信息没有填完禁用按钮 */
.noCheck {
    background: #c7c7c7;
    /* pointer-events: none; */
}
.yesCheck {
    background: rgb(192, 3, 3);
}
/* end */
/* tips */
.maskTips {
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
/* end */
</style>
