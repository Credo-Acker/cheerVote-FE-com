const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.listen(8080);

app.set('views', './');

app.use(express.static(__dirname + '/'));
let jsonParser = bodyParser.json();
let urlJsonParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlJsonParser);

app.post('/vote/admin/login', jsonParser, function (req, res) {
    console.log("有人来登录了");

    let username = req.body.username;
    let password = req.body.password;
    let data = {
        sessionId: 2020,
        role: 0
    };
    if (username == "aaa" && password == "aaa") {
        console.log(username, password)
        res.send(data);
        console.log("ok")
    } else {
        console.log(username, password)
        console.log("no")
    }

});

app.get('/vote/admin/cheer_result', function (req, res) {
    console.log('请求学院的');
    let json = [
        {
            "classId": 1,
            "result": 1
        },
        {
            "classId": 2,
            "result": 0
        },
        {
            "classId": 3,
            "result": 1
        },
        {
            "classId": 4,
            "result": 0
        },
        {
            "classId": 5,
            "result": 1
        },
        {
            "classId": 6,
            "result": 0
        },
        {
            "classId": 7,
            "result": 1
        },
        {
            "classId": 8,
            "result": 1
        },
        {
            "classId": 9,
            "result": 0
        },
        {
            "classId": 10,
            "result": 1
        },
        {
            "classId": 11,
            "result": 0
        },
        {
            "classId": 12,
            "result": 1
        },
        {
            "classId": 13,
            "result": 1
        },
        {
            "classId": 14,
            "result": 0
        },
        {
            "classId": 15,
            "result": 1
        }
    ];
    res.send(json);
});

app.post('/vote/admin/question_num', function (req, res) {
    console.log('获取星级题目数量');
    let json = [
        {
            "kind": 1,
            "total": 4
        }, {
            "kind": 2,
            "total": 5
        }, {
            "kind": 3,
            "total": 2
        }, {
            "kind": 4,
            "total": 2
        }, {
            "kind": 5,
            "total": 1
        }
    ];
    res.send(json);

});

app.post('/vote/admin/question_list/', jsonParser, function (req, res) {
    console.log('题目');
    console.log(req.body)
    let json = [{

        "A": "你好1",
        "B": "12456",
        "C": "撒旦da",
        "D": "ANODHA",
        "answer": "D",
        "kind": "1",
        "questionId": 4,
        "title": "nihao "

    }, {

        "A": "你好7",
        "B": "12456",
        "C": "撒旦da",
        "D": "ANOWHD",
        "answer": "A",
        "kind": "1",
        "questionId": 10,
        "title": "nihao "

    }, {

        "A": "你好8",
        "B": "12456",
        "C": "撒旦da",
        "D": "ANOWHDA",
        "answer": "D",
        "kind": "1",
        "questionId": 11,
        "title": "nihao "

    }];
    res.send(json);
});

app.post('/vote/admin/question', function (req, res) {
    console.log(req.body)
});

app.post('/vote/admin/question/del', jsonParser, function (req, res) {
    console.log(req.body)
    let json = {aa:"删除成功"};
    res.send(json);
});

app.post('/vote/admin/question_list/aa', function (req, res) {
    console.log(req.body)
    let json = {
        data: "aaa"
    };
    res.send(json);
});

app.get('/vote/admin/question/sel/2', function (req, res) {
    console.log(req.body)
    let json = [{

        "A": "222222",
        "B": "12456",
        "C": "你好",
        "D": "ANOWHD AOWDHA",
        "answer": "D",
        "kind": "1",
        "questionId": 4,
        "title": "nihao "

    }, {

        "A": "你好2",
        "B": "12456",
        "C": "nihao",
        "D": "ANOWHD AOWDHA",
        "answer": "C",
        "kind": "4",
        "questionId": 5,
        "title": "456"

    }, {

        "A": "1111",
        "B": "12456",
        "C": "撒旦da",
        "D": "ANOWHD AOWDHA",
        "answer": "D",
        "kind": "3",
        "questionId": 6,
        "title": "你好啊"

    }];

    res.send(json);
});

app.get('/vote/user/startPage', (req, res) => {
    let json = {
        rightNum: 5,
        assistance: 10,
        todayNum: 10,
        rightNumRank: "5%",
        assistanceRank: "10%",
        todayNumRank: "10%"
    };
    res.send(json);
});

app.get('/vote/user/todayNum', (req, res) => {
    let json = {
        todayNum: 10
    };
    res.send(json);
});

app.get('/vote/user/assistance', (req, res) => {
    let json = {
        assistance: 20
    }
    res.send(json);
});

