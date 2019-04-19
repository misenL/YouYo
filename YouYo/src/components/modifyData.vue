<template>
    <div class="modifyData">
        <div class="modifyDataTop themeColor">
            <img src="../../static/appIcon/leftArrow.png" @click="modifyDataReturn" alt="">
            <span>修改资料</span>
            <span @click="Preservation">保存</span>
        </div>
        <!-- end -->
        <div class="modifyDataContent">
            <div class="dataPortrait">
                <span>头像</span>
                <div class="inputImg">
                    <img :src="modifyDataImg" alt="">
                    <!-- 上传组件 -->
                    <van-uploader
                     :after-read="onRead" 
                     accept="image/gif, image/jpeg, image/png" 
                     multiple
                     class="imgUpload">
                        <!-- <van-icon name="photograph" /> -->
                    </van-uploader>
                </div>
            </div>
            <div>
                <span>用户名</span>
                <div class="inputText">
                    <input 
                     type="text" 
                     v-model="modifyDataName" 
                     maxlength="20" 
                     placeholder="最长为20字符"
                     @blur="textOnBlur('inputText')"
                     @click="textOnClick('inputText')">
                </div>
            </div>
            <div>
                <span>性别</span>
                <div class="inputSex" @click="chooseSex">
                    <span>{{modifyDataSex}}</span>
                </div>
            </div>
            <div>
                <span>邮箱</span>
                <div class="inputEmail">
                    <input 
                     type="text" 
                     v-model="modifyDataEmail" 
                     maxlength="20" 
                     placeholder="请输入正确邮箱格式"
                     @blur="textOnBlur('inputEmail')"
                     @click="textOnClick('inputEmail')"
                     readonly>
                </div>
            </div>
        </div>
        <!-- end -->
        <!-- 性别弹出遮罩 -->
        <div class="sexMask" @click="clickSexMask">
            <div class="sexMaskDiv" @click.stop>
                <span>请选择您的性别</span>
                <div class="chooseDiv">
                    <li @click="clickChoose('Man')">
                        <img src="../../static/appIcon/sexMan.png" alt="">
                        <span>男</span>
                    </li>
                    <li @click="clickChoose('Girl')">
                        <img src="../../static/appIcon/sexGirl.png" alt="">
                        <span>女</span>                        
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// 为图片上传做准备
export function uploadImageReq(params,callback) {
    const url = 'http://localhost:3000/uploadImg/uploadImg';
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    axios.post(url, params, config).then(callback);
}

export default {
    name: 'modifyData',
    data () {
        return {
            modifyDataImg: '',          //multer
            modifyDataName: '',
            modifyDataSex: '男',
            modifyDataEmail: '',
            emailFormat: false,          // false无错误。true错误
            nameFormat: false           // false无错误。true错误
        }
    },
    methods: {
        // 修改头像
        // 异步获取路径和参数
        async onRead (file) {
            console.log(file);
            let self = this;
            let params = new FormData();        // 创建form对象
            params.append("file", file.file);
            uploadImageReq (params, function(res) {
                console.log(res);
                
                var path = res.data.params.img_url;
                self.cover = path;
                console.log(path);
                
                // 上传后页面出现的图片
                self.modifyDataImg = 'http://localhost:3000' + path;
            })
        },
        // 跳转路由
        modifyDataReturn () {
            this.$router.go(-1)
        },
        // 点击性别弹出选择框
        chooseSex () {
            $('.sexMask').fadeIn();
        },
        // 点击了性别选择的黑色区域
        clickSexMask () {
            $('.sexMask').fadeOut();            
        },
        // 点击男或女
        clickChoose (el) {
            $('.sexMask').fadeOut();                        
            if (el == 'Man') {
                this.modifyDataSex = '男'
            }else if (el == 'Girl') {
                this.modifyDataSex = '女'
            }
        },
        // 检查格式
        textOnBlur (el) {
            if (el == 'inputEmail') {       // 如果是邮箱
                var myEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if (myEmail.test(this.modifyDataEmail)) {
                    // return true
                    this.emailFormat = false;                    
                }else {
                    // 邮箱框变红
                    this.emailFormat = true;
                    $('.'+el).addClass('formatError');
                }
            }else {             // 用户名
                if (this.modifyDataName == '') {
                    this.nameFormat = true;                    
                    $('.'+el).addClass('formatError');                    
                }else {
                    this.nameFormat = false;                    
                }
            }
        },
        // 点击邮箱时触发
        textOnClick (el) {
            // 移除错误提示
            $('.'+el).removeClass('formatError');            
        },
        // 点击保存跳转路由
        Preservation () {
            console.log(this.modifyDataImg);
            
            // this.$router.go(-1)
            // 组件销毁时保存数据到vuex
            this.$store.commit('setUserName', this.modifyDataName);
            this.$store.commit('setUserEmail', this.modifyDataEmail);
            this.$store.commit('setUserImg', this.modifyDataImg);
            this.$store.commit('setUserSex', this.modifyDataSex);
            console.log(this.modifyDataImg);            
            // 更新到数据库
            // post 代码
            this.$http.post(this.HOST+'users/update',{  
                userName: this.modifyDataName,  
                userEmail: this.modifyDataEmail,
                userSex: this.modifyDataSex,
                userImg: this.modifyDataImg
            },{  
                emulateJSON:true  
            }).then(function(resp){
                // resp.data中获取ResponseData实体
                console.log('post success:');    
                console.log(resp);

            },function(resp){  
                // 发生错误
                console.log('post err:');  
                console.log(resp);
                alert('抱歉服务器异常')                
            });




        this.$router.push({
            path:'/',
                // query:{
                //     id: ele.id,
                // }
            })
        }
    },
    created () {
             
        this.modifyDataImg = this.$store.state.userImg;
        this.modifyDataName = this.$store.state.userName;
        this.modifyDataEmail = this.$store.state.userEmail;
    },
    destroyed () {

    }
}
</script>

