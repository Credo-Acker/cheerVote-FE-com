<template>
    <div class="my">
        <div class="top_bg">

        </div>
        <div class="top">
            <router-link to="/answer">
                <img src="../assets/return_answer.png" class="return">
            </router-link>
        </div>
        <div class="main">
            <div class="head_bg">
                <span class="nickname">{{nickname}}</span>
                <span class="my_cheer_num">我的投票数：{{cheer_num}}</span>
            </div>
            <div class="headImg">
                <img :src="headImgUrl">
            </div>
            <div class="list">
                <span class="xueyuan">学院</span>
                <span class="wode">我的投票</span>
                <span class="suoshu">所属战队</span>
                <span class="dangqian">当前得票数</span>
                <ul class="ul_list" v-if="history">
                    <li v-for="(item, index) in history">
                        <span class="li_xueyuan" @click="cheerIt(item.classId, item.groupId)" :classId="item.classId" :groupId="item.groupId" :key="index">{{item.className}}</span>
                        <span class="li_wode">{{item.assistance}}</span>
                        <span class="li_suoshu">{{item.groupName}}</span>
                        <span class="li_dangqian">{{item.distance}}</span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="tip">
            点击学院可继续投票
        </div>
        <div class="shadow no">

        </div>
        <div class="cheerAlert no">
            <p>
                为拉拉队投票
            </p>
            <input type="text" class="cheer_to_num" placeholder="请输入投票数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
            <span>我的可用投票数：<i class="red">{{cheer_num}}</i></span>
            <div class="confirm" @click="send">

            </div>
        </div>
        <div class="cheerAlert2 no">
            <p>
                投票成功
            </p>
            <span>我的可用投票数：<i class="red">{{cheer_num}}</i></span>
            <div class="confirm2" @click="closeAlert">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'My',
    data() {
        return {
            nickname: "",
            headImgUrl: "",
            cheer_num: "",
            history: [],
            cheer_classId: 0,
            cheer_groupId: 0,
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
            //获取自己的信息
            this.$http.get(this.api+'/vote/user/info')
                .then((response) => {
                    if (response.data.nickName) {
                        this.nickname = response.data.nickName;
                        this.headImgUrl = response.data.headImgUrl;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            //获取助力数
            this.$http.get(this.api+'/vote/user/assistance')
                .then((response) => {
                    if (response.data.assistance != null) {
                        this.cheer_num = response.data.assistance;
                    } else {
                        this.cheer_num = 0;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            //获取自己的助力历史
            this.$http.get(this.api+'/vote/user/assistance/history')
                .then((response) => {
                    this.history = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
    },
    mounted() {

    },
    methods: {
        cheerIt: function (classId, groupId) {
            let cheerAlert = document.querySelector('.cheerAlert');
            let shadow = document.querySelector('.shadow');
            cheerAlert.className = "cheerAlert";
            shadow.className = "shadow";

            this.cheer_classId = classId;
            this.cheer_groupId = groupId;
        },
        send: function () {
            let cheerAlert = document.querySelector('.cheerAlert');
            let cheerToNum = document.querySelector('.cheer_to_num');
            let cheerAlert2 = document.querySelector('.cheerAlert2');
            let shadow = document.querySelector('.shadow');

            if (cheerToNum.value == "" || parseInt(cheerToNum.value) == 0) {
                alert("输入不合法");
                cheerToNum.value = "";
                cheerAlert.className = "cheerAlert no";
                shadow.className = "shadow no";
                return false;
            }
            if (cheerToNum.value > this.cheerNum) {
                alert("投票数超过您拥有的票数！");
                cheerToNum.value = "";
                cheerAlert.className = "cheerAlert no";
                shadow.className = "shadow no";
                return false;
            }

            let data = [];
            data.push({
                classId: this.cheer_classId,
                num: parseInt(cheerToNum.value),
                groupId: this.cheer_groupId
            });
            let string = this.$base64.encode(JSON.stringify(data));
            let timestamp = Math.round(new Date().getTime() / 1000).toString();
            let nonce = "a".toUpperCase();
            // let nonce = parseInt(100 * Math.random());
            let signature = this.$sha1(this.$md5(string + timestamp + nonce) + 'cheer_vote').toUpperCase();
            let params = {
                "string": string,
                "timestamp": timestamp,
                "nonce": nonce,
                "signature": signature
            };
            //发送助力数
            this.$http.post(this.api+'/vote/user/cheer/distance', params)
                .then((response) => {
                    this.$http.get(this.api+'/vote/user/assistance')
                        .then((response) => {
                            this.cheer_num = response.data.assistance;
                            cheerAlert.className = "cheerAlert no";
                            cheerAlert2.className = "cheerAlert2";
                            cheerToNum.value = "";
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        closeAlert: function () {
            let cheerAlert2 = document.querySelector('.cheerAlert2');
            let shadow = document.querySelector('.shadow');

            //获取助力数
            this.$http.get(this.api+'/vote/user/assistance')
                .then((response) => {
                    if (response.data.assistance != null) {
                        this.cheer_num = response.data.assistance;
                    } else {
                        this.cheer_num = 0;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            cheerAlert2.className = "cheerAlert2 no";
            shadow.className = "shadow no";
        }
    }
}
</script>

<style scoped>
.my {
    position: relative;
    width: 10rem;
    height: 100%;
    top: 0;
    background: #f5f5f5;
}

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

.top_bg {
    position: absolute;
    top: 0;
    width: 10rem;
    height: 3.813rem;
    background: url(../assets/bg_my.png);
    background-size: 100% 100%;
}

.head_bg {
    position: relative;
    background: #ffffff;
    top: 1.9rem;
    margin: 0 auto;
    height: 2.773rem;
    width: 9.146rem;
    border-radius: 0.15rem;
}

.headImg {
    width: 1.893rem;
    height: 1.893rem;
    border-radius: 0.946rem;
    background: url(../assets/bg_headImg.png);
    background-size: 100% 100%;
    position: relative;
    top: -1.6rem;
    margin: 0 auto;
}

.headImg img {
    position: relative;
    width: 1.7rem;
    height: 1.7rem;
    top: 50%;
    border-radius: 0.85rem;
    left: 50%;
    margin-left: -0.85rem;
    margin-top: -0.85rem;
}

.nickname {
    display: block;
    position: relative;
    font-size: 0.346rem;
    color: #636363;
    top: 1.266rem;
    text-align: center;
}

.my_cheer_num {
    display: block;
    position: relative;
    font-size: 0.32rem;
    color: #afafaf;
    top: 1.3rem;
    text-align: center;
}

.list {
    position: relative;
    background: #ffffff;
    top: 0.5rem;
    margin: 0 auto;
    max-height: 7.918rem;
    overflow: scroll;
    width: 9.146rem;
    padding: 0.466rem 0;
    border-radius: 0.15rem;
    font-size: 0.346rem;
}

.xueyuan {
    position: relative;
    display: inline-block;
    color: #50ceff;
    width: 1.8rem;
    margin-left: 0.4rem;
}

.wode {
    position: relative;
    display: inline-block;
    color: #50ceff;
    width: 1.53rem;
    text-align: center;
}

.suoshu {
    position: relative;
    display: inline-block;
    color: #50ceff;
    width: 2.866rem;
    text-align: center;
}

.dangqian {
    position: relative;
    display: inline-block;
    color: #50ceff;
    width: 1.8rem;
    text-align: center;
}

.ul_list {
    position: relative;
    margin: 0 auto;
    margin-top: 0.7rem;
    width: 8.4rem;
    color: #636363;
}

.ul_list li {
    margin-bottom: 0.35rem;
}

.li_xueyuan {
    position: relative;
    display: inline-block;
    width: 1.8rem;
    max-height: 1.386rem;
    vertical-align: middle;
}

.li_wode {
    position: relative;
    display: inline-block;
    width: 1.53rem;
    text-align: center;
    color: #acacac;
    max-height: 1.386rem;
    vertical-align: middle;
}

.li_suoshu {
    position: relative;
    display: inline-block;
    width: 2.866rem;
    text-align: center;
    color: #acacac;
    max-height: 1.386rem;
    vertical-align: middle;
}

.li_dangqian {
    position: relative;
    display: inline-block;
    width: 1.8rem;
    text-align: center;
    color: #acacac;
    max-height: 1.386rem;
    vertical-align: middle;
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

.red {
    color: #ff8080;
    font-style:normal;
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
    left: 2.73rem;
    top: 4.2rem;
    font-size: 0.453rem;
    color: #5b5b5b;
}

.cheerAlert2 span {
    position: relative;
    display: block;
    color: #9e9e9e;
    text-align: center;
    font-size: 0.32rem;
    top: 4.7rem;
}

.cheerAlert2 .confirm2 {
    position: relative;
    left: 0.733rem;
    top: 5.7rem;
    width: 5.946rem;
    height: 0.906rem;
    background: url(../assets/confirm.png);
    background-size: 100% 100%;
}

input:focus {
    outline: none;
}

.no {
    display: none;
}

.tip {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.56rem;
    background: #fbfbfb;
    line-height: 0.56rem;
    font-size: 0.293rem;
    color: #b8b8b8;
    text-align: center;
}

</style>
