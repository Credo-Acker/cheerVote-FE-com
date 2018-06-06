<template>
    <div class="enter" v-bind:class="{enter2: isEnter2}">
        <router-link to="/index" class="toIndex">
            <button class="over"></button>
        </router-link>
        <template v-if="isEnter2">
            <div class="enterInfo">
                <p>当日答题<span>{{da}}</span>题</p>
                <p>超过<span>{{dachao}}</span>的同学</p>
                <p>当日答对<span>{{dui}}</span>题</p>
                <p>超过<span>{{duichao}}</span>的同学</p>
                <p>为拉拉队助力<span>{{zhu}}票</span></p>
                <p>超过<span>{{zhuchao}}</span>的同学</p>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'Enter',
    data() {
        return {
            hour: 0,
            da: 0,
            dachao: "0%",
            dui: 0,
            duichao: "0%",
            zhu: 0,
            zhuchao: "0%",
            isEnter2: false,
            // api: "http://g5wcuw.natappfree.cc"
            api: "http://www.newtol.cn"
        }
    },
    created() {
        //获取今日答题数
        this.$http.get(this.api+'/vote/user/todayNum')
            .then((response) => {
                let todayNum = response.data.todayNum;
                if (todayNum <= 0) {
                    this.isEnter2 = false;
                } else {
                    this.isEnter2 = true;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        this.$http.get(this.api+'/vote/user/startPage')
            .then((response) => {
                if (response.data.todayNum) {
                    this.da = response.data.todayNum;
                    this.dachao = response.data.todayNumRank;
                    this.dui = response.data.rightNum;
                    this.duichao = response.data.rightNumRank;
                    this.zhu = response.data.assistance;
                    this.zhuchao = response.data.assistanceRank;
                } else {
                    this.da = 0;
                    this.dachao = "0%";
                    this.dui = 0;
                    this.duichao = "0%";
                    this.zhu = 0;
                    this.zhuchao = "0%";
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setTimeout(() => {
            if (this.$route.path == '/') {
                this.$router.push('/index');
            }
        }, 10000);
    }
}
</script>

<style scoped>
@font-face {
    font-family:"Myfont";
    src: url('../assets/font.ttf');
}
/*进入动画*/
.enter {
    position: relative;
    width: 10rem;
    height: 100%;
    background: url(../assets/enter.png);
    background-size: 100% 100%;
    z-index: 9;
}

.enter2 {
    background: url(../assets/enter2.jpg);
    background-size: 100% 100%;
}

.enterInfo {
    position: relative;
    left: 4.88rem;
    top: 2rem;
    font-size: 0.48rem;
    font-family: 'Myfont';
    color: #ffffff;
    font-weight: 600;
}

.enterInfo p {
    width: 5.1rem;
    margin-bottom: 0.42rem;
}

.enterInfo span {
    color: #da5c27;
}

.over {
    position: relative;
    top: 0.4rem;
    left: 8.36rem;
    width: 0.92rem;
    height: 0.92rem;
    z-index: 2;
    background: url(../assets/over.png);
    background-size: 0.92rem 0.92rem;
    border-radius: 0.46rem;
    border: none;
}
</style>