<style>
.modifyData {
    background: #f1f1f1;    
    height: 100vh;
}
/* modifyDataTop style */
.modifyDataTop {
    height: 10vh;
    font-size: .3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}
.modifyDataTop img {
    width: .3rem;
    height: .4rem;
    margin: 0 .4rem
}
.modifyDataTop span:last-child {
    font-size: .24rem;
    margin: 0 .4rem;
}
/* modifyDataContent style */
.modifyDataContent {
    overflow-y: auto;
    background: white;
}
.modifyDataContent > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .26rem;
    height: 7.2vh;
}
.modifyDataContent > div:first-child {
    height: 10vh;
    /* border-bottom: 1px solid black; */
}
.modifyDataContent > div > span:first-child {
    width: 18vw;
    height: 6vh;
    line-height: 6vh;
    margin-left: .3rem;
    color: #696969;
}
.dataPortrait img {
    width: 1rem;
    height: 1rem;
    border-radius: .5rem;
}
.inputImg, .inputEmail,
.inputSex, .inputText {
    border-bottom: 1px solid #cecece;
    width: 72vw;
    height: 7vh;
    display: flex;
    align-items: center;
    padding-left: .08rem;
}
/* 最后一个不要下划线 */
.inputEmail {
    border-bottom: none;
}
.inputEmail> input {
    color: #858585
}
.inputImg {
    height: 10vh;
}
.inputText> input,
.inputEmail> input {
    width: 100%;
    border: none;
    outline: none;
}
/* 上传的input标签 */
.imgUpload {
    /* display: none; */
    opacity: 0;
    position: absolute;
    top: 10vh;
    height: 10vh;
    width: 15vw;
}
.imgUpload input {
    opacity: 0;
    height: 10vh;
    width: 15vw;
}
/* end */
.formatError {
    border: 1px solid #ff5d5d !important;
    box-shadow: 0 0 3px #ff2222;
}
/* end */
/* sexMask style */
.sexMask {
    display: none;
    z-index: 999;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
}
.sexMaskDiv {
    background: white;
    font-size: .28rem;
    height: 15vh;
    width: 64vw;
    padding: 5vw 6vw 6vw 6vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 30vh;
    margin-left: 12vw;
    border-radius: 4px;
    box-shadow: 2px 10px 10px #252525
}
.chooseDiv {
    display: flex;
    justify-content: space-between;
    margin-top: .35rem;
    width: 35vw;
}
.chooseDiv li {
    display: flex;
    align-items: center;
}
.chooseDiv img {
    width: .6rem;
}
.chooseDiv> li> span {
    margin-left: .1rem;
}
</style>