app.get('/vote/user/cheer_info/firstPage', (req, res) => {
    let json = [
        {"className": "自动化学院",
        "firstImg": "http://img2.imgtn.bdimg.com/it/u=4153290635,3572718379&fm=27&gp=0.jpg",
        "slogan": "啦啦啦啦啦啦"
        }, {
        "className": "软件学院",
        "firstImg": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3142081627,4151929064&fm=27&gp=0.jpg",
        "slogan": "2是的是的所多所多所多所多"
        }, {
        "className": "通信学院",
        "firstImg": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1745062794,1700195832&fm=27&gp=0.jpg",
        "slogan": "嘻嘻嘻嘻嘻一嘻嘻嘻"
        }
    ];
    res.send(json);
});

app.post('/vote/user/cheer/distance', (req, res) => {
    let json = [{

    "distance": 2,
    "groupId": "1",
    "groupName": "kkk"

}, {

    "distance": 50,
    "groupId": "3",
    "groupName": "ppp"

}, {

    "distance": 35,
    "groupId": "7",
    "groupName": "aaa"

}];
    res.send(json);
});

app.get('/vote/user/question', (req, res) => {
    console.log("问题")
    let json = {
        "A": "51",
        "B": "30",
        "C": "45",
        "questionId": 62,
        "D": "50",
        "todayNum": 6,
        "title": "2008年北京奥运会中国一共获得了多少枚金"
    };
    res.send(json);
});

app.post('/vote/user/answer', (req, res) => {
    console.log('答案')
    let json = {
        answer: "A"
    };
    res.send(json);
});

app.get('/vote/user/cheer_info/main', (req, res) => {
    let json = {
        "className": "计算机学院",
        "firstImg": "https://www.bejson.com/",
        "introduce": "啦啦啦啦啦啦啦啦时积极啊的还不会死的热负荷愠色有色有任务额人员为也如荣雨薇有人为你有热舞一日为有wireu五花肉给他能股份会给对方加更换发动机过分的话加工费可接受的好烦人物美",
        "playImg1": "http://img3.imgtn.bdimg.com/it/u=1752055497,2957804956&fm=27&gp=0.jpg",
        "playImg2": "http://img3.imgtn.bdimg.com/it/u=3408403074,1974597991&fm=27&gp=0.jpg",
        "playImg3": "http://img5.imgtn.bdimg.com/it/u=4054007864,2464688467&fm=27&gp=0.jpg",
        "slogan": "计算机哈哈哈哈哈哈哈哈哈",
        "video": "https://v.qq.com/x/page/y0553etmz38.html"
    };
    res.send(json);
});

app.get('/vote/user/cheer/laladuiyaun', (req, res) => {
    let json = [
        {
            imgUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2840984157,380029315&fm=27&gp=0.jpg",
            name: "张三",
            description: "sadsadasda个覆盖法国队sdad",
        },
        {
            imgUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3441176590,1125476220&fm=27&gp=0.jpg",
            name: "张ls",
            description: "sadsadasdas根深蒂固dad",
        },
        {
            imgUrl: "http://img3.imgtn.bdimg.com/it/u=4279702637,1278251882&fm=27&gp=0.jpg",
            name: "张rr",
            description: "sadsadasdas任天堂荣耀dad",
        },
        {
            imgUrl: "http://img3.imgtn.bdimg.com/it/u=1752055497,2957804956&fm=27&gp=0.jpg",
            name: "张hg",
            discription: "sadsadas格瑞特dasdad",
        },
        {
            imgUrl: "http://img4.imgtn.bdimg.com/it/u=3646270870,1167427402&fm=27&gp=0.jpg",
            name: "张三xzs",
            description: "sadsadas第三方菲日天dasdad",
        },
        {
            imgUrl: "http://img1.imgtn.bdimg.com/it/u=4073425408,760969153&fm=27&gp=0.jpg",
            name: "张三lkl",
            description: "sadsadasdfggfvcvcasdad",
        },
        {
            imgUrl: "http://img0.imgtn.bdimg.com/it/u=2531276078,2913225038&fm=27&gp=0.jpg",
            name: "张三op",
            description: "sadsadgtretertasdasdad",
        },
        {
            imgUrl: "http://img2.imgtn.bdimg.com/it/u=315833101,3043269541&fm=27&gp=0.jpg",
            name: "张三",
            description: "sadsa固体胶哦哦就隔热哦个国土局日哦二姑家欧迪芬距谷底佛过节费丢给IoTue肉一体热呕吐日额偶UI哦士诶哦如题热偶退偶尔腿肉腿儿哦腿儿哦图日饿哦dasdasdad",
        },
        {
            imgUrl: "http://img2.imgtn.bdimg.com/it/u=315833101,3043269541&fm=27&gp=0.jpg",
            name: "4343",
            description: "sadsa固体胶哦哦就隔热哦个国土局日哦二姑家欧迪芬距谷底佛过节费丢给IoTue肉一体热呕吐日额偶UI哦士诶哦如题热偶退偶尔腿肉腿儿哦腿儿哦图日饿哦dasdasdad",
        }
    ];
    res.send(json);
});


