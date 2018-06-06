<template>
    <div class="answer">
        <div>
            <div v-if="can">
                <div class="banner">

                </div>
                <div class="main_answer">
                    <div class="start_answer">
                        <router-link to="/answerQue">
                            <img src="../assets/start_answer.png">
                        </router-link>
                    </div>
                    <div class="tip">
                        <span>每日可答50题，每题10s回答时间。每回答正确一道题，获得1投票数。</span>
                    </div>
                    <div class="start_cheer">
                        <router-link to="/cheer">
                            <img src="../assets/start_cheer.png">
                        </router-link>
                    </div>
                    <div class="my_cheer" v-if="my_cheer_num >= 0">
                        我的投票数：{{my_cheer_num}}
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="banner3">

                </div>
                <div class="main_banner3">
                    <div class="tip3">

                    </div>
                    <div class="start_cheer">
                        <router-link to="/cheer">
                            <img src="../assets/start_cheer.png">
                        </router-link>
                    </div>
                    <router-link to="/my">
                        <div class="my_cheer" v-if="my_cheer_num >= 0">
                            我的投票数：{{my_cheer_num}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- <div v-else>
            <div class="banner2">

            </div>
            <div class="tip2">
                <h3>答题通道暂时关闭</h3>
                <span>
                    每日答题时间为08:00-19:50
                </span>
            </div>
        </div> -->
        <div class="footer_answer">
            <router-link to="/index">
                <div class="shouye">
                    <img src="../assets/shouye.png">
                </div>
            </router-link>
            <router-link to="/answer">
                <div class="dati">
                    <img src="../assets/hdati.png">
                </div>
            </router-link>
            <router-link to="/info">
                <div class="xiaoxi">
                    <img src="../assets/xiaoxi.png">
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Answer',
    data() {
        return {
            my_cheer_num: "",
            // hour1: 24,
            // hour2: 8,
            can: true,
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        //获取助力数
        this.$http.get(this.api+'/vote/user/assistance')
            .then((response) => {
                if (response.data.assistance != null) {
                    this.my_cheer_num = response.data.assistance;
                } else {
                    this.my_cheer_num = 0;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        //获取今日答题数
        this.$http.get(this.api+'/vote/user/todayNum')
            .then((response) => {
                let todayNum = response.data.todayNum;
                if (todayNum >= 50) {
                    this.can = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    mounted() {

    },
    methods: {
        // now: function () {
        //     let hours = new Date().getHours();
        //     let minutes = new Date().getMinutes();
        //     if (hours > this.hour1 || hours < this.hour2) {
        //         return false;
        //     } else if (hours == this.hour1 && minutes >= 50) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        //     return true;
        // }
    }
}
</script>

<style scoped>
.answer {
    position: relative;
    width: 10rem;
}

/* banner */
.banner {
    height: 5.386rem;
    background: url(../assets/dati_banner1.png);
    background-size: 100% 100%;
}

.banner3 {
    height: 6.906rem;
    background: url(../assets/pao.png);
    background-size: 100% 100%;
}

/* 主体 */
.main_answer {
    position: relative;
    width: 10rem;
    height: 9.373rem;
}

.start_answer {
    top: 2.173rem;
    margin: 0 auto;
}

.start_cheer {
    top: 2.973rem;
    margin: 0 auto;
}

.start_answer,.start_cheer {
    position: relative;
    width: 7.08rem;
    height: 1.12rem;
}

.start_answer img,.start_cheer img {
    width: 7.08rem;
    height: 1.12rem;
}

.tip {
    position: relative;
    width: 7.2rem;
    margin: 0 auto;
    top: 2.303rem;
    font-size: 0.346rem;
    line-height: 0.6rem;
    color: #939393;
}

.tip3 {
    position: relative;
    top: 1.2rem;
    margin: 0 auto;
    margin-bottom: -0.4rem;
    width: 7.106rem;
    height: 1.146rem;
    background: url(../assets/xueba.png);
    background-size: 100% 100%;
}

.my_cheer {
    position: relative;
    width: 7.08rem;
    margin: 0 auto;
    top: 3.16rem;
    font-size: 0.346rem;
    line-height: 0.6rem;
    color: #939393;
}

/* banner2 */
/* .banner2 {
    position: relative;
    margin: 0 auto;
    top: 3.733rem;
    width: 3.733rem;
    height: 4.066rem;
    background: url(../assets/book.png);
    background-size: 100% 100%;
}

.tip2 h3 {
    color: #545454;
    display: block;
    font-size: 0.4rem;
    font-weight: 500;
    position: relative;
    top: 3.733rem;
    margin-top: 0.5rem;
    text-align: center;
}

.tip2 span {
    position: relative;
    display: block;
    margin-top: 0.266rem;
    text-align: center;
    top: 3.733rem;
    color: #939393;
    font-size: 0.32rem;
} */

/* 底部导航 */
.footer_answer {
    position: fixed;
    bottom: 0;
    width: 10rem;
    height: 1.33rem;
    font-size: 20px;
    border-top: 1px solid #dedede;
    background-color: #ffffff;
}

.shouye,.dati,.xiaoxi {
    cursor: pointer;
    width: 3.3rem;
    height: 1.33rem;
    float: left;
}

.shouye img,.dati img,.xiaoxi img {
    width: 0.586rem;
    height: 0.933rem;
    top: 0.213rem;
}

.shouye img {
    position: absolute;
    left: 0.96rem;
}

.dati img {
    position: relative;
    display: block;
    margin: 0 auto;
}

.xiaoxi img {
    position: absolute;
    right: 0.96rem;
}
</style>
