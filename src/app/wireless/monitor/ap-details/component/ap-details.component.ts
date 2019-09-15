import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {ActivatedRoute} from "@angular/router";
declare var require: any;

import {trigger, state, style, animate, transition} from '@angular/animations';
import {_if} from "rxjs/observable/if";

const Highcharts = require('highcharts/highstock');
Highcharts.setOptions({ global: { useUTC: false } });

/**
 * AP详情
 * @class ApDetailsComponent
*/
@Component
({
    selector: 'app-ap-details',
    templateUrl: './ap-details.component.html',
    styleUrls: ['./ap-details.component.scss'],
    animations: [
        routerTransition(),
        trigger('signal', [
            state('close', style({
                'transform': 'translateX(-120%)',
                'display':'none'
            })),
            state('open', style({
                'transform': 'translateX(0)',
                'display':'block'
            })),
            transition('*=> *', animate(500))
        ])
    ],
    host: {'[@routerTransition]': ''},
})

export class ApDetailsComponent implements OnInit  {
    /** 动画 */
    public rotateIn: any;
    /** 获取switch的值 */
    public radioValue: string;
    /** AP id */
    public apID: string;
    /** 边框高度 */
    public borderHeight: number;
    public url: string;
    public apSn: string;
    public signal: string;
    public  box1: number;
    public  box2: number;
    public direction:string;

    change() {
        if( this.direction === '>' ) {
            this.direction="<";
            this.signal= 'close';
            this.box2= 24;
        } else {
            this.direction=">";
            this.signal= 'open';
            this.box2= 18;
        }
    }


    /**
     * 构造方法
     */
    constructor(private activatedRoute: ActivatedRoute) {
        this.direction='>';
        this.box1=6;
        this.box2=18;
        /** 从URL上获得APID */
        this.activatedRoute.paramMap.subscribe(
            res => {
                this.apID = res.get('id');
                this.url = res.get('url');
                this.apSn = res.get('apSn');
            }
        );

        this.borderHeight = 1100;
        this.radioValue = 'A';
    }

    /**
     * 初始化方法
     */
    ngOnInit() {}

    /**
     * 按钮点击切换方法
     * @description
     *      切换时动画效果
     */
    setAnimations() {
        this.rotateIn = !this.rotateIn;
    }
}
