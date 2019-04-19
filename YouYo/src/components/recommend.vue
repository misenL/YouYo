<template>
    <div class="recommendPage">
        <div class="recommendLabel">
            <span class="recommendTop">同类推荐</span>
            <div class="likeLabel">
                <li
                 class="likeLabelContent"
                 v-for="(item, index) in likeLabel" 
                 :key="index"
                 @click="recoToGameInfo(item._id)">
                    <img class="recommendImg" :src="item.apkIcon" alt="">
                    <span class="recommendName">{{item.apkName}}</span>
                    <!-- 评分 -->
                    <span class="starAndScore">
                        <!-- 星星图标 -->
                        <img class="recommendStar" src="../../static/appIcon/star.png" alt="">
                        <span class="starSpan">{{item.apkStar[0]}}</span>
                    </span>
                </li>
            </div>
            <!-- end -->
        </div>
        <!-- end -->
        <div class="recommendManufacturer">
            <span class="recommendTop">厂商其它游戏</span>
            <div class="likeLabel">
                <li
                 class="likeLabelContent"
                 v-for="(item, index) in likeManufacturer" 
                 :key="index"
                 @click="recoToGameInfo(item._id)">
                    <img class="recommendImg" :src="item.apkIcon" alt="">
                    <span class="recommendName">{{item.apkName}}</span>
                    <!-- 评分 -->
                    <span class="starAndScore">
                        <!-- 星星图标 -->
                        <img class="recommendStar" src="../../static/appIcon/star.png" alt="">
                        <span class="starSpan">{{item.apkStar[0]}}</span>
                    </span>
                </li>
            </div>
        </div>
        <!-- end -->
        <div class="recommendEditX">
            <span class="recommendTop">编辑推荐</span>
            <div class="likeLabel">
                <li
                 class="likeLabelContent"
                 v-for="(item, index) in likeLabel" 
                 :key="index"
                 @click="recoToGameInfo(item._id)">
                    <img class="recommendImg" :src="item.apkIcon" alt="">
                    <span class="recommendName">{{item.apkName}}</span>
                    <!-- 评分 -->
                    <span class="starAndScore">
                        <!-- 星星图标 -->
                        <img class="recommendStar" src="../../static/appIcon/star.png" alt="">
                        <span class="starSpan">{{item.apkStar[0]}}</span>
                    </span>
                </li>
            </div>
        </div>
        <!-- end -->
    </div>
</template>

<script>
export default {
    name: 'recommend',
    data () {
        return {
            // 同类推荐
            likeLabel: [],
            // 同厂商推荐
            likeManufacturer: [],
            // 编辑推荐
            likeEdit: []
            
        }
    },
    created () {
        // console.log(this.$route.query.label);
        // get 同类推荐代码
        this.$http.get(this.HOST+'getAPKInfo/gameAlike/'+this.$route.query.label[0]).then(function (resp) {
                // resp.data中获取ResponseData实体
            console.log(resp.body);
            this.likeLabel = resp.body;
        },function(resp){
                // 发生错误
                console.log('get err:');
        })
        // get 同厂商推荐
        this.$http.get(this.HOST+'getAPKInfo/gameManufacturer/'+this.$route.query.Manufacturer).then(function (resp) {
                // resp.data中获取ResponseData实体
            console.log(resp.body);
            this.likeManufacturer = resp.body;
        },function(resp){
                // 发生错误
                console.log('get err:');
        })
        // 编辑推荐
        this.$http.get(this.HOST+'getAPKInfo/likeYou').then(function (resp) {
                // resp.data中获取ResponseData实体
            console.log(resp.body);
            this.likeEdit = resp.body;
        },function(resp){
                // 发生错误
                console.log('get err:');
        })
    },
    methods: {
        recoToGameInfo(el) {
            console.log(el);
            this.$router.push({
                path:'/gameDetails/introduction',
                query:{
                    _id: el,
                }
            });
            this.$router.go(0)
        }
    }
}
</script>

<style>
.recommendPage {
    background: #eee;
}
.recommendLabel, .recommendManufacturer, .recommendEditX {
    background: white;
    /* padding-bottom: .17rem; */
}
.recommendTop {
    font-size: .26rem;
    display: block;
    margin-left: .2rem;
    margin-top: .17rem;
    padding-top: .17rem;
}
.likeLabel {
    width: 100vw;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
}
.likeLabelContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: .25rem;
    margin: .2rem .22rem;
}
.recommendImg {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: .25rem;
}
.recommendName {
    width: 1rem;
    padding-left: .07rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.starAndScore {
    display: flex;
    align-items: center;
}
.recommendStar {
    width: .3rem;
    height: .3rem;
}
.starSpan {
    font-size: 8px;
    padding-left: .02rem;
}
</style>
