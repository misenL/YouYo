<template>
    <div class="modifyColorPage">
        <div class="modifyColorTop themeColor">
            <img @click="clickReturn" src="../../static/appIcon/return.png" alt="">
            <span>主题效果</span>
        </div>
        <!-- end -->
        <div class="modifyColorContent">
            <li
             v-for="(item, index) in modifyColor" 
             :key="index"
             @click="modifyTheme(index)">
                <div :style="{background:item.color}"></div>
                <span>{{item.colorName}}</span>
                <img src="../../static/appIcon/tick.png" alt="" v-show="item.tick">
            </li>
        </div>
        <!-- <div class="testColor">
            testThemeColor
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'modifyColor',
    data ()　{
        return {
            modifyColor: [
                {color: '#c00303', colorName: '节日红', tick: true},
                {color: '#31c37c', colorName: '幸运绿', tick: false},
                {color: '#2196f3', colorName: '天空蓝', tick: false},
                {color: '#9c27b0', colorName: '罗兰紫', tick: false},
                {color: '#424242', colorName: '冷灰', tick: false},
                {color: '#ffa726', colorName: '杏黄', tick: false},
            ]
        }
    },
    methods: {
        clickReturn () {
            this.$router.push({
                path:'/personalContent'
            })
        },
        modifyTheme (el) {
            console.log(el);
            console.log(this._data.modifyColor);
            let modifyTick = this._data.modifyColor;
            modifyTick.forEach((el, index) => {
                el.tick = false
            });
            switch (el) {
                case 0:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/festivalRed.css')
                    modifyTick[el].tick = true
                    break;
                case 1:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/luckyGreen.css')
                    modifyTick[el].tick = true
                    break;
                case 2:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/skyBlue.css')
                    modifyTick[el].tick = true
                    break;
                case 3:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/rolandPurple.css')
                    modifyTick[el].tick = true
                    break;
                case 4:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/coldAsh.css')
                    modifyTick[el].tick = true
                    break;
                case 5:
                    document.getElementById('modifyTheme').setAttribute('href','./static/css/apricotYellow.css')
                    modifyTick[el].tick = true
                    break;                
            }
        }
    }
}
</script>

<style>
.modifyColorPage {
    height: 100vh;
}
/* modifyColorTop style */
.modifyColorTop {
    height: 9vh;
    /* background: #c00303; */
    font-size: .3rem;
    color: white;
    box-shadow: 0px 3px 5px #c0030380;
    display: flex;
    align-items: center;
}
.modifyColorTop img {
    height: .4rem;
    width: .3rem;
    margin: 0 .4rem;
}
/* end */
/* modifyColorContent style */
.modifyColorContent li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
    font-size: .26rem;
    height: 8vh;
}
.modifyColorContent li div {
    height: 3.2vh;
    width: 3.2vh;
    border-radius: 1.6vh;
    margin: 0 .3rem;
}
.modifyColorContent li img {
    width: .3rem;
    height: .3rem;
    margin-left: auto;
    margin-right: .5rem;
}
/* end */
</style>