app.get('/vote/user/get/groupRank', (req, res) => {
    let json = [
        {
            "className": ["自动化学院", "通信学院", "计算机学院"],
            "distance": 2232,
            "groupId": "1",
            "groupName": "阿萨战队"
        },
        {
            "className": ["自动化学院", "通信学院", "计算机学院"],
            "distance": 5542,
            "groupId": "1",
            "groupName": "啊啊战队"
        },
        {
            "className": ["自动化学院", "通信学院", "计算机学院"],
            "distance": 2232,
            "groupId": "1",
            "groupName": "k恶趣味k战队"
        },
        {
            "className": ["自动化学院", "通信学院", "计算机学院"],
            "distance": 2000,
            "groupId": "1",
            "groupName": "k额特务战队"
        },
        {
            "className": ["自动化学院", "通信学院", "计算机学院"],
            "distance": 100,
            "groupId": "1",
            "groupName": "kasak战队"
        }
    ];
    res.send(json);
});

app.get('/vote/user/get/userRank', (req, res) => {
    let json = [
        {
            "nickname": "a1111",
            "rightNum": "50"
        },
        {
            "nickname": "2欧赔",
            "rightNum": "49"
        },
        {
            "nickname": "3㔿",
            "rightNum": "48"
        },
        {
            "nickname": "4水电",
            "rightNum": "47"
        },
        {
            "nickname": "5发的a",
            "rightNum": "46"
        },
        {
            "nickname": "6aa",
            "rightNum": "45"
        },
        {
            "nickname": "7ed",
            "rightNum": "44"
        },
        {
            "nickname": "a8水电a",
            "rightNum": "43"
        },
        {
            "nickname": "a99aa",
            "rightNum": "42"
        },
        {
            "nickname": "no10",
            "rightNum": "41"
        }

    ];
    res.send(json);
});

app.get('/vote/user/luckyUser', (req, res) => {
    let json = [
        {
            "headImgUrl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2840984157,380029315&fm=27&gp=0.jpg",
            "nickname": "哈哈哈",
            "rightNum": "13"
        },
        {
            "headImgUrl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3556326025,2943004307&fm=27&gp=0.jpg",
            "nickname": "deideide",
            "rightNum": "45"
        },
        {
            "headImgUrl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3342737063,3964532796&fm=27&gp=0.jpg",
            "nickname": "credo",
            "rightNum": "15"
        }
    ];
    res.send(json);
});

app.post('/vote/user/info', (req, res) => {
    let json = {
        "status": 200,
        "message": "OK",
        "headImgUrl":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2840984157,380029315&fm=27&gp=0.jpg",
        "nickName":"6666哥"
    };
    res.send(json);
});

app.get('/vote/user/assistance/history', (req, res) => {
    let json = [
        {
            "assistance": 1,
            "classId": "1",
            "className": "计算机",
            "distance": 2,
            "groupId": 1,
            "groupName": "kkk"
        }, {
            "assistance": 1,
            "classId": "2",
            "className": "自动化",
            "distance": 2,
            "groupId": 2,
            "groupName": "ooo"
        }, {
            "assistance": 1,
            "classId": "3",
            "className": "软件",
            "distance": 5,
            "groupId": 3,
            "groupName": "ppp"
        },
        {
            "assistance": 1,
            "classId": "1",
            "className": "计算机",
            "distance": 2,
            "groupId": 1,
            "groupName": "kkk"
        }, {
            "assistance": 1,
            "classId": "2",
            "className": "自动化",
            "distance": 2,
            "groupId": 2,
            "groupName": "ooo"
        }, {
            "assistance": 1,
            "classId": "3",
            "className": "软件",
            "distance": 5,
            "groupId": 3,
            "groupName": "ppp"
        },
        {
            "assistance": 1,
            "classId": "1",
            "className": "计算机",
            "distance": 2,
            "groupId": 1,
            "groupName": "kkk"
        }, {
            "assistance": 1,
            "classId": "2",
            "className": "自动化",
            "distance": 2,
            "groupId": 2,
            "groupName": "ooo"
        }, {
            "assistance": 1,
            "classId": "3",
            "className": "软件",
            "distance": 5,
            "groupId": 3,
            "groupName": "ppp"
        }
    ];
    res.send(json);
});
