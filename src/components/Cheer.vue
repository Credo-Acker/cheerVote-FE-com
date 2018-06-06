<template>
    <div class="cheer">
        <div class="top">
            <router-link to="/answer">
                <img src="../assets/return_answer.png" class="return">
            </router-link>
        </div>
        <div class="main">
            <ul class="xueyuan">
                <li class="li_xueyuan" index="2">
                    <span class="span_xueyuan" :class="{blue: isB(cheer1)}" @click="cheervote(1)">通信与信息工程学院</span>
                    <div class="cheerInput cheerInput1" :class="{visibility: isV(cheer1)}">
                        {{cheer1}}
                    </div>
                </li>
                <li class="li_xueyuan" index="4">
                    <span class="span_xueyuan" :class="{blue: isB(cheer2)}" @click="cheervote(2)">计算机科学与技术学院</span>
                    <div class="cheerInput cheerInput2" :class="{visibility: isV(cheer2)}">
                        {{cheer2}}
                    </div>
                </li>
                <li class="li_xueyuan" index="4">
                    <span class="span_xueyuan" :class="{blue: isB(cheer3)}" @click="cheervote(3)">自动化学院</span>
                    <div class="cheerInput cheerInput3" :class="{visibility: isV(cheer3)}">
                        {{cheer3}}
                    </div>
                </li>
                <li class="li_xueyuan" index="2">
                    <span class="span_xueyuan" :class="{blue: isB(cheer4)}" @click="cheervote(4)">先进工程制造学院</span>
                    <div class="cheerInput cheerInput4" :class="{visibility: isV(cheer4)}">
                        {{cheer4}}
                    </div>
                </li>
                <li class="li_xueyuan" index="1">
                    <span class="span_xueyuan" :class="{blue: isB(cheer5)}" @click="cheervote(5)">光电工程学院/重庆国际半导体学院</span>
                    <div class="cheerInput cheerInput5" :class="{visibility: isV(cheer5)}">
                        {{cheer5}}
                    </div>
                </li>
                <li class="li_xueyuan" index="3">
                    <span class="span_xueyuan" :class="{blue: isB(cheer6)}" @click="cheervote(6)">软件工程学院</span>
                    <div class="cheerInput cheerInput6" :class="{visibility: isV(cheer6)}">
                        {{cheer6}}
                    </div>
                </li>
                <li class="li_xueyuan" index="2">
                    <span class="span_xueyuan" :class="{blue: isB(cheer7)}" @click="cheervote(7)">生物信息学院</span>
                    <div class="cheerInput cheerInput7" :class="{visibility: isV(cheer7)}">
                        {{cheer7}}
                    </div>
                </li>
                <li class="li_xueyuan" index="2">
                    <span class="span_xueyuan" :class="{blue: isB(cheer8)}" @click="cheervote(8)">理学院</span>
                    <div class="cheerInput cheerInput8" :class="{visibility: isV(cheer8)}">
                        {{cheer8}}
                    </div>
                </li>
                <li class="li_xueyuan" index="3">
                    <span class="span_xueyuan" :class="{blue: isB(cheer9)}" @click="cheervote(9)">经济管理学院/现代邮政学院</span>
                    <div class="cheerInput cheerInput9" :class="{visibility: isV(cheer9)}">
                        {{cheer9}}
                    </div>
                </li>
                <li class="li_xueyuan" index="1">
                    <span class="span_xueyuan" :class="{blue: isB(cheer10)}" @click="cheervote(10)">传媒艺术学院</span>
                    <div class="cheerInput cheerInput10" :class="{visibility: isV(cheer10)}">
                        {{cheer10}}
                    </div>
                </li>
                <li class="li_xueyuan" index="4">
                    <span class="span_xueyuan" :class="{blue: isB(cheer11)}" @click="cheervote(11)">外国语学院</span>
                    <div class="cheerInput cheerInput11" :class="{visibility: isV(cheer11)}">
                        {{cheer11}}
                    </div>
                </li>
                <li class="li_xueyuan" index="3">
                    <span class="span_xueyuan" :class="{blue: isB(cheer12)}" @click="cheervote(12)">国际学院</span>
                    <div class="cheerInput cheerInput12" :class="{visibility: isV(cheer12)}">
                        {{cheer12}}
                    </div>
                </li>
                <li class="li_xueyuan" index="1">
                    <span class="span_xueyuan" :class="{blue: isB(cheer13)}" @click="cheervote(13)">网络空间安全与信息法学院</span>
                    <div class="cheerInput cheerInput13" :class="{visibility: isV(cheer13)}">
                        {{cheer13}}
                    </div>
                </li>
            </ul>
            <div class="totle">
                <span class="totle_cheerNum">总投票数：<i class="red">{{totle_num}}</i></span>
                <span class="free_cheerNum">我的剩余投票数：<i class="red">{{free_num}}</i></span>
            </div>
            <div class="comfirm" @click="cheer">

            </div>
        </div>
        <div class="shadow no">
        </div>
        <div class="cheerAlert no">
            <p>
                为{{choose_xueyuan}}投票
            </p>
            <input type="text" class="cheer_to_num" placeholder="请输入投票数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="cheer_to_num">
            <span>我的可用投票数：<i class="red">{{free_num}}</i></span>
            <div class="confirm" @click="comfirm(cheer_to_num, now)">

            </div>
        </div>
        <div class="cheerAlert2 no">
            <p>
                投票成功
            </p>
            <div class="div_teams">
                <ul class="teams">
                    <li v-for="(item,index) in final" :key="index">
                        {{item.groupName}}得票数：{{item.distance}}
                    </li>
                </ul>
            </div>
            <span>我的剩余投票数：<i class="red">{{free_num}}</i></span>
            <div class="confirm2" @click="closeAlert">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cheer',
    data() {
        return {
            cheerNum: null,
            cheer1: "",
            cheer2: "",
            cheer3: "",
            cheer4: "",
            cheer5: "",
            cheer6: "",
            cheer7: "",
            cheer8: "",
            cheer9: "",
            cheer10: "",
            cheer11: "",
            cheer12: "",
            cheer13: "",
            final: [],
            cheer_to_num: "",
            choose_xueyuan: "",
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    computed: {
        //选择的投票数
        totle_num: function () {
            for (let i = 1; i <= 13; i++) {
                if (this["cheer" + i] == '') {
                    this["cheer" + i] = 0;
                }
            }

            if (isNaN(this.cheer1) || isNaN(this.cheer2) || isNaN(this.cheer3) || isNaN(this.cheer4) || isNaN(this.cheer5) || isNaN(this.cheer6) || isNaN(this.cheer7) || isNaN(this.cheer8) || isNaN(this.cheer9) || isNaN(this.cheer10) || isNaN(this.cheer11) || isNaN(this.cheer12) || isNaN(this.cheer13) || this.cheer1 < 0 || this.cheer2 < 0 || this.cheer3 < 0 || this.cheer4 < 0 || this.cheer5 < 0 || this.cheer6 < 0 ||  this.cheer7 < 0 || this.cheer8 < 0 || this.cheer9 < 0 || this.cheer10 < 0 || this.cheer11 < 0 || this.cheer12 < 0 || this.cheer13 < 0) {
                alert("输入不合法，请重新输入！");
                this.cheer1 = "";
                this.cheer2 = "";
                this.cheer3 = "";
                this.cheer4 = "";
                this.cheer5 = "";
                this.cheer6 = "";
                this.cheer7 = "";
                this.cheer8 = "";
                this.cheer9 = "";
                this.cheer10 = "";
                this.cheer11 = "";
                this.cheer12 = "";
                this.cheer13 = "";
                return 0;
            } else {
                return (
                    parseInt(this.cheer1, 10) + parseInt(this.cheer2, 10) + parseInt(this.cheer3, 10) + parseInt(this.cheer4, 10) + parseInt(this.cheer5, 10) + parseInt(this.cheer6, 10) + parseInt(this.cheer7, 10) + parseInt(this.cheer8, 10) + parseInt(this.cheer9, 10) + parseInt(this.cheer10, 10) + parseInt(this.cheer11, 10) + parseInt(this.cheer12, 10) + parseInt(this.cheer13, 10)
                );
            }
        },
        //还剩多少投票数
        free_num: function () {
            if ((this.cheerNum - this.totle_num) < 0) {
                alert("剩余可投票数不够，请重新分配！");
                this.cheer1 = "";
                this.cheer2 = "";
                this.cheer3 = "";
                this.cheer4 = "";
                this.cheer5 = "";
                this.cheer6 = "";
                this.cheer7 = "";
                this.cheer8 = "";
                this.cheer9 = "";
                this.cheer10 = "";
                this.cheer11 = "";
                this.cheer12 = "";
                this.cheer13 = "";
                return 0;
            } else {
                return isNaN(this.cheerNum - this.totle_num) ? 0 : (this.cheerNum - this.totle_num);
            }
        }
    },
    created() {
        //获取数据：我的助力数
        this.$http.get(this.api+'/vote/user/assistance')
            .then((response) => {
                if (response.data.assistance) {
                    this.cheerNum = response.data.assistance;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    mounted() {

    },
    methods: {
        cheer: function () {
            let cheerAlert2 = document.querySelector('.cheerAlert2');
            let shadow = document.querySelector('.shadow');

            if (this.free_num < 0) {
                alert("剩余可投票数不够，请重新分配！");
                return false;
            }
            if (this.totle_num <= 0) {
                alert("请选择拉拉队投票");
                return false;
            }

            let data = [];
            let liXueyuan = document.querySelectorAll('.li_xueyuan');
            for (let i = 1; i <= 13; i++) {
                if (this["cheer" + i] != 0) {
                    let groupId = liXueyuan[i - 1].getAttribute('index');
                    data.push({
                        classId: i,
                        num: this["cheer" + i],
                        groupId: groupId
                    });
                }
            }
            let string = this.$base64.encode(JSON.stringify(data));
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
            //发送！助力数并更新！
            this.$http.post(this.api+'/vote/user/cheer/distance', params)
                .then((response) => {
                    this.final = response.data;
                    this.$http.get(this.api+'/vote/user/assistance')
                        .then((response) => {
                            for (let i = 1; i < 13; i++) {
                                this["cheer" + i] = 0;
                            }
                            this.cheerNum = response.data.assistance;
                            cheerAlert2.className = "cheerAlert2";
                            shadow.className = "shadow";
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        closeAlert: () => {
            let cheerAlert2 = document.querySelector('.cheerAlert2');
            let shadow = document.querySelector('.shadow');

            cheerAlert2.className = "cheerAlert2 no";
            shadow.className = "shadow no";
        },
        isV: function (num) {
            if (num == 0) {
                return true;
            } else {
                return false;
            }
        },
        isB: function (num) {
            if (num == 0) {
                return false;
            } else {
                return true;
            }
        },
        cheervote: function (which) {
            let span = document.querySelectorAll('.span_xueyuan');
            let cheerAlert = document.querySelector('.cheerAlert');
            let shadow = document.querySelector('.shadow');
            let cheerToNum = document.querySelector('.cheer_to_num');

            this.choose_xueyuan = span[which-1].innerHTML;
            this.now = which;
            cheerAlert.className = "cheerAlert";
            shadow.className = "shadow";
        },
        comfirm: function (num, index) {
            let cheerAlert = document.querySelector('.cheerAlert');
            let shadow = document.querySelector('.shadow');
            let cheerToNum = document.querySelector('.cheer_to_num');

            this["cheer" + index] = num;
            this.cheer_to_num = "";
            cheerAlert.className = "cheerAlert no";
            shadow.className = "shadow no";
        }
    }
}
</script>

<style scoped>
.cheer {
    position: relative;
    width: 10rem;
    height: 100%;
    top: 0;
    background: url(../assets/bg_cheer.png);
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

.main ul {
    position: relative;
    top: 1.2rem;
    left: 1.3rem;
    height: 9.5rem;
    width: 7.2rem;
    border-bottom: 0.013rem solid #f3f3f3;
}

.li_xueyuan {
    position: relative;
    margin-bottom: 0.12rem;
    height: 0.6rem;
    display: flex;
    left: 0.15rem;
    align-items:center;
}

.span_xueyuan {
    display: inline-block;
    font-size: 0.346rem;
    color: #6d6d6d;
}

.cheerInput {
    position: absolute;
    display: block;
    right: -0.55rem;
    width: 1.26rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border: none;
    border-radius: none;
    background: url(../assets/input_cheer.png);
    background-size: 100% 100%;
    color: #ffffff;
    text-align: center;
    vertical-align: middle;
}

.totle_cheerNum {
    position: relative;
    display: inline-block;
    top: 1.65rem;
    left: 1.5rem;
    font-size: 0.32rem;
    color: #9b9b9b;
}

.free_cheerNum {
    position: relative;
    display: inline-block;
    top: 1.65rem;
    left: 3.5rem;
    font-size: 0.32rem;
    color: #9b9b9b;
}

.comfirm {
    position: relative;
    margin: 0 auto;
    top: 2.7rem;
    width: 5.946rem;
    height: 0.906rem;
    background: url(../assets/confirm.png);
    background-size: 100% 100%;
}

.shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 10rem;
    height: 100%;
    z-index: 98;
    background: #000000;
    opacity: 0.8;
}

.cheerAlert {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 7.426rem;
    height: 8.4rem;
    margin-left: -3.713rem;
    margin-top: -4.2rem;
    opacity: 1;
    z-index: 99;
    background: url(../assets/bg_alert.png);
    background-size: 100% 100%;
}

.cheerAlert p {
    position: relative;
    left: 0.733rem;
    top: 4rem;
    font-size: 0.373rem;
    color: #5b5b5b;
}

.cheerAlert input {
    position: relative;
    top: 4.4rem;
    left: 0.733rem;
    line-height: 0.8rem;
    font-size: 0.293rem;
    width: 5.56rem;
    padding: 0 0.2rem;
    border: 0.013rem solid #c2c2c2;
    border-radius: 0.1rem;
    color: #b4b4b4;
    -webkit-appearance: none; /* 方法2 */
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c4c4c4;
    opacity:1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c4c4c4;
    opacity:1;
}

input:-ms-input-placeholder{
    color: #c4c4c4;
    opacity:1;
}

input::-webkit-input-placeholder{
    color: #c4c4c4;
    opacity:1;
}

.cheerAlert span {
    position: relative;
    display: inline-block;
    color: #9e9e9e;
    font-size: 0.32rem;
    top: 4.6rem;
    left: 0.733rem;
}

.cheerAlert .confirm {
    position: relative;
    left: 0.733rem;
    top: 5rem;
    width: 5.946rem;
    height: 0.906rem;
    background: url(../assets/confirm.png);
    background-size: 100% 100%;
}

.cheerAlert2 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 7.426rem;
    height: 8.4rem;
    margin-left: -3.713rem;
    margin-top: -4.2rem;
    opacity: 1;
    z-index: 99;
    background: url(../assets/bg_alert2.png);
    background-size: 100% 100%;
}

.cheerAlert2 p {
    position: relative;
    display: inline-block;
    left: 0.733rem;
    top: 3.43rem;
    font-size: 0.373rem;
    color: #464646;
}

.cheerAlert2 .div_teams {
    position: relative;
    left: 0.733rem;
    top: 3.55rem;
    width: 5.946rem;
    height: 2.32rem;
    display: flex;
    align-items:center;
}

.teams li {
    font-size: 0.346rem;
    color: #8b8b8b;
    margin-bottom: 0.02rem;
}

.cheerAlert2 span {
    position: relative;
    display: block;
    color: #9e9e9e;
    left: 0.733rem;
    font-size: 0.293rem;
    top: 3.75rem;
}

.cheerAlert2 .confirm2 {
    position: relative;
    left: 0.733rem;
    width: 5.946rem;
    height: 0.906rem;
    top: 3.95rem;
    background: url(../assets/confirm.png);
    background-size: 100% 100%;
}

.red {
    color: #ff8080;
    font-style:normal;
}

.blue {
    color: #50ceff;
}

.visibility {
    /* visibility: hidden; */
    opacity: 0;
}

.no {
    display: none;
}

</style>
