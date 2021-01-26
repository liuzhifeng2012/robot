<template>
  <div class="body-layout">
    <div class="body-header">机器人</div>
    <div class="body-content" ref="bodyContent">
      <div v-for="(msgItem, msgIndex) in msgArr" :key="msgIndex">
        <!--答案列表(开场的答案) -->
        <template v-if="msgIndex == 0">
          <div
            v-for="(answerItem, answerIndex) in msgItem.answerList"
            :key="answerIndex"
          >
            <!-- //text：文本， img：图片地址 ，video：视频地址 ，filepath：文件地址， imgAndText：卡片集合对象，excel:表格，object:自定义对象 （现阶段只考虑text img）-->
            <div
              class="answer-wrap"
              v-if="answerItem.answerType == 'text' && answerItem.text"
            >
              <div
                class="answer"
                style="background: #fff; margin-top: 0; margin-bottom: 15px"
                v-html="answerItem.text"
              ></div>
            </div>
            <div
              class="answer-wrap"
              v-if="answerItem.answerType == 'img' && answerItem.text"
            >
              <div class="answer">
                <img
                  :src="answerItem.text"
                  alt=""
                  :preview="answerItem.timestamp"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- 中部推荐 -->
        <div
          class="greetings"
          v-if="msgItem.centerQuestionList && msgItem.centerQuestionList.length"
        >
          <!-- <div class="greetings-title">
          已为您分配新冠肺炎相关专业医生，请咨询“新冠肺炎”健康问题吧
        </div> -->
          <div class="guess">猜你要问</div>
          <div class="greetings-content">
            <div
              class="greetings-item"
              v-for="(item, index) in msgItem.centerQuestionList"
              :key="index"
              @click.prevent="askQuestion(item)"
            >
              <div class="greentings-label">{{ item }}</div>
              <img src="../assets/images/arrow-icon.png" alt="" />
            </div>
          </div>
          <div class="toChange">
            <img src="../assets/images/route-icon.png" alt="" />
            <span @click.prevent="getGreetings(msgItem)">换一换</span>
          </div>
        </div>

        <!-- 问题 -->
        <div class="question-wrap" v-if="msgItem.question != '开场'">
          <div class="question">{{ msgItem.question }}</div>
        </div>

        <!--答案列表(提问的问题) -->
        <template v-if="msgIndex != 0">
          <div
            v-for="(answerItem, answerIndex) in msgItem.answerList"
            :key="answerIndex"
          >
            <!-- //text：文本， img：图片地址 ，video：视频地址 ，filepath：文件地址， imgAndText：卡片集合对象，excel:表格，object:自定义对象 （现阶段只考虑text img）-->
            <div
              class="answer-wrap"
              v-if="answerItem.answerType == 'text' && answerItem.text"
            >
              <div
                class="answer"
                style="background: #fff"
                v-html="answerItem.text"
              ></div>
            </div>
            <div
              class="answer-wrap"
              v-if="answerItem.answerType == 'img' && answerItem.text"
            >
              <div class="answer">
                <img
                  :src="answerItem.text"
                  alt=""
                  :preview="answerItem.timestamp"
                />
              </div>
            </div>
          </div>
        </template>
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
import { sendMsg, searchRecommend } from "@/api/robot";
import { Toast } from "vant";

