<template>
    <div class="downAdminPage">
        <div class="downAdminTop themeColor">
            <div class="downAdminTopContent">
                <img @click="downAdminReturn" src="../../static/appIcon/return.png" alt="">                
                <li>下载管理</li>
            </div>
            <div class="downAdminTopList">
                <li
                 :class="{downAdminTopListCheck:adminListCheck1}"
                 @click="downClick()">
                    下载
                </li>
                <!-- <li
                 :class="{downAdminTopListCheck:adminListCheck2}"
                 @click="AdminAPK()">
                    APK/XAPK管理
                </li> -->
            </div>
        </div>
        <!-- end -->
        <div class="downAdminContent" v-show="downShow">
            <div class="hearInfor">
                <span>下载历史</span>
                <!-- <img src="../../static/appIcon/delete.png" alt=""> -->
            </div>
            <li
             v-for="(item, index) in downAdmin"
             :key="index"
             class="softwareList"
             v-on:touchstart="hiddenMenu('downAdmin')">
                <img :src="item.apkIcon" class="softwareImg">
                <div class="softwareName">
                    <span>{{item.apkName}}</span>
                    <span>{{item.apkSize}}MB</span>
                </div>
                <!-- 三个小点 -->
                <div class="adminListMenu"
                  v-on:click.stop="ShowMenu('downAdmin', index)"
                  v-on:touchstart.stop="">
                    <span></span>
                    <span></span>
                    <span></span>                 
                </div>
                <!-- end -->                
                <div class="divButton" v-if="item.isDown">打开</div>
                <div class="divButton downColor" v-else>{{downNumber}}</div>
                <!-- 菜单 -->
                <transition name="slide-fade">
                    <div class="DlistMenu" v-if="item.menuShow" 
                     v-on:touchstart.stop="">
                        <li @click="listMenuItem('downAdmin', item)">删除</li>
                    </div>
                </transition>
            </li>
        </div>
        <!-- end -->
        <div class="apkAdminContent" v-show="apkShow">
            <div class="hearInfor">
                <span>APK/XAPK管理</span>
                <img src="" alt="">
            </div>
            <li
             v-for="(apkItem, index) in apkAdmin" 
             :key="index"
             class="apkList"
             v-on:touchstart="hiddenMenu('apkAdmin')">
                <img :src="apkItem.img" alt="" class="apkImg">
                <div class="apkName">
                    <span>{{apkItem.apkName}}</span>
                    <span>{{apkItem.apkSize}}</span>
                </div>
                <!-- 三个小点 -->
                <div class="adminListMenu"
                  v-on:click.stop="ShowMenu('apkAdmin', apkItem)"
                  v-on:touchstart.stop="">
                    <span></span>
                    <span></span>
                    <span></span>                 
                </div>
                <!-- end -->
                <div class="apkInstall">安装</div>
                <!-- 菜单 -->
                <transition name="slide-fade">
                    <div class="DlistMenu" v-if="apkItem.menuShow" 
                    v-on:touchstart.stop="">
                        <li @click="listMenuItem('apkAdmin', apkItem)">删除</li>
                    </div>
                </transition>
            </li>
        </div>
        <!-- end -->
    </div>
</template>

