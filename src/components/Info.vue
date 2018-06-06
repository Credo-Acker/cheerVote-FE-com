<template>
    <div class="info">
        <div class="main" v-on:>
            <div class="bang">
                {{bang}}
            </div>
                <div class="zhandui">
                    <div class="tip1">
                        战队中学院按拼音排序
                    </div>
                    <ul class="teams">
                        <li v-for="(item,index) in teams" class="team">
                            <h3>{{item.groupName}}</h3>
                            <span>{{item.distance}}</span>
                            <ul class="xueyuan">
                                <li v-for="item2 in classNames[index]">
                                    {{item2}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div @click="right" class="toright">
                        <div class="tip2">
                            <span>
                                点击可查看答题榜单 <img src="../assets/to_right.png">
                            </span>

                        </div>
                    </div>
                </div>
                <div class="bangdan no">
                    <ul class="ul_bangdan" :class="{ul_bangdan_: timeNow >= 20}">
                        <li v-if="first">
                            <span class="no1" :class="{no1_: timeNow >= 20}"></span>
                            <span class="name_bangdan" :class="{name_bangdan_: timeNow >= 20}">{{first.nickname}}</span>
                            <span class="shuliang" :class="{shuliang_: timeNow >= 20}">{{first.rightNum}}题</span>
                        </li>
                        <li v-if="second">
                            <span class="no2" :class="{no2_: timeNow >= 20}"></span>
                            <span class="name_bangdan" :class="{name_bangdan_: timeNow >= 20}">{{second.nickname}}</span>
                            <span class="shuliang" :class="{shuliang_: timeNow >= 20}">{{second.rightNum}}题</span>
                        </li>
                        <li v-if="third">
                            <span class="no3" :class="{no3_: timeNow >= 20}"></span>
                            <span class="name_bangdan" :class="{name_bangdan_: timeNow >= 20}">{{third.nickname}}</span>
                            <span class="shuliang" :class="{shuliang_: timeNow >= 20}">{{third.rightNum}}题</span>
                        </li>
                        <li v-for="(item, index) in next">
                            <span class="no_next" :class="{no_next_: timeNow >= 20}">{{index+4}}</span>
                            <span class="name_bangdan" :class="{name_bangdan_: timeNow >= 20}">{{item.nickname}}</span>
                            <span class="shuliang" :class="{shuliang_: timeNow >= 20}">{{item.rightNum}}题</span>
                        </li>
                    </ul>
                    <div @click="left" class="toleft">
                        <div class="tip3" :class="{no: timeNow >= 20}">
                                <img src="../assets/to_left.png"> 每晚20:00公布幸运用户
                            </div>
                        <div v-if="timeNow >= 20">
                            <ul class="ul_luck">
                                <li v-for="item in luckyOnes">
                                    <img :src="item.headImgUrl">
                                    <div>{{item.nickname}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </v-touch>
            <router-link to="/my">
                <div class="cheerNum">
                    <span>我的可投票数：</span><span class="num">{{mycheer}}</span>
                </div>
            </router-link>
        </div>
        <div class="footer_info">
            <router-link to="/index">
                <div class="shouye">
                    <img src="../assets/shouye.png">
                </div>
            </router-link>
            <router-link to="/answer">
                <div class="dati">
                    <img src="../assets/dati.png">
                </div>
            </router-link>
            <router-link to="/info">
                <div class="xiaoxi">
                    <img src="../assets/hxiaoxi.png">
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Info',
    data() {
        return {
            bang: "战队排行榜",
            team1: "",
            team2: "",
            team3: "",
            vote1: 0,
            vote2: 0,
            vote3: 0,
            mycheer: null,
            teams: [],
            first: null,
            second: null,
            third: null,
            next: [],
            luckyOnes: [],
            timeNow: 0,
            classNames: [],
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        this.timeNow = new Date().getHours();
        //获取助力数
        this.$http.get(this.api+'/vote/user/assistance')
            .then((response) => {
                if (response.data.assistance != null) {
                    this.mycheer = response.data.assistance;
                } else {
                    this.mycheer = 0;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        //获取战队榜单
        this.$http.get(this.api+'/vote/user/cheer/groupRank')
            .then((response) => {
                this.teams = response.data;
                let item;
                for (item of this.teams) {
                    this.classNames.push(JSON.parse(item.className));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        //获取个人答题榜
        this.$http.get(this.api+'/vote/user/userList')
            .then((response) => {
                this.first = response.data[0];
                if (response.data[1]) {
                    this.second = response.data[1];
                }
                if (response.data[2]) {
                    this.third = response.data[2];
                }
                if (response.data.length > 3) {
                    for (let i = 3; i < response.data.length; i++) {
                        this.next.push(response.data[i]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

        //如果八点，则获取幸运用户
        if (this.timeNow >= 20) {
            this.$http.get(this.api+'/vote/user/luckyUser')
                .then((response) => {
                    this.luckyOnes = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    methods: {
        right: function () {
            let zhandui = document.querySelector('.zhandui');
            let bangdan = document.querySelector('.bangdan');
            this.bang = "答题排行榜";
            zhandui.className = "zhandui no";
            bangdan.className = "bangdan";
        },
        left: function () {
            let zhandui = document.querySelector('.zhandui');
            let bangdan = document.querySelector('.bangdan');
            this.bang = "战队排行榜";
            zhandui.className = "zhandui";
            bangdan.className = "bangdan no";
        }
    }
}
</script>

<style scoped>
/* @font-face {
    font-family:"Myfont";
    src: url('../assets/font.ttf');
} */

.info {
    position: relative;
    width: 10rem;
    height: 100%;
}

/* 主体 */
.main {
    position: relative;
    width: 10rem;
    /* height: 14.9rem; */
    height: calc(100% - 1.33rem);
    background: url(../assets/bg_info.png);
    background-size: 100% 14.9rem;
    /* background-size: 100% 100%; */
    background-repeat: no-repeat;
}

.zhandui {
    position: relative;
    width: 10rem;
    height: 11rem;
    top: 1.5rem;
}

.bang {
    position: relative;
    top: 0.94rem;
    width: 3rem;
    left: 4.27rem;
    font-size: 0.346rem;
    height: 0.52rem;
    color: #ffffff;
}

.tip1 {
    position: relative;
    display: inline-block;
    left: 3.7rem;
    color: #c9c9c9;
    font-size: 0.293rem;
}

.teams {
    position: relative;
    top: 0.4rem;
    left: 1.5rem;
    width: 7.066rem;
    height: 9.15rem;
    overflow: scroll;
}

.team {
    position: relative;
    margin-bottom: 0.28rem;
}

.team h3 {
    position: relative;
    top: 0;
    font-size: 0.373rem;
    color: #50ceff;
    font-weight: 500;
    display: inline-block;
    margin-bottom: 0.12rem;
}

.no_next {
    font-family: 'Myfont';
}

.team span {
    display: inline-block;
    right: 0.2rem;
    top: 0.05rem;
    position: absolute;
    color: #ff8080;
    font-size: 0.346rem;
}

.team .xueyuan {
    display: block;
}

.team .xueyuan li {
    color: #787878;
    font-size: 0.346rem;
    margin-bottom: 0.05rem;
}

.toright {
    position: relative;
    top: 0.7rem;
}

.tip2 {
    display: inline-block;
    position: relative;
    color: #c9c9c9;
    font-size: 0.293rem;
    letter-spacing: 0.02rem;
    height: 0.8rem;
    width: 10rem;
    text-align: center;
}

.tip2 span {
    position: relative;
    display: inline-block;
}

.tip2 img {
    width: 0.12rem;
    height: 0.226rem;
}

.bangdan {
    position: relative;
    width: 10rem;
    height: 11rem;
    top: 1.5rem;
}

.ul_bangdan {
    width: 6.733rem;
    position: relative;
    height: 9.466rem;
    left: 1.6rem;
    top: 0.2rem;
}

.ul_bangdan li {
    height: 0.933rem;
    border-bottom: 0.013rem solid #f2f2f2;
}

.no1 {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.2rem;
    background: url(../assets/no1.png);
    background-size: 100% 100%;
}

.no2 {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.2rem;
    background: url(../assets/no2.png);
    background-size: 100% 100%;
}

.no3 {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.2rem;
    background: url(../assets/no3.png);
    background-size: 100% 100%;
}

.no_next {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    color: #bbbbbb;
    line-height: 0.933rem;
    text-align: center;
    font-size: 0.346rem;
}

.name_bangdan {
    display: inline-block;
    position: relative;
    line-height: 0.933rem;
    height: 0.933rem;
    font-size: 0.346rem;
    color: #787878;
    text-align: center;
    margin-left: 0.1rem;
}

.shuliang {
    position: absolute;
    display: inline-block;
    right: 0.1rem;
    line-height: 0.933rem;
    text-align: center;
    color: #ff6666;
    font-size: 0.346rem;
}

.toleft {
    position: relative;
    height: 0.8rem;
    top: 0.8rem;
}

.tip3 {
    display: inline-block;
    position: relative;
    color: #c9c9c9;
    left: 3.58rem;
    font-size: 0.293rem;
    letter-spacing: 0.02rem;
}

.tip3 img {
    width: 0.12rem;
    height: 0.206rem;
}

.ul_luck {
    position: relative;
    left: 1.66rem;

}

.ul_luck li {
    width: 1.74rem;
    height: 1.44rem;
    float: left;
    margin-right: 0.6rem;
    text-align: center;
}

.ul_luck li img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.4rem;
}

.ul_luck li div {
    width: 1.46rem;
    overflow: hidden;
    margin-top: 0.05rem;
    color: #acacac;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    text-align: center;
    display: inline-block;
}

.cheerNum {
    position: relative;
    top: 1.65rem;
    left: 3.533rem;
    width: 3.4rem;
    height: 0.52rem;
    font-size: 0.293rem;
    line-height: 0.55rem;
    vertical-align: middle;
    text-align: center;
    letter-spacing: 0.02rem;
}

.cheerNum span {
    color: #b7b7b7;
}

.cheerNum .num {
    color: #ff7e7e;
}

.ul_bangdan_ {
    height: 8.633rem;
}

.ul_bangdan_ li {
    height: 0.85rem;
    border-bottom: 0.013rem solid #f2f2f2;
}

.no1_ {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.12rem;
    background: url(../assets/no1.png);
    background-size: 100% 100%;
}

.no2_ {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.12rem;
    background: url(../assets/no2.png);
    background-size: 100% 100%;
}

.no3_ {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    position: relative;
    top: 0.12rem;
    background: url(../assets/no3.png);
    background-size: 100% 100%;
}

.no_next_ {
    display: inline-block;
    width: 0.493rem;
    height: 0.626rem;
    color: #bbbbbb;
    line-height: 0.85rem;
    text-align: center;
    font-size: 0.346rem;
}

.name_bangdan_ {
    display: inline-block;
    position: relative;
    line-height: 0.85rem;
    height: 0.85rem;
    font-size: 0.346rem;
    color: #787878;
    text-align: center;
    margin-left: 0.1rem;
}

.shuliang_ {
    position: absolute;
    display: inline-block;
    right: 0.1rem;
    line-height: 0.85rem;
    text-align: center;
    color: #ff6666;
    font-size: 0.346rem;
}

.no {
    display: none;
}

/* 底部 */
.footer_info {
    position: fixed;
    bottom: 0;
    width: 10rem;
    height: 1.33rem;
    font-size: 20px;
    border-top: 1px solid #dedede;
    background-color: #ffffff;
}

.shouye,.dati,.xiaoxi {
    width: 3.333rem;
    height: 1.33rem;
    float: left;
    background: #ffffff;
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