export default {
  name: "Index",
  components: {},
  data() {
    return {
      questionTxt: "", //问题内容
      eqId: "", //用户id
      robotId: "166459906fd9abcccacbabcabgbfccbi903529ET", //机器人id
      source: "wechatPub", //来源
      businessType: "", //业务类型 open-开场 asr-提问
      msgArr: [], //机器人消息数组
    };
  },
  created() {
    this.eqId = util.GetParameterUrl("eqId");
    //如果没有eqId,先赋一下默认值
    if(!this.eqId){
      this.eqId='87zefk82pfk'
    }
    // console.log(this.eqId);

    //获取开场推荐列表
    this.businessType = "open"; //业务类型 open-开场 asr-提问
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
        this.businessType = "asr"; //业务类型 open-开场 asr-提问

        var params = {
          eqId: this.eqId,
          robotId: this.robotId,
          processId: "",
          question: questionTxt,
          lat: "",
          lng: "",
          source: this.source,
          businessType: this.businessType,
          robotName: "",
        };
        sendMsg(params).then((res) => {
          let resData = JSON.parse(res);
          if (resData.code == 2000) {
            if (resData.data && resData.data.length) {
              resData.data.forEach((item) => {
                item.answerList &&
                  item.answerList.forEach((jtem) => {
                    jtem.timestamp = new Date().getTime();
                  });
              });
            }
            console.log("asr", resData);
            this.msgArr.push(resData.data[0]);

            //页面元素滚动到聊天室底部
            this.$nextTick(() => {
              let bodyContent = this.$refs.bodyContent; // 获取对象

              // //获取最后答案中的超链接，改变属性 href="javascript:void(0)";同时增加click事件，百度统计埋点
              // let allLink = document.links;
              // for (let i = 0; i < allLink.length; i++) {
              //   allLink[i].addEventListener(
              //     "click",
              //     function () {
              //       if (_hmt) {
              //         _hmt.push([
              //           "_trackEvent",
              //           "引导的超链接",
              //           "click",
              //           this.innerHTML,
              //         ]);
              //       }
              //     },
              //     false
              //   );
              // }

              document.documentElement.scrollTop = bodyContent.scrollHeight; // 滚动高度
              document.body.scrollTop = bodyContent.scrollHeight;

              //清空问题输入框
              this.questionTxt = "";

              //对图片预览插件初始化
              this.$previewRefresh();
            });
          } else {
            Toast(resData.msg);
            return;
          }
        });
      }
    },
    //获取开场数组
    getGreetings(msgItem) {
      //换一换
      if (msgItem) {
        var params = {
          userId: this.eqId,
          isStart: "",
          size: 3,
        };
        searchRecommend(params).then((res) => {
          if (res.processCode == 200) {
            console.log(
              "open 换一换",
              Object.values(res.recommendedInfo.recommendedValueList[0])
            );
            msgItem.centerQuestionList = Object.values(
              res.recommendedInfo.recommendedValueList[0]
            );
          } else {
            // Toast(resData.msg);
            return;
          }
        });
      }
      //开场
      else {
        this.businessType = "open"; //业务类型 open-开场 asr-提问
        var params = {
          eqId: this.eqId,
          robotId: this.robotId,
          processId: "",
          question: "开场",
          lat: "",
          lng: "",
          source: this.source,
          businessType: this.businessType,
          robotName: "",
        };
        sendMsg(params).then((res) => {
          let resData = JSON.parse(res);
          if (resData.code == 2000) {
            if (resData.data && resData.data.length) {
              resData.data.forEach((item) => {
                item.answerList &&
                  item.answerList.forEach((jtem) => {
                    jtem.timestamp = new Date().getTime();
                  });
              });
            }
            console.log("open", resData);
            this.msgArr.push(resData.data[0]);
          } else {
            Toast(resData.msg);
            return;
          }
        });
      }
    },
    // goDetail() {
    //   this.$router.push({ path: "/pages/Detail/123" });
    // },
  },
  updated() {},
};
</script>
<style lang="scss">
a:link {
  color: #03a8fe;
}
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
    padding: 69px 17.5px;
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
        font-size: 15px;
        color: #999999;
        // margin-top: 15px;
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
          .greentings-label {
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
          }
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
        font-size: 14px;
        padding: 9px 12.5px;
      }
    }
    .answer-wrap {
      display: flex;
      .answer {
        margin-top: 15px;
        max-width: 275px;
        box-shadow: 0px 0px 30px rgba(110, 142, 196, 0.1);
        opacity: 1;
        border-radius: 0px 10px 10px 10px;
        padding: 9px 12.5px;
        font-size: 14px;
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
    // height: 44px;
    font-size: 17px;
    padding: 14px 17.5px;
    background: #f1f2f5;
    max-width: 12.4rem;
    margin: 0 auto;
    box-sizing: border-box;
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
      box-sizing: border-box;

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