<script>
export default {
    name: 'downAdmin',
    data () {
        return {
            downShow: true,
            apkShow: false,
            adminListCheck1: true,
            adminListCheck2: false,
            downNumber: '0%',
            // 下载
            downAdmin: [
                // {img: '../../static/gameIcon/2.jpg', menuShow:false, softwareName: '崩坏3', softSize: '30.5MB', isDown: true},
            ],
            // apk管理
            apkAdmin: [
                {img: '../../static/gameIcon/2.jpg', menuShow:false, apkName: '崩坏3', apkSize: '30.5MB'},
                {img: '../../static/gameIcon/2.jpg', menuShow:false, apkName: 'AFP Arux', apkSize: '30.5MB'},
            ]
        }
    },
    created() {
        this.$http.post(this.HOST+'users/userDownGame',{
            userEmail: this.$store.state.userEmail,
        },{
            emulateJSON: true
        }).then(function (resp) {
            console.log(resp.body[0]);
            this.downAdmin = resp.body;
            for (let i in resp.body) {                
                this.downAdmin[i].apkSize = resp.body[i].apkSize.toFixed(2)
                this.downAdmin[i].menuShow = false;
                this.downAdmin[i].isDown = true
            }
            console.log(this.downAdmin);
        },function (resp) {
            // 发生错误
            alert('抱歉服务器异常')
        })
    },
    methods: {
        // 点击屏幕隐藏菜单
        hiddenMenu (ele) {
            if (ele == 'downAdmin') {
                //循环隐藏所有列表                
                this.downAdmin.forEach(function (el) {
                    el.menuShow = false;
                });
            } else {
                //循环隐藏所有列表                
                this.apkAdmin.forEach(function (el) {
                    el.menuShow = false;
                });
            }
        },
        // 菜单里的按钮
        listMenuItem(re,ele) {
            console.log(re,ele);
            console.log(ele._id);
            this.$http.post(this.HOST+'users/removeOne',{
                userEmail: this.$store.state.userEmail,
                apkId: ele._id
            },{
                emulateJSON: true
            }).then(function (resp) {
                console.log(resp);
                if (resp.bodyText == 'success') {
                    this.$http.post(this.HOST+'users/userDownGame',{
                        userEmail: this.$store.state.userEmail,
                    },{
                        emulateJSON: true
                    }).then(function (resp) {
                        console.log(resp.body[0]);
                        this.downAdmin = resp.body;
                        for (let i in resp.body) {                
                            this.downAdmin[i].apkSize = resp.body[i].apkSize.toFixed(2)
                            this.downAdmin[i].menuShow = false;
                            this.downAdmin[i].isDown = true
                        }
                        console.log(this.downAdmin);
                    },function (resp) {
                        // 发生错误
                        alert('抱歉服务器异常')
                    })
                    }
            },function (resp) {
                // 发生错误
                alert('抱歉服务器异常')
            })
        },
        // 点击三个小点显示菜单
        ShowMenu(re, ele) {
            console.log(ele);
            // 根据re判断点击那个模块
            if (re == 'downAdmin') {
                //循环隐藏所有列表                
                this.downAdmin.forEach(function (el) {
                    el.menuShow = false;
                });
                this.$set(this.downAdmin, ele, {
                    menuShow: true, 
                    apkName: this.downAdmin[ele].apkName,                    
                    apkIcon: this.downAdmin[ele].apkIcon,
                    isDown: this.downAdmin[ele].isDown,                    
                    apkSize: this.downAdmin[ele].apkSize,
                    _id: this.downAdmin[ele]._id})
                console.log(this.downAdmin);
                
            } else {
                this.apkAdmin.forEach(function (el) {
                    el.menuShow = false;
                });
                this.$set(this.downAdmin, ele, {menuShow: false})
                console.log(this.downAdmin);                
            }
            // this.downAdmin[0].menuShow = true;
        },
        downAdminReturn () {
            console.log('downAdminReturn');
            this.$router.push({
                path:'/personalContent'
            })
        },
        downClick () {
            console.log('downClick');
            // 切换vshow
            this._data.downShow = true;
            this._data.apkShow = false;
            // 改变点击时的下滑线
            if (!this._data.adminListCheck1) {
                this._data.adminListCheck1=true
                this._data.adminListCheck2=false                
            }
        },
        AdminAPK () {
            console.log('AdminAPK');
            // 切换vshow
            this._data.downShow = false;
            this._data.apkShow = true;
            // 改变点击时的下滑线            
            if (!this._data.adminListCheck2) {
                this._data.adminListCheck2=true
                this._data.adminListCheck1=false                
            }
        },
    }
}
</script>

<style>
.downAdminPage {
    background: #f1f1f1;
    height: 100vh;
    color: white;
}
/* downAdminTop style */
.downAdminTop {
    /* background: #c00303; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 14vh;
}
.downAdminTopContent {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: .3rem;
    color: white;
    height: 9vh;
}
.downAdminTopContent img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
.downAdminTopList {
    width: 100%;
    height: 5vh;
    font-size: .26rem;
}
.downAdminTopList li {
    height: 4.6vh;
    width: 50%;
    /* background: #e255e2; */
    text-align: center;
    line-height: 3.7vh;
    float: left;
}
.downAdminTopListCheck {
    border-bottom: .4vh white solid;
}
/* end */
/* downAdminContent style */
.downAdminContent ,.apkAdminContent {
    padding-top: 1.5vh;
    height: 86vh;
    overflow-y: auto;
}
.hearInfor {
    font-size: .26rem;
    color: black;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem .3rem;
}
.hearInfor img {
    width: .28rem;
    height: .28rem;
    margin-right: .1rem
}
.softwareList ,.apkList {
    color: black;
    font-size: .25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    background: white;
}
.softwareImg ,.apkImg {
    width: 16vw;
    height: 16vw;
    margin: .18rem .3rem;    
    border-radius: .2rem
}
.softwareName ,.apkName {
    width: 45vw;
    height: 16vw;
    margin-right: auto;
    padding-top: .05rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.softwareName :last-child,
.apkName :last-child {
    font-size: .2rem;
    color: #707070;
    margin-top: .05rem;
}
.adminListMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: auto;
}
.adminListMenu span {
    background: #adadad;
    height: 4px;
    width: 4px;
    border-radius: 2px;
    margin: 0.02rem
}
/* end */
.divButton ,.apkInstall {
    border: 1px #c00303 solid;
    border-radius: .05rem;
    width: 15vw;
    height: 7vw;
    text-align: center;
    line-height: 7vw;
    color: #c00303;
    box-shadow: 1px 3px 5px #c0030357;
    margin-right: auto;
}
.downColor {
    border: 1px #00c362 solid;
    color: #00c362;
    box-shadow: 1px 3px 5px #09c00357;    
}
/* end */
/* this is list in menu */
.DlistMenu {
    width: 2.1rem;
    position: absolute;
    font-size: .26rem;
    right: 1.7rem;
    margin-top: .1rem;
    text-align: left;
    border-radius: .1rem;
    border: 1px solid rgb(177, 222, 240);
    box-shadow: -4px 10px 10px #cfcfcf;
    background: white;
    z-index: 99;
}
.DlistMenu li {
    margin: .15rem 0;
    padding: 0 .5rem .05rem .3rem;
}
/* .ifTrueColor {
    color: #999999;
} */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/* end */
</style>
