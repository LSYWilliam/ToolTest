import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

/**
 * 轮播图
 * @class CarouserComponent
 */

@Component({
    selector: 'app-carouser',
    templateUrl: './carouser.component.html',
    styleUrls: ['./carouser.component.scss']
})

export class CarouserComponent implements OnInit, OnChanges, OnDestroy {
    /**告警Ap数据*/
    @Input() public warnApData: any;
    public isShow: boolean;

    constructor(public router: Router) {

    }
    /**是否显示告警信息*/
    switchIcon() {
        this.isShow = !this.isShow;
    }
    /**跳转*/
    routeLink(data) {
        this.router.navigate(["/ap-details/" , data['apId'], "/overview", data['apSn']],
            {skipLocationChange: true });
    }
    /**
     * 轮播图开始
     * */
    ngOnChanges(changes: SimpleChanges): void {

    }


    ngOnInit() {

    }
    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {

    }

}

