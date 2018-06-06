<template>
    <div class="index">
        <div class="rulewrap">
            <div class="rule" :class="{rule45: isRule45}" v-on:click="showRule">
                活动时间: 即日起至4月20日</br>
                活动规则: 参与者通过答题获得投票(答对一题获得一票，每位参与者每天限答50题)，获得投票后可直接投票给自己所支持的拉拉队。活动截止时，得票第一的战队为获胜战队。</br>
                战队:</br>
                重邮仙女阵线联盟: 光电工程学院重庆国际半导体学院+网络空间安全与信息法学院+传媒艺术学院</br>
                Mr tony: 通信与信息工程学院+先进制造工程学院+生物信息学院+理学院</br>
                小猪佩奇战队: 软件工程学院+经济管理学院/现代邮政学院+国际学院</br>
                外动机: 计算机科学与技术学院+自动化学院+外国语学院</br>
                奖励规则:</br>
                活动结束后得票第一的战队获得奖金</br>
                活动期间累计答题正确数最高的答题者获得相应奖品</br>
                每日答题者根据答题正确数排名获得相应奖品</br>
                每日抽取3位答题者为幸运用户获得相应奖品</br>
                更多奖励、则请关注重邮小帮手微信公众号查看
            </div>
            <div class="glide" v-on:click="showRule">
                <img src="../assets/glide.png">
            </div>
        </div>
        <div class="indexInfowrap">
            <div class="indexInfo" v-if="information.length">
                <ul>
                    <li v-for="(item, index) in information" class="li_indexInfo" v-bind:key="index">
                        <router-link :to="{path:'/viewDetail/'+item.classId}">
                            <img v-bind:src="'http://www.newtol.cn/' + item.firstImg" class="firstImg">
                            <span class="className">{{item.className}}</span>
                            <span class="slogan">{{item.slogan}}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer_index">
            <router-link to="/index">
                <div class="shouye">
                    <img src="../assets/hshouye.png">
                </div>
            </router-link>
            <router-link to="/answer">
                <div class="dati">
                    <img src="../assets/dati.png">
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
    name: 'Index',
    data () {
        return {
            isRuleMove: false,
            information: [],
            todayNum: '',
            isRule45: false,
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        //获取首页信息
        this.$http.get(this.api+'/vote/user/cheer_info/firstPage')
            .then((response) => {
                this.information = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        //用户是否第一次进入页面
        let rule = getCookie("rule") ? getCookie("rule") : 0;
        if (rule > 0) {
            this.isRuleMove = true;
            this.isRule45 = true;
        } else {
            let date = new Date();
            date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
            document.cookie = "rule=1; expires=" + date.toGMTString();
        }
        function getCookie(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length,c.length);
                }
            }
            return "";
        }
    },
    mounted() {

    },
    methods: {
        //规则函数
        showRule: function () {
            let rule = document.querySelector('.rule');
            if (this.isRuleMove) {
                rule.className = "rule ruleMoveDown";
                this.isRuleMove = !this.isRuleMove;
            } else {
                rule.className = "rule ruleMoveUp";
                this.isRuleMove = !this.isRuleMove;
            }
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
}

.index {
    width: 10rem;
    height: 100%;
    position: relative;
    top: 0;
}

/*规则*/
.rulewrap {
    position: relative;
    top: 0;
    width: 10rem;
    height: 0.6rem;
}

.rule {
    position: relative;
    padding: 0.16rem 0.4rem 0.16rem 0.4rem;
    width: 9.2rem;
    height: 9.7rem;
    font-size: 0.346rem;
    line-height: 0.55rem;
    cursor: pointer;
    overflow: hidden;
    z-index: 3;
    color: #ffffff;
    background: #50ceff;
}

.rule45 {
    position: relative;
    padding: 0.16rem 0.4rem 0.16rem 0.4rem;
    width: 9.2rem;
    font-size: 0.346rem;
    line-height: 0.55rem;
    cursor: pointer;
    overflow: hidden;
    z-index: 3;
    color: #ffffff;
    background: #50ceff;
    height: 0.45rem;
}

.glide {
    position: relative;
    top: 0;
    margin: 0 auto;
    width: 0.573rem;
    height: 0.28rem;
    z-index: 3;
    background-color: #50ceff;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
}

.glide img {
    position: absolute;
    left: 0.138rem;
    top: 0.02rem;
    width: 0.28rem;
    height: 0.186rem;
}

.ruleMoveUp {
    animation: ruleMoveUp 1s;
    animation-fill-mode: forwards;
}

.ruleMoveDown {
    animation: ruleMoveDown 1s;
    animation-fill-mode: forwards;
}

@keyframes ruleMoveUp {
    0% {
        height: 9.7rem;
    }
    100% {
        height: 0.45rem;
    }
}

@keyframes ruleMoveDown {
    0% {
        height: 0.45rem;
    }
    100% {
        height: 9.7rem;
    }
}


/*首页*/
.index {
    position: relative;
    display: inline-block;
    width: 10rem;
    height: 100%;
    background-color: #f5f5f5;
}

.indexInfowrap {
    position: relative;
    width: 10rem;
    height: calc(100% - 2rem);
    overflow: scroll;
}

.li_indexInfo {
    position: relative;
    margin: 0 auto;
    margin-top: 0.6rem;
    width: 9.146rem;
    height: 5.64rem;
    border-radius: 0.133rem;
    background-color: #ffffff;
}

.firstImg {
    display: block;
    position: absolute;
    top: 0.3rem;
    left: 0.373rem;
    width: 8.493rem;
    height: 3.773rem;
    border-radius: 0.133rem;
}

.className {
    position: absolute;
    top: 4.373rem;
    display: block;
    left: 0.373rem;
    width: 8.493rem;
    font-size: 0.386rem;
    color: #4e4e4e;
}

.slogan {
    position: absolute;
    display: block;
    top: 4.933rem;
    left: 0.373rem;
    width: 8.8rem;
    font-size: 0.333rem;
    color: #9f9f9f;
}

.footer_index {
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
