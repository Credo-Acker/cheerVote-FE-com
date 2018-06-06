<template>
    <div class="answerQue" v-if="title != ''">
        <div class="top">
            <router-link to="/answer">
                <img src="../assets/return_answer.png" class="return">
            </router-link>
        </div>
        <div class="main">
            <div class="progress_bar">

            </div>
            <div class="answer">
                <div class="answer_num">
                    <p>
                        {{todayNum}}/50
                    </p>
                </div>
                <div class="answer_title">
                    <p>
                    {{todayNum}}.{{title}}
                    </p>
                </div>
                <div class="answer_answer">
                    <div class="answerA" @click="chooseit('A')">
                        <span class="xuanxiang">A</span>
                        <span class="answer_content">{{answerA}}</span>
                        <span class="nikeA"></span>
                    </div>
                    <div class="answerB" @click="chooseit('B')">
                        <span class="xuanxiang">B</span>
                        <span class="answer_content">{{answerB}}</span>
                        <span class="nikeB"></span>
                    </div>
                    <div class="answerC" @click="chooseit('C')">
                        <span class="xuanxiang">C</span>
                        <span class="answer_content">{{answerC}}</span>
                        <span class="nikeC"></span>
                    </div>
                    <div class="answerD" @click="chooseit('D')">
                        <span class="xuanxiang">D</span>
                        <span class="answer_content">{{answerD}}</span>
                        <span class="nikeD"></span>
                    </div>
                </div>
                <button class="submit" @click="submit">

                </button>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
