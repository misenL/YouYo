<template>
    <div class="superAdminPage">
        <li class="oneRow">
            <span>游戏名字</span>
            <input type="text" v-model="apkName" name="" id="" />            
        </li>
        <li class="oneRow">
            <span>apk/xapk文件</span>
            <input id="apkFile" type="file" @change="uploadAPK" value="APK/XAPK文件" />
        </li>
        <li class="oneRow">
            <span>选择封面</span>
            <input id="coverImgFile" type="file" @change="uploadCoverImg" value="封面文件" />            
        </li>
        <li class="oneRow">
            <span>游戏截图</span>
            <input id="gameImgFile" type="file" @change="uploadGameImg" value="游戏截图" multiple />             
        </li>
        <li>{{gameImgName}}</li>
        <li class="oneRow">
            <span>安装包类型</span>
            <div>
                <label><input type="radio" v-model="install" value="apk" />apk</label>
                <label><input type="radio" v-model="install" value="xapk" />xapk</label>                
            </div>
        </li>
        <li class="oneRow">
            <span>游戏厂商</span>
            <input type="text" v-model="apkManufacturer" name="" id="" />
        </li>
        <li class="oneCol">
            <span>游戏介绍</span>
            <textarea class="colStyle" v-model="apkIntroduce" id="" cols="30" rows="10"></textarea>
        </li>
        <li class="oneCol">
            <span>游戏标签</span>
            <div class="colStyle">
                <label><input type="checkbox" name="" id="" value="竞技" v-model="gameLabel">竞技</label>
                <label><input type="checkbox" name="" id="" value="动作" v-model="gameLabel">动作</label>
                <label><input type="checkbox" name="" id="" value="卡牌" v-model="gameLabel">卡牌</label>
                <label><input type="checkbox" name="" id="" value="生存" v-model="gameLabel">生存</label>
                <label><input type="checkbox" name="" id="" value="益智" v-model="gameLabel">益智</label>
                <label><input type="checkbox" name="" id="" value="MOBA" v-model="gameLabel">MOBA</label>                
                <label><input type="checkbox" name="" id="" value="单机" v-model="gameLabel">单机</label>                
            </div>
            <span @click="testArry">{{gameLabel.length}}</span>
        </li>
        <li class="oneRow">
            <span>游戏评分0~99</span>
            <input type="text" v-model="apkStar" name="" id="" />
        </li>
        <input type="button" value="上传" @click="onSubmit">
    </div>
</template>

<script>

export default {
    name: 'superAdmin',
    data () {
        return {
            apkName: '',            // 游戏名字
            install: '',            // 安装包类型
            apkManufacturer: '',    // 厂商名字
            apkIntroduce: '',       // 游戏介绍
            gameLabel: [],
            apkStar: '',            // 游戏评分
            formData: new FormData(),    //新建一个form对象储存数据

            gameImgName: [],
        }
    },
    methods: {
        testArry () {
            console.log(this.gameLabel);            
            
        },
        // 总提交函数
        onSubmit () {
            // console.log(this.formData);
            var url = 'http://localhost:3000/uploadAPK/uploadAPK';
            var config = {
            headers:{'Content-Type':'multipart/form-data'}
            };
            for (let i in this.gameLabel) {
                this.formData.append('apkLabel', this.gameLabel[i])                
            }
            this.formData.append('apkName', this.apkName)
            this.formData.append('apkManufacturer', this.apkManufacturer)
            this.formData.append('apkOrXapk', this.install)
            this.formData.append('apkIntroduce', this.apkIntroduce)
            this.formData.append('apkStar', this.apkStar);
            console.log(this.formData);            
            // ajax提交
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                data: this.formData,
                processData: false,
                contentType: false
            }).done(function(res) {
                console.log(res);
            }).fail(function(res) {});
            //http://localhost:3000/uploadAPK/app2.apk
        },
        // 每个提交文件触发的函数
        uploadAPK(file,callback){  
            // console.log($('#apkFile')[0].files[0]);
            // console.log(file);
            this.formData.append("file", $('#apkFile')[0].files[0]);//APK文件
        },
        uploadCoverImg(file,callback){  
            // console.log($('#coverImgFile')[0].files[0]);
            // console.log(file);
            this.formData.append("file", $('#coverImgFile')[0].files[0]);//APK文件
        },
        uploadGameImg(file,callback){  
            // console.log($('#gameImgFile')[0].files[0]);
            // console.log(file);
            this.formData.append("file", $('#gameImgFile')[0].files[0]);//APK文件
            this.gameImgName.push($('#gameImgFile')[0].files[0].name)
            // console.log(this.formData);
            
        },
    }
}
</script>

<style>
.superAdminPage {
    height: 100vh;
    overflow-y: auto;
    font-size: .3rem;
}
.oneRow> span,
.oneCol> span {
    width: 30vw;
    margin: .2rem
}
.oneRow> input {
    width: 60vw;
}
.oneRow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.oneCol {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.colStyle {
    margin: .2rem;
}
</style>
