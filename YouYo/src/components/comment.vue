<template>
    <div class="commentPage">
        <div class="commentList" v-for="item in items">
            <div class="commentListTop">
                <div class="imgNameStart">
                    <img class="commentImg" :src="item.gameImg" alt="">                    
                    <div class="nameAndStart">
                        <span>{{item.gameName}}</span>
                        <div class="commentStart">
                            <!-- this is start -->
                        </div>
                    </div>
                </div>
                <span class="gameTime">{{item.gameTime}}</span>                                    
            </div>
            <div class="commentContent">
                {{item.commentContent}}
            </div>
            <div class="commentMore" @click="commentMore">更多</div>
            <div class="commentReply">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {gameImg: '../../static/gameIcon/2.jpg',
                 gameName: 'Misen',
                 gameTime: '2018-12-25',
                 commentContent: '天赋推荐:银刚狼，环境家或者是修仙者（推图首选大块头）最后一个最好是清扫者，没有也没事，可以考虑洞察师或者是速游者（如果你经常打沉船）。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。五:打不过可以选择野蛮人武斗，赢了直接触发火山逃跑，不过智斗也可以，只要在规定的步数以内解决就是完胜，一样的剧情。并且可以解锁硫酸这个交易。'}
            ]
        }
    },
    methods: {
        commentMore () {
            console.log('commentMore');
            $('.commentContent').css(
                'height', '100%'
            )
            $('.commentMore').hide();
        }
    }
}
</script>

<style>
    .commentPage {
        padding: 0 .3rem;
        background: white;
    }
    .commentList {
        padding-bottom: .2rem;
        border-bottom: 1px solid #d3d3d3;
    }
    .commentListTop {
        padding: .2rem 0 .1rem 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .commentContent {
        height: 1.5rem;
        overflow: hidden;
    }
    .imgNameStart {
        width: 2.6rem;
        font-size: .28rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .gameTime {
        margin-top: .1rem;
        font-size: .23rem;
        color: rgb(165, 165, 165);
    }
    .commentImg {
        width: .8rem;
        border-radius: .4rem;
    }
    .nameAndTime {
        display: flex;
        justify-content: space-between;
    }
    .commentStart {
        background: aqua;
    }
    .commentContent {
        font-size: .25rem;
        line-height: .4rem;
    }
    .commentMore {
        float: right;
        color: lightseagreen;
        font-size: .2rem;        
    }
    .commentReply {
        background: #d3d3d3;
        height: 1.5rem;
        border-radius: .1rem;
        margin-top: .4rem;
    }
</style>
