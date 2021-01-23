<template>
    <div id="notFoundPage">
        <div class="content404">
            <img src="../assets/images/comic-404.png">
        </div>
        <div class="bottom404">
            <span @click="toHomePage">去V房首页</span>
        </div>
    </div>
</template>

<script>
    export default {
    metaInfo() {
      return { 
        title:  "V房，买房指导专家，房产大V_一对一买房建议，房产知识平台",
        meta: [
          {                 // set meta
            name: 'keyWords',
            content:'V房，V房网，房产大V，饭总选房，北京买房，购房买房，房产资讯，北京房产'
          },
          {                 // set meta
            name: 'description',
            content:'饭总，京房字，北京拆哪等知名房产大V联合推荐！全国值得信赖的买房指导平台，为买新房、二手房及投资房产的用户提供一对一买房建议或购房咨询'
          },
        ]
      }
    },      
        data() {
            return {

            };
        },
        methods: {
            toHomePage() {
                this.$router.push({name:'Index'});
            }
        }
    };
</script>

<style scoped>
    body {
        margin: 0;
        height: 100vh;
    }
    #notFoundPage {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .header404 {
        height: 36px;
        width: 100%;
        border-bottom: 1px solid #bfbfbf;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title404 {
        line-height: 30px;
        font-size: 16px;
    }

    .content404 {
        width: 100%;
        height: 50%;
        overflow: hidden;
        margin: 1.6rem 0 1.066667rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content404 img {
        height: 260px;
        width: 260px;
    }

    .bottom404 {
        height: 40px;
        width: 100%;
        text-align: center;
    }

    .bottom404 span {
        height: 1.066667rem;
        width: 4.26667rem;
        display: inline-block;
        color: #ffffff;
        background: #FF8300;
        border-radius: 4px;
        text-align: center;
        line-height: 1.066667rem;
        font-size: 16px;
        letter-spacing: 0;
    }
</style>