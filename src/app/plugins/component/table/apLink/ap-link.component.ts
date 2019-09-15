import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * table效果组件 -- AP详情页
 * @class ApLinkComponent
 */
@Component({
    selector: 'app-ap-link',
    templateUrl: './ap-link.component.html',
    styleUrls: ['./ap-link.component.scss']
})
export class ApLinkComponent implements OnInit {
    public params: any;

    /**
     * 构造方法
     * @param router 表格行内容
     * @description
     *      定义一个路由参数
     */
    constructor(private router: Router) {}

    /**
     * 初始化方法
     * @param params 表格行内容
     * @description
     *      获取的表格数据
     */
    agInit(params: any): void {
        this.params = params;
    }

    /**
     * 表格单元格单击方法
     * @description
     *      1、获取用户点击表格的单元格
     *      2、根据单元格数据进行跳转
     *      3、跳转至ap概要页面，并隐藏跳转参数
     */
    getApDetails() {
        this.router.navigate(["/ap-details/" , this.params.data['apId'], '/firmware-management', this.params.data['apSn']],
            {skipLocationChange: true });
    }


    ngOnInit() {

    }
}
