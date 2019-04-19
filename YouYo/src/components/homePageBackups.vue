<template>
    <div>
        <div class="homePage">
            <!-- 我的游戏 -->
            <div class="homeList myGame">
                <!-- 我的游戏头部的那一行 -->
                <div class="homeListTop" @click="moreDown('myGame')">
                    <span class="listDivSpan">我的游戏</span>
                    <p>
                        <span>（{{myGameNumber}}）</span>
                        <img class="myGameMoreDown" :src="moreIconDown" alt="">
                        <img class="myGameMoreUp hiddenImg" :src="moreIconUp" alt="">
                    </p>
                </div>
                <!-- 这是里面的内容 -->
                <div class="homeListContent">
                    <li v-for="item in myGameContent" :key="item.index">
                        <img :src="item.img" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </div>
            </div>
            <!-- 这是我的收藏 -->
            <div class="homeList myCollection hiddenDivContent">
                <!-- 这是头部 -->
                <div class="collectionTop" @click="moreDown('myCollection')">
                    <span class="listDivSpan">我的收藏</span>
                    <p>
                        <span>（{{myCollection}}）</span>
                        <img class="collectionMoreDown hiddenImg" :src="moreIconDown" alt="">
                        <img class="collectionMoreUp" :src="moreIconUp" alt="">                        
                    </p>
                </div>
                <!-- 这是里面的内容 -->
                <div class="collectionContent">
                    <li v-for="item in collectionContent" :key="item.index" @click="collToGameInfo(item._id)">
                        <img :src="item.apkIcon" alt="">
                        <span>{{item.apkName}}</span>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    data () {
        return {
            myGameNumber: 5,
            myCollection: 0,
            moreIconDown: '../../static/appIcon/upArrows.png',
            moreIconUp: '../../static/appIcon/downArrows.png',
            myGameContent: [
                {name: '崩坏3', img: '../../static/gameIcon/3.png', index: 1},
                {name: '崩坏3', img: '../../static/gameIcon/4.png', index: 2},
                {name: '崩坏3', img: '../../static/gameIcon/5.png', index: 3},
                {name: '崩坏3', img: '../../static/gameIcon/6.png', index: 4},
                {name: '崩坏3', img: '../../static/gameIcon/7.png', index: 5},                
            ],
            collectionContent: []
        }
    },
    created () {
        // post 用户收藏
        this.$http.post(this.HOST+'users/allCollection',{
            userCollection: JSON.stringify(this.$store.state.userCollection)
        },{
            emulateJSON: true
        }).then(function (resp) {
            console.log(resp);
            this.collectionContent = resp.body;
            this.myCollection = resp.body.length
            // resp.data中获取ResponseData实体
        },function (resp) {
            // 发生错误
            alert('抱歉服务器异常')                
        })
    },
    methods: {
        // 点击收藏的游戏跳转路径
        collToGameInfo (el) {
            console.log('_id:',el);
            this.$router.push({
                path:'/gameDetails/introduction',
                query:{
                    _id: el,
                }
            })
        },
        moreDown (choose) {
            if (choose == 'myGame') {
                console.log(choose);
                $('.myGame').removeClass('hiddenDivContent');
                $('.myCollection').addClass('hiddenDivContent');
                // 箭头变化
                //这是我的游戏的箭头变化
                $('.myGameMoreDown').removeClass('hiddenImg');               
                $('.myGameMoreUp').addClass('hiddenImg');
                // 这是收藏的箭头变化
                $('.collectionMoreUp').removeClass('hiddenImg');               
                $('.collectionMoreDown').addClass('hiddenImg');

            } else if (choose == 'myCollection') {
                console.log(choose);
                $('.myGame').addClass('hiddenDivContent');                
                $('.myCollection').removeClass('hiddenDivContent');
                // 箭头变化
                // 这是收藏的箭头变化
                $('.collectionMoreDown').removeClass('hiddenImg');               
                $('.collectionMoreUp').addClass('hiddenImg');
                //这是我的游戏的箭头变化
                $('.myGameMoreUp').removeClass('hiddenImg');               
                $('.myGameMoreDown').addClass('hiddenImg');
            }
        }
    }
}
</script>

<style>
.homePage {
    /* background: #d22; */
    width: 100%;
    height: 92vh;
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center; 
}
.homeList {
    width: 90%;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    /* 模糊阴影 x y 距离 尺寸 */
    box-shadow: 1px 2px 10px rgb(214, 214, 214);
    background: #ffffff;
}
.myGame {
    margin-top: 3vh;
    height: 70vh;
}
.myCollection {
    height: 70vh;
    z-index: 99;
}
/* 好像是我的游戏头部样式+部分我的收藏的公共样式 */
.homeListTop, .collectionTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .28rem;
    color: #7a7a7a;    
    padding: .1rem .2rem;
    height: 3.5vh;
}
.myGameMoreDown, .myGameMoreUp,
.collectionMoreDown, .collectionMoreUp {
    width: .4rem;
}
.homeListTop> p, .collectionTop> p {
    display: flex;
    align-items: center;
}
/* 我的游戏内容样式+收藏的公共样式*/
.homeListContent, .collectionContent {
    display: flex;
    flex-wrap: wrap
}
.homeListContent> li, .collectionContent> li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1vh 4.2vw;
}
.homeListContent> li> img, .collectionContent> li> img {
    width: 1rem;
    height: 1rem;
    border-radius: 10px;
    margin-bottom: .1rem;
} 
.homeListContent> li> span, .collectionContent> li> span {
    font-size: .25rem;
}
/* 隐藏的单独样式 */
.hiddenDivContent {
    width: 85%;
    height: 4.5vh;
    overflow: hidden;
}
.hiddenImg {
    display: none;
}
</style>