export default {
    name: 'AnswerQue',
    data() {
        return {
            todayNum: "",
            title: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            questionId: "",
            choose: "",
            timer: null,
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        this.$http.get(this.api+'/vote/user/question')
            .then((response) => {
                if (response.data.nowNum >= 50) {
                    this.$router.push('/answer');
                }
                this.todayNum = response.data.todayNum;
                this.title = response.data.title;
                this.answerA = response.data.A;
                this.answerB = response.data.B;
                this.answerC = response.data.C;
                this.answerD = response.data.D;
                this.questionId = response.data.questionId;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    mounted() {
        this.timer = setTimeout(() => {
            this.submit();
        }, 10000);
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        submit: function () {
            let data = JSON.stringify({
                questionId: this.questionId,
                userAnswer: this.choose
            });
            let string = this.$base64.encode(data);
            let timestamp = Math.round(new Date().getTime() / 1000).toString();
            // let nonce = parseInt(100 * Math.random());
            let nonce = "a".toUpperCase();
            let signature = this.$sha1(this.$md5(string + timestamp + nonce) + "cheer_vote").toUpperCase();
            let params = {
                "string": string,
                "timestamp": timestamp,
                "nonce": nonce,
                "signature": signature
            };
            //获取答案
            this.$http.post(this.api+'/vote/user/answer', params)
                .then((response) => {
                    let right = response.data.rightAnswer;
                    if (right) {
                        this.$router.push({
                            name: 'AnswerCheck',
                            params: {
                                todayNum: this.todayNum,
                                title: this.title,
                                answerA: this.answerA,
                                answerB: this.answerB,
                                answerC: this.answerC,
                                answerD: this.answerD,
                                questionId: this.questionId,
                                choose: this.choose,
                                right: right
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        chooseit: function (answer) {
            this.choose = answer;
            let nikeA = document.querySelector('.nikeA');
            let nikeB = document.querySelector('.nikeB');
            let nikeC = document.querySelector('.nikeC');
            let nikeD = document.querySelector('.nikeD');
            let answerA = document.querySelector('.answerA');
            let answerB = document.querySelector('.answerB');
            let answerC = document.querySelector('.answerC');
            let answerD = document.querySelector('.answerD');
            switch (this.choose) {
                case "A":
                    nikeA.className = "nikeA xianshi";
                    answerA.className = "answerA answer_cover";
                    nikeB.className = "nikeB";
                    answerB.className = "answerB";
                    nikeC.className = "nikeC";
                    answerC.className = "answerC";
                    nikeD.className = "nikeD";
                    answerD.className = "answerD";
                    break;
                case "B":
                    nikeA.className = "nikeA";
                    answerA.className = "answerA";
                    nikeB.className = "nikeB xianshi";
                    answerB.className = "answerB answer_cover";
                    nikeC.className = "nikeC";
                    answerC.className = "answerC";
                    nikeD.className = "nikeD";
                    answerD.className = "answerD";
                    break;
                case "C":
                    nikeA.className = "nikeA";
                    answerA.className = "answerA";
                    nikeB.className = "nikeB";
                    answerB.className = "answerB";
                    nikeC.className = "nikeC xianshi";
                    answerC.className = "answerC answer_cover";
                    nikeD.className = "nikeD";
                    answerD.className = "answerD";
                    break;
                case "D":
                    nikeA.className = "nikeA";
                    answerA.className = "answerA";
                    nikeB.className = "nikeB";
                    answerB.className = "answerB";
                    nikeC.className = "nikeC";
                    answerC.className = "answerC";
                    nikeD.className = "nikeD xianshi";
                    answerD.className = "answerD answer_cover";
                    break;
            }
        }
    }
}
</script>

<style scoped>
/* @font-face {
    font-family:"Myfont2";
    src: url('../assets/font.ttf');
} */

.answerQue {
    width: 10rem;
    height: 100%;
    position: relative;
    top: 0;
    background: url(../assets/bg_answer.png);
    background-size: 100% 100%;
}

/*顶部*/
.top {
    position: relative;
    width: 10rem;
    top: 0;
    height: 1rem;
}

.top a {
    position: relative;
    left: 0.42rem;
    top: 0.293rem;
    width: 0.48rem;
    height: 0.43rem;
}

.return {
    position: relative;
    width: 0.48rem;
    height: 0.426rem;
}

.main {
    position: relative;
    margin-top: 0.1rem;
}

/* 倒计时bar */
.progress_bar {
    position: relative;
    width: 8.466rem;
    height: 0.6rem;
    margin: 0 auto;
    background: url(../assets/bar.png);
    background-size: 100% 100%;

    animation: progress 10s;
    animation-fill-mode: forwards;
}

@keyframes progress {
    0% {
        background: url(../assets/bar.png);
        background-size: 100% 100%;
    }
    10% {
        background: url(../assets/bar1.png);
        background-size: 100% 100%;
    }
    20% {
        background: url(../assets/bar2.png);
        background-size: 100% 100%;
    }
    30% {
        background: url(../assets/bar3.png);
        background-size: 100% 100%;
    }
    40% {
        background: url(../assets/bar4.png);
        background-size: 100% 100%;
    }
    50% {
        background: url(../assets/bar5.png);
        background-size: 100% 100%;
    }
    60% {
        background: url(../assets/bar6.png);
        background-size: 100% 100%;
    }
    70% {
        background: url(../assets/bar7.png);
        background-size: 100% 100%;
    }
    80% {
        background: url(../assets/bar8.png);
        background-size: 100% 100%;
    }
    90% {
        background: url(../assets/bar9.png);
        background-size: 100% 100%;
    }
    100% {
        background: url(../assets/bar10.png);
        background-size: 100% 100%;
    }
}

.answer {
    margin-top: 0.2rem;
    width: 9.28rem;
    height: 12.853rem;
    left: 0.706rem;
    position: relative;
    background: url(../assets/baseboard.png);
    background-size: 100% 100%;
}

.answer_num {
    position: relative;
    left: 0.666rem;
    top: 1.4rem;
}

.answer_num p {
    font-size: 0.373rem;
    font-family: "Myfont2";
    font-weight: 600;
    display: inline-block;
    color: #ff9f9f;
}

.answer_title {
    position: relative;
    line-height: 0.666rem;
    left: 0.666rem;
    top: 1.65rem;
}

.answer_title p {
    display: inline-block;
    line-height: 0.666rem;
    font-size: 0.373rem;
    color: #4b575c;
    width: 6.93rem;
}

.answer_answer {
    position: relative;
    top: 1.65rem;
    margin-top: 0.373rem;
}

.answerA,.answerB,.answerC,.answerD {
    position: relative;
    left: 0.666rem;
    width: 7.133rem;
    height: 1.013rem;
    background: #f5f5f5;
    border-radius: 0.233rem;
    margin-bottom: 0.32rem;
}

.answer_cover {
    background: #68d4f0;
}

.xuanxiang {
    display: inline-block;
    margin-top: 0.3rem;
    color: #ea7590;
    width: 1.133rem;
    text-align: center;
    font-size: 0.373rem;
    float: left;
}

.answer_content {
    font-size: 0.373rem;
    position: relative;
    width: 6rem;
    line-height: 1.013rem;
    text-align: center;
    margin: 0 auto;
    color: #6e6e6e;
    display: block;
}

.nikeA,.nikeB,.nikeC,.nikeD {
    display: none;
    position: absolute;
    right: 0.5rem;
    top: 0.35rem;
    width: 0.453rem;
    height: 0.333rem;
    background: url(../assets/nike.png);
    background-size: 100% 100%;
}

.xianshi {
    display: inline-block;
}

.submit {
    z-index: 100;
    position: relative;
    display: block;
    border: none;
    width: 7.121rem;
    height: 1.213rem;
    top: 2.4rem;
    left: 0.6rem;
    background: url(../assets/queding.png);
    background-size: 100% 100%;
}

.footer {
    position: fixed;
    bottom: 0;
    background: url(../assets/tree.png);
    background-size: 100% 100%;
    width: 10rem;
    height: 4.826rem;
}
</style>
