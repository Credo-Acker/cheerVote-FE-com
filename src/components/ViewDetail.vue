<template>
    <div class="viewDetail">
        <div class="top">
            <router-link to="/index">
                <img src="../assets/return.png" class="return">
            </router-link>
        </div>
        <div class="mainwrap" v-if="information">
            <div class="introduction">
                <wc-swiper :duration="1500" :interval="5000" v-if="slides.length">
                    <wc-slide v-for="(item,key) in slides" :key="key">
                        <img :src="item">
                    </wc-slide>
                </wc-swiper>
                <div class="className">
                    {{information.className}}
                </div>
                <div class="slogan">
                    {{information.slogan}}
                </div>
                <div class="intro">
                    <p class="p_intro_title">
                        拉拉队简介：
                    </p>
                    <p class="p_intro">
                        {{information.introduce}}
                    </p>
                </div>
            </div>
            <div class="division">

            </div>
            <div class="video">
                <div class="video_title">
                    <img src="../assets/log.png"><span>拉拉队宣传视频</span>
                </div>
                <div class="video_main" v-if="className">
                    <iframe v-if="android" :src="'//'+video" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="100%">  </iframe>
                    <!-- <video v-if="android" :src="video" controls preload width="100%" height="100%"></video> -->
                </div>
            </div>
            <div class="division">

            </div>
            <div class="picture">
                <div class="picture_title">
                    <img src="../assets/log.png"><span>拉拉队宣传图片</span>
                </div>
                <ul class="picture_main">
                    <li class="picture_item" v-for="(item, index) in duiyuan" @click="openImg(index)" :key="index">
                        <img :src="'http://www.newtol.cn/' + item.imgUrl">
                    </li>
                </ul>
            </div>
            <div class="message">
                <div class="message_title">
                    <img src="../assets/leave_msg.png" @click="leaveMsg">
                </div>
                <ul class="message_main">
                    <li class="message_item" v-for="(item, index) in messages" :key="index" :index="item.contentId">
                        <img :src="item.headImgUrl" class="message_item_icon">
                        <span class="message_item_name">{{item.nickName}}</span>
                        <span class="message_item_time">{{item.created_time}}</span>
                        <div class="message_item_content">
                            {{item.content}}
                        </div>
                        <!-- <div class="zan" :class="" @click="dianzan">
                        </div>
                        <span class="message_item_prasie">{{item.prasieNum}}</span> -->
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer_view">
            <div class="cheer" @click="cheer">
                <img src="../assets/weizhuli.png">
            </div>
            <router-link to="/answer">
                <div class="answer">
                    <img src="../assets/weidati.png">
                </div>
            </router-link>
        </div>
        <div class="shadow no">
        </div>
        <img src="../assets/success.png" class="shadowimg no">
        <div class="bigImg opnone" @click="close">
            <wc-swiper :duration="1500" :autoplay="false" :defaultSlide="0" :pagination="false" ref="swiper" v-if="duiyuan.length">
                <wc-slide v-for="(item, key) in duiyuan" :key="key">
                    <img :src="'http://www.newtol.cn/' + item.imgUrl">
                    <div class="description">
                        {{item.playerName}}：{{item.introduce}}
                        <span>{{key + 1}}/{{duiyuanLength}}</span>
                    </div>
                </wc-slide>
            </wc-swiper>
        </div>
        <div class="msgAlert no">
            <p>
                为拉拉队留言
            </p>
            <textarea type="text" class="msg_area" placeholder="请输入留言" v-model="msgContent" maxlength="50"></textarea>
            <div class="confirm" @click="sendMsg">

            </div>
        </div>
        <div class="cheerAlert no">
            <p>
                为拉拉队投票
            </p>
            <input type="text" class="cheer_to_num" placeholder="请输入投票数" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
            <span v-if="cheerNum >= 0">我的可用投票数：<i class="red">{{cheerNum}}</i></span>
            <div class="confirm" @click="send">

            </div>
        </div>
        <div class="cheerAlert2 no">
            <p>
                投票成功
            </p>
            <span v-if="cheerNum >= 0">我的可用投票数：<i class="red">{{cheerNum}}</i></span>
            <div class="confirm2" @click="closeAlert">

            </div>
        </div>
    </div>
</template>

