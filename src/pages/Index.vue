<template>
  <div class="body-layout">
    <div class="body-header">机器人</div>
    <div class="body-content" ref="bodyContent">
      <div class="greetings">
        <div class="greetings-title">
          已为您分配新冠肺炎相关专业医生，请咨询“新冠肺炎”健康问题吧
        </div>
        <div class="guess">猜你要问</div>
        <div class="greetings-content">
          <div
            class="greetings-item"
            v-for="(item, index) in greetingsArr"
            :key="index"
            @click.prevent="askQuestion(item.label)"
          >
            <label>{{ item.label }}</label>
            <img src="../assets/images/arrow-icon.png" alt="" />
          </div>
        </div>
        <div class="toChange">
          <img src="../assets/images/route-icon.png" alt="" />
          <span @click.prevent="getGreetings()">换一换</span>
        </div>
      </div>
      <div v-for="(qaItem, qaIndex) in qaArr" :key="qaIndex">
        <div class="question-wrap">
          <div class="question">{{ qaItem.question }}</div>
        </div>
        <div
          class="answer-wrap"
          v-if="qaItem.answerType == 0 && qaItem.answerText"
        >
          <div class="answer" style="background: #fff">
            {{ qaItem.answerText }}
          </div>
        </div>
        <div
          class="answer-wrap"
          v-if="qaItem.answerType == 1 && qaItem.answerText"
        >
          <div class="answer">
            <img :src="qaItem.answerText" alt="" :preview="qaItem.timestamp" />
          </div>
        </div>
        <div
          class="answer-wrap"
          v-if="qaItem.answerType == 2 && qaItem.answerText"
        >
          <div
            class="answer"
            v-html="qaItem.answerText"
            style="background: #fff; color: #03a8fe; text-decoration: underline"
          ></div>
        </div>
      </div>
    </div>
    <div class="body-footer">
      <div class="input-wrap">
        <input
          type="text"
          v-model="questionTxt"
          class="questionTxt"
          placeholder="请输入你想咨询的问题"
          @keyup.enter="askQuestion()"
        />

        <img
          src="../assets/images/send-icon.png"
          alt=""
          @click="askQuestion()"
          :class="questionTxt ? '' : 'img-disabled'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/lib/util.js";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      questionTxt: "", //问题内容
      greetingsArr: [], //问候语数组，默认展示3条
      qaArr: [], //问答数组
    };
  },
  created() {
    this.getGreetings();
  },
  mounted() {},
  methods: {
    //提问
    askQuestion(questionTxt) {
      //如果是用户主动提问
      if (!questionTxt) {
        questionTxt = this.questionTxt;
      }

      if (questionTxt) {
        this.qaArr.push({
          question: questionTxt,
          answerText: "",
          answerType: 0,
          timestamp: new Date().getTime(),
        });

        //根据问题查询答案
        // util.ajax.post(url,params).then(res=>{

        //答案是文本
        this.qaArr[this.qaArr.length - 1].answerText = "哈哈哈哈双方都";
        this.qaArr[this.qaArr.length - 1].answerType = 0;
        // //答案是图片
        // this.qaArr[this.qaArr.length - 1].answerText =
        //   "http://benyouhuifile.it168.com/forum/201709/04/142843gxbi5i5zbwtztbby.jpg";
        // this.qaArr[this.qaArr.length - 1].answerType = 1;
        // //答案是超链
        // this.qaArr[this.qaArr.length - 1].answerText =
        //   "<a href='https://www.baidu.com/'>百度</a>";
        // this.qaArr[this.qaArr.length - 1].answerType = 2;
        //页面元素滚动到聊天室底部
        this.$nextTick(() => {
          let bodyContent = this.$refs.bodyContent; // 获取对象
          bodyContent.scrollTop = bodyContent.scrollHeight; // 滚动高度

          document.documentElement.scrollTop = bodyContent.scrollHeight;
          document.body.scrollTop = bodyContent.scrollHeight;

          //清空问题输入框
          this.questionTxt = "";

          //对图片预览插件初始化
          this.$previewRefresh();
        });

        // })
      }
    },
    //获取问候语数组
    getGreetings() {
      // util.ajax.get("/ad/get/19/1").then((res) => {
      let resData = [
        {
          value: 0,
          label: "新型冠状肺炎的症状是什么？",
        },
        {
          value: 1,
          label: "PC内弹出的对话页面?",
        },
        {
          value: 2,
          label: "微信内弹出的H5对话页面？",
        },
        {
          value: 3,
          label: "图片支持放大？",
        },
        {
          value: 4,
          label: "对话（@机器人）?",
        },
        {
          value: 5,
          label: "进群欢迎语?",
        },
        {
          value: 6,
          label: "定时推送消息?",
        },
        {
          value: 7,
          label: "答复推送?",
        },
        {
          value: 8,
          label: "PV、UV?",
        },
      ];
      this.greetingsArr = util.getRandomElement(resData, 3);
      // });
    },
    // goDetail() {
    //   this.$router.push({ path: "/pages/Detail/123" });
    // },
  },
  updated() {},
};
</script>
<style lang="scss">
a:visited {
  color: #03a8fe !important;
} /* 已访问的链接 */
</style>
<style scoped  lang="scss">
.body-layout {
  .body-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    font-size: 17px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    opacity: 1;
  }
  .body-content {
    width: 100%;
    padding: 59px 17.5px;
    background: #f1f2f5;
    min-height: 100vh;
    box-sizing: border-box;
    .greetings {
      background: #fff;
      padding-top: 15px;
      padding-left: 15px;
      padding-right: 15px;
      box-shadow: 0px 0px 30px rgba(110, 142, 196, 0.16);
      opacity: 1;
      border-radius: 0px 10px 10px 10px;
      .greetings-title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #444444;
        opacity: 1;
      }
      .guess {
        font-size: 12px;
        color: #999999;
        margin-top: 15px;
      }
      .greetings-content {
        margin-top: 15px;
        .greetings-item {
          border-bottom: 1px solid #e4e4e4;
          font-size: 14px;
          line-height: 40px;
          color: #03a8fe;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          img {
            width: 5px;
            height: 9px;
          }
        }
      }
      .toChange {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
        line-height: 42px;
        color: #259ff8;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .question-wrap {
      display: flex;
      justify-content: flex-end;
      .question {
        margin-top: 15px;
        max-width: 275px;
        background: #03a8fe;
        opacity: 1;
        border-radius: 10px 0px 10px 10px;
        color: #fff;
        font-size: 16px;
        padding: 9px 12.5px;
      }
    }
    .answer-wrap {
      display: flex;
      .answer {
        margin-top: 15px;
        max-width: 275px;
        // background: #ffffff;
        box-shadow: 0px 0px 30px rgba(110, 142, 196, 0.1);
        opacity: 1;
        border-radius: 0px 10px 10px 10px;
        padding: 9px 12.5px;
        font-size: 16px;
        color: #444444;

        img {
          width: 150px;
          height: 150px;
          background: rgba(0, 0, 0, 0);
          opacity: 1;
          border-radius: 0px 10px 10px 10px;
        }
      }
    }
  }
  .body-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    font-size: 17px;
    padding: 10px 17.5px;
    background: #f1f2f5;
    // border-top: 1px solid #666;
    .input-wrap {
      height: 41px;
      background: #ffffff;
      opacity: 1;
      border-radius: 20.5px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-right: 82px;
      position: relative;

      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
        width: 25px;
        height: 25px;
        opacity: 1;
        filter: alpha(opacity=100);
      }

      img.img-disabled {
        opacity: 0.3;
        filter: alpha(opacity=30);
      }

      .questionTxt {
        width: 100%;
        border: none;
      }
    }
  }
}
</style>
