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
</div>

</template>

<script>
import * as localApi from '../../api/index.js';
export default {
    data() {
        return {};
    },
    created() {
        console.log('created');


    },
    mounted() {
        // localApi.chargeMoney({}).then(resp => {
        //     console.log('*************test api data****************');
        //     console.log(resp);
        //     console.log('*******************************');
        // });

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
</style>