<script>
import wcSwiper from '../assets/wc-swiper.js';
export default {
    name: 'ViewDetail',
    data() {
        return {
            classid: 0,
            information: {},
            // messages: [],
            messages: [],
            msgContent: "",
            slides: [],
            currentSlide: 1,
            cheerNum: "",
            duiyuan: [],
            duiyuanLength: 0,
            video_List: {
                "通信与信息工程学院": "//player.bilibili.com/player.html?aid=22267274&cid=36858442&page=1",
                "计算机科学与技术学院": "//player.bilibili.com/player.html?aid=22267086&cid=36858104&page=1",
                "自动化学院": "//player.bilibili.com/player.html?aid=22267369&cid=36858571&page=1",
                "先进制造工程学院": "//player.bilibili.com/player.html?aid=22267322&cid=36858537&page=1",
                "光电工程学院/国际半导体学院": "//player.bilibili.com/player.html?aid=22267049&cid=36858009&page=1",
                "软件工程学院": "//player.bilibili.com/player.html?aid=22267209&cid=36858299&page=1",
                "生物信息学院": "//player.bilibili.com/player.html?aid=22267229&cid=36858358&page=1",
                "理学院": "//player.bilibili.com/player.html?aid=22267178&cid=36858258&page=1",
                "经济管理学院": "//player.bilibili.com/player.html?aid=22267158&cid=36858132&page=1",
                "传媒艺术学院": "//player.bilibili.com/player.html?aid=22178822&cid=36688616&page=1",
                "外国语学院": "//player.bilibili.com/player.html?aid=22267291&cid=36858511&page=1",
                "国际学院": "//player.bilibili.com/player.html?aid=22267073&cid=36858042&page=1",
                "网络空间安全与信息法学院": "//player.bilibili.com/player.html?aid=22267029&cid=36857898&page=1"
            },
            className: null,
            ios: false,
            android: true,
            video: "",
            // api: "http://ffz55y.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        this.classid = this.$route.params.classid;
        //获取详情页数据
        this.$http.get(this.api+'/vote/user/cheer_info/main', {
                params: {
                    classId: this.$route.params.classid
                }
            })
            .then((response) => {
                this.information = response.data;
                this.slides.push("http://www.newtol.cn/" + this.information.playImg1);
                this.slides.push("http://www.newtol.cn/" + this.information.playImg2);
                this.slides.push("http://www.newtol.cn/" + this.information.playImg3);
                // this.isWeiXin();
                this.className = response.data.className;
                this.video = this.video_List[this.className];
                // if (this.ios) {
                //     this.video = "http://wx.yyeke.com/nodejs/cheerVote/video/" + this.video_List[response.data.className];
                // } else if (this.android) {
                //     this.video = this.information.video;
                // }
            })
            .catch((error) => {
                console.log(error);
            });
        //获取详情页拉拉队员
        this.$http.get(this.api+'/vote/user/cheerPlayerInfo', {
                params: {
                    classId: this.$route.params.classid
                }
            })
            .then((response) => {
                this.duiyuan = response.data;
                this.duiyuanLength = response.data.length;
            })
            .catch((error) => {
                console.log(error);
            });
        //获取票数
        this.$http.get(this.api+'/vote/user/assistance')
            .then((response) => {
                if (response.data.assistance != null) {
                    this.cheerNum = response.data.assistance;
                } else {
                    this.cheerNum = 0;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        //获取留言信息
        this.$http.get(this.api+'/vote/user/content', {
                params: {
                    page: 1,
                    classId: this.$route.params.classid
                }
            })
            .then((response) => {
                this.messages = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    mounted() {
    },
    methods: {
        openImg: function (index) {
            let bigImg = document.querySelector('.bigImg');
            this.currentSlide = index;
            this.$refs.swiper.slideTo(index);
            bigImg.className = 'bigImg';
        },
        close: function () {
            let bigImg = document.querySelector('.bigImg');
            bigImg.className = 'bigImg opnone';
        },
        cheer: function () {
            let cheerAlert = document.querySelector('.cheerAlert');
            let shadow = document.querySelector('.shadow');
            cheerAlert.className = "cheerAlert";
            shadow.className = "shadow";
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

            let data = [{
                classId: this.cheer_classId,
                num: parseInt(cheerToNum.value),
                groupId: this.cheer_groupId
            }];
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
            //发送助力数
            this.$http.post(this.api+'/vote/user/cheer/distance', params)
                .then((response) => {
                    this.$http.get(this.api+'/vote/user/assistance')
                        .then((response) => {
                            if (response.data.assistance != null) {
                                this.cheerNum = response.data.assistance;
                            } else {
                                this.cheerNum = 0;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    cheerAlert.className = "cheerAlert no";
                    cheerAlert2.className = "cheerAlert2";
                    cheerToNum.value = "";
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        leaveMsg: function () {
            let msgAlert = document.querySelector('.msgAlert');
            let shadow = document.querySelector('.shadow');

            msgAlert.className = "msgAlert";
            shadow.className = "shadow";
        },
        sendMsg: function () {
            let msgAlert = document.querySelector('.msgAlert');
            let shadow = document.querySelector('.shadow');

            if (this.msgContent == "") {
                alert("输入不合法");
                msgAlert.className = "msgAlert no";
                shadow.className = "shadow no";
                return false;
            }

            let data = JSON.stringify({
                classId: this.classid,
                content: this.msgContent
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
            //发送助力数
            this.$http.post(this.api+'/vote/user/content', params)
                .then((response) => {
                    this.$http.get(this.api+'/vote/user/content', {
                            params: {
                                page: 1,
                                classId: this.classid
                            }
                        })
                        .then((response) => {
                            this.messages = response.data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    msgAlert.className = "msgAlert no";
                    shadow.className = "shadow no";
                    this.msgContent = "";
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        dianzan: function () {

        },
        closeAlert: function () {
            let cheerAlert2 = document.querySelector('.cheerAlert2');
            let shadow = document.querySelector('.shadow');

            cheerAlert2.className = "cheerAlert2 no";
            shadow.className = "shadow no";
        },
        isWeiXin: function () {
            let ua = window.navigator.userAgent.toLowerCase();

        	if (/iphone/i.test(ua)) {
                this.ios = true;
                this.android = false;
                return 1;
            }
            if (/android/i.test(ua)) {
                this.ios = false;
                this.android = true;
                return 2;
            }

            // if (this.isWeiXin() == 1) {
            //     this.ios = true;
            // } else if (this.isWeiXin() == 2) {
            //     this.android = true;
            // }
        }
    }
}

</script>

<style scoped>
.viewDetail {
    position: relative;
    display: inline-block;
    left: 0;
    top: 0;
    width: 10rem;
    height: 100%;
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

/*主体部分*/
.mainwrap {
    position: relative;
    width: 10rem;
    height: 14rem;
    overflow: scroll;
}

.introduction {
    position: relative;
    left: 0.42rem;
    width: 9.16rem;
    margin-bottom: 0.3rem;
}

.wc-slide img {
    width: 9.16rem;
    height: 4.04rem;
}

.className {
    position: relative;
    margin-top: 0.35rem;
    margin-bottom: 0.1rem;
    color: #444444;
    font-size: 0.373rem;
}

.slogan {
    color: #848484;
    font-size: 0.32rem;
}

.intro {
    margin-top: 0.33rem;
    position: relative;
}

.p_intro_title {
    font-size: 0.346rem;
    color: #8a8a8a;
}

.p_intro {
    line-height: 0.54rem;
    color: #9f9f9f;
    font-size: 0.32rem;
}

.division {
    height: 0.2rem;
    background: #f5f5f5;
}

.video_title {
    position: relative;
    padding-left: 0.42rem;
    font-size: 0.373rem;
    color: #031921;
    line-height: 0.453rem;
    vertical-align: middle;
}

.video_title img {
    display: inline-block;
    margin-right: 0.266rem;
    height: 0.453rem;
    width: 0.066rem;
    margin-top: 0.4rem;
}

.video_title span {
    position: relative;
    display: inline-block;
    top: -0.1rem;
}

.video {
    padding-bottom: 0.4rem;
}

.video_main {
    position: relative;
    margin: 0 auto;
    width: 9.16rem;
    height: 4.6rem;
    margin-top: 0.33rem;
    border-radius: 0.2rem;
}

.picture {
    position: relative;
}

.picture_title {
    position: relative;
    padding-left: 0.42rem;
    font-size: 0.373rem;
    color: #031921;
    line-height: 0.453rem;
    vertical-align: middle;
}

.picture_title img {
    display: inline-block;
    margin-right: 0.266rem;
    height: 0.453rem;
    width: 0.066rem;
    margin-top: 0.4rem;
}

.picture_title span {
    position: relative;
    display: inline-block;
    top: -0.1rem;
}

.picture_main {
    display: inline-block;
    position: relative;
    width: 9.21rem;
    left: 0.42rem;
    margin-top: 0.33rem;
}

.picture_item {
    display: inline-block;
    float: left;
    width: 3.01rem;
    height: 3.01rem;
    margin-right: 0.05rem;
    margin-bottom: 0.05rem;
}

.picture_item img {
    width: 3.01rem;
    height: 3.01rem;
    border-radius: 3px;
}

.message {
    position: relative;
    width: 9.16rem;
    margin: 0 auto;
}

.message_title {
    height: 0.453rem;
    margin: 0.4rem 0;
}

.message_title img {
    position: absolute;
    right: 0;
    width: 1.16rem;
    height: 0.453rem;
}

.message_item {
    position: relative;
    padding: 0.4rem 0;
    height: 100%;
    width: 9.16rem;
    border-top: 0.0133rem solid #f3f3f3;
}

.message_item_icon {
    position: relative;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
}

.message_item_name {
    position: absolute;
    display: inline-block;
    top: 0.45rem;
    margin-left: 0.2rem;
    font-size: 0.346rem;
    color: #333333;
}

.message_item_time {
    position: absolute;
    display: inline-block;
    top: 0.9rem;
    margin-left: 0.2rem;
    font-size: 0.293rem;
    color: #aeaeae;
}

.message_item_content {
    position: relative;
    color: #666;
    width: 9.16rem;
    word-wrap: break-word;
}

.zan {
    position: absolute;
    top: 0.5rem;
    right: 0;
    background: url(../assets/zan.png);
    background-size: 100% 100%;
    width: 0.453rem;
    height: 0.453rem;
}

.hzan {
    background: url(../assets/hzan.png);
}

.message_item_prasie {
    position: absolute;
    right: 0.1rem;
    color: #666;
    top: 1.05rem;
}

.msg_area {
    position: absolute;
    top: 0;
}

/*底部*/
.footer_view {
    position: fixed;
    bottom: 0rem;
    width: 10rem;
    z-index: 10;
    height: 1.133rem;
    font-size: 20px;
    border-top: 1px solid #dedede;
}

.footer_view a {
    display: inline-block;
    top: -1.17rem;
    width: 4.986rem;
    float: left;
}

.cheer,.answer {
    display: inline-block;
    width: 4.986rem;
    height: 1.133rem;
    float: left;
}

.cheer img,.answer img {
    width: 4.986rem;
    height: 1.133rem;
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

.msg_area {
    position: relative;
    top: 4.4rem;
    left: 0.733rem;
    line-height: 0.5rem;
    height: 1.5rem;
    font-size: 0.293rem;
    width: 5.56rem;
    padding: 0 0.2rem;
    border: 0.013rem solid #c2c2c2;
    border-radius: 0.1rem;
    color: #b4b4b4;
    -webkit-appearance: none;
}

.cheerAlert, .msgAlert {
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

.cheerAlert p, .msgAlert p {
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
    -webkit-appearance: none;
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

textarea:-ms-input-placeholder{
    color: #c4c4c4;
    opacity:1;
}

textarea::-webkit-input-placeholder{
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

.cheerAlert .confirm, .msgAlert .confirm {
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

.shadowimg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2.206rem;
    margin-left: -2.14rem;
    width: 4.28rem;
    height: 4.413rem;
    opacity: 1;
    z-index: 99;
}

.bigImg {
    position: absolute;
    top: 0;
    width: 10rem;
    background: rgba(0,0,0,0.85);
    height: 100%;
    z-index: 99;
}

.bigImg .wc-swiper-container {
    height: 100%;
}

.bigImg .wc-slide img {
    position: absolute;
    top: 4.8rem;
    height: 6.76rem;
    width: 10rem;
}

.bigImg .wc-slide {
    height: 100%;
    width: 10rem;
    position: relative;
}

.description {
    position: absolute;
    bottom: 0;
    line-height: 0.6rem;
    width: 9.2rem;
    padding: 0.7rem 0.4rem;
    font-size: 0.346rem;
    color: #ffffff;
    background: #000000;
}

.description span {
    display: block;
    position: absolute;
    width: 10rem;
    bottom: 0.13rem;
    left: 0rem;
    text-align: center;
    font-size: 0.32rem;
    margin: 0 auto;
}

.opnone {
    visibility: hidden;
}

.no {
    display: none;
}
</style>
