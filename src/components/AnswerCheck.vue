<template>
    <div class="answerCheck">
        <!-- {{this.$route.params.todayNum}} -->
        <div class="top">
            <router-link to="/answer">
                <img src="../assets/return_answer.png" class="return">
            </router-link>
        </div>
        <div class="main">
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
                    <div class="answerA" :class="{answer_cover : isA, answer_false: Afalse}">
                        <span class="xuanxiang">A</span>
                        <span class="answer_content">{{answerA}}</span>
                        <span class="nikeA" :class="{xianshi : isAg}"></span>
                    </div>
                    <div class="answerB" :class="{answer_cover : isB, answer_false: Bfalse}">
                        <span class="xuanxiang">B</span>
                        <span class="answer_content">{{answerB}}</span>
                        <span class="nikeB" :class="{xianshi : isBg}"></span>
                    </div>
                    <div class="answerC" :class="{answer_cover : isC, answer_false: Cfalse}">
                        <span class="xuanxiang">C</span>
                        <span class="answer_content">{{answerC}}</span>
                        <span class="nikeC" :class="{xianshi : isCg}"></span>
                    </div>
                    <div class="answerD" :class="{answer_cover : isD, answer_false: Dfalse}">
                        <span class="xuanxiang">D</span>
                        <span class="answer_content">{{answerD}}</span>
                        <span class="nikeD" :class="{answer_cover : isDg}"></span>
                    </div>
                </div>
                <div class="tips">
                    <template v-if="tip">
                        <span>回答正确，获得1票</span>
                    </template>
                    <template v-else>
                        <span>回答错误，请继续加油</span>
                    </template>
                </div>
                <router-link to="/cheer">
                    <div class="cheer">

                    </div>
                </router-link>
                <router-link to="/answerQue">
                    <div class="continue">

                    </div>
                </router-link>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
export default {
    name: 'AnswerCheck',
    data() {
        return {
            todayNum: 0,
            title: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            questionId: "",
            choose: "",
            tip: false,
            right: "",
            isA: false,
            isB: false,
            isC: false,
            isD: false,
            isAg: false,
            isBg: false,
            isCg: false,
            isDg: false,
            Afalse: false,
            Bfalse: false,
            Cfalse: false,
            Dfalse: false
        };
    },
    created() {
        this.todayNum = this.$route.params.todayNum;
        this.title = this.$route.params.title;
        this.answerA = this.$route.params.answerA;
        this.answerB = this.$route.params.answerB;
        this.answerC = this.$route.params.answerC;
        this.answerD = this.$route.params.answerD;
        this.choose = this.$route.params.choose;
        this.right = this.$route.params.right;

        if (this.choose == this.right) {
            this.tip = true;
            switch (this.right) {
                case "A":
                    this.isA = true;
                    this.isAg = true;
                    break;
                case "B":
                    this.isB = true;
                    this.isBg = true;
                    break;
                case "C":
                    this.isC = true;
                    this.isCg = true;
                    break;
                case "D":
                    this.isD = true;
                    this.isDg = true;
                    break;
            }
        } else {
            switch (this.choose) {
                case "A":
                    this.Afalse = true;
                    break;
                case "B":
                    this.Bfalse = true;
                    break;
                case "C":
                    this.Cfalse = true;
                    break;
                case "D":
                    this.Dfalse = true;
                    break;
            }
            switch (this.right) {
                case "A":
                    this.isA = true;
                    this.isAg = true;
                    break;
                case "B":
                    this.isB = true;
                    this.isBg = true;
                    break;
                case "C":
                    this.isC = true;
                    this.isCg = true;
                    break;
                case "D":
                    this.isD = true;
                    this.isDg = true;
                    break;
            }
        }
    },
    methods: {

    }
}
</script>

<style scoped>
/* @font-face {
    font-family:"Myfont2";
    src: url('../assets/font.ttf');
} */

.answerCheck {
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
    margin-top: 0.65rem;
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

.answer_false {
    background: #ff7070;
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

.tips {
    position: relative;
    left: 0.8rem;
    top: 1.5rem;
}

.tips span {
    font-size: 0.32rem;
    color: #bebebe;
}

.cheer {
    z-index: 100;
    position: relative;
    display: inline-block;
    left: 0.7rem;
    top: 2rem;
    background: url(../assets/cheer.png);
    background-size: 100% 100%;
    width: 3.4rem;
    height: 1.186rem;
}

.continue {
    z-index: 100;
    position: relative;
    display: inline-block;
    top: 2rem;
    left: 1rem;
    background: url(../assets/continue.png);
    background-size: 100% 100%;
    width: 3.4rem;
    height: 1.186rem;
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
