<template>
  <div class="home">
        <div>homeeeeee</div>

        <h2>hash路由切换</h2>
        <ul>
            <li><router-link to="/aa">aa</router-link></li>
            <li><router-link to="/bb">bb</router-link></li>
        </ul>
        <h2> cube ui组件loading使用</h2>
        <cube-loading></cube-loading>
        <h2>一像素的写法</h2>
        <div class="test1px">111222</div>
        <h2>多语言支持默认加载en-US</h2>
        <div> 多语言支持 {{$t("la")}}</div>
        <div>多语言支持 {{$t("testLang")}}</div>
        <div class="test-bridge1" @click="testBridge"></div>
        <div class="test-bridge2" @click="closePage"></div>
</div>

</template>

<script>
import _get from '../../lib/lodash-es/get.js';

export default {
    data() {
        return {};
    },
    created() {

    },
    mounted() {


    },
    methods: {
        testBridge: function () {
            console.log('ONEOpenPaymentVC');
            _get(Fusion, 'walletModule.gotoWallet', '') && Fusion.walletModule.gotoWallet({}, function (response) {});
        },
        closePage: function () {
            _get(Fusion, 'closePage', '') && Fusion.closePage({}, function (response) {});
        }
    }
};
</script>

<style lang="stylus">
@import '../../common/css/common.styl';

h2
    color: red
.home
    color: black
    width: px2rem(300)
    height: 500px
    border: 1px solid #000
.test1px
    width: 50px
    height: 50px
    real1px(#fd0101)
.others
    color: yellow
.test-bridge1, .test-bridge2
    width 100px
    height 100px
    background-color red
.test-bridge2
    background-color yellow
</style>
