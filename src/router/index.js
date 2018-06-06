import Vue from 'vue';
import Router from 'vue-router';
import Enter from '@/components/Enter';
import Index from '@/components/Index';
import ViewDetail from '@/components/ViewDetail';
import Cheer from '@/components/Cheer';
import AnswerQue from '@/components/AnswerQue';
import Answer from '@/components/Answer';
import Info from '@/components/Info';
import My from '@/components/My';
import AnswerCheck from '@/components/AnswerCheck';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Enter',
            component: Enter
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/answer',
            name: 'Answer',
            component: Answer
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        {
            path: '/answerQue',
            name: 'AnswerQue',
            component: AnswerQue
        },
        {
            path: '/cheer',
            name: 'Cheer',
            component: Cheer
        },
        {
            path: '/viewDetail/:classid',
            name: 'ViewDetail',
            component: ViewDetail
        },
        {
            path: '/answerCheck',
            name: 'AnswerCheck',
            component: AnswerCheck
        },
        {
            path: '/my',
            name: 'My',
            component: My
        }
    ]
})
