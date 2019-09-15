import {Component, OnInit} from '@angular/core';
import {DailyStatisticsService} from "../service/daily-statistics.service";
import {routerTransition} from "../../../../../animations/route-animations";
import * as moment from "moment";

@Component({
    selector: 'app-daily-statistics',
    templateUrl: './daily-statistics.component.html',
    styleUrls: ['./daily-statistics.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DailyStatisticsComponent extends DailyStatisticsService implements OnInit {

    dateChange() {
        this.srcRequestArgs.body.dayTime=moment(this._date).format("YYYY-MM-DD");
        this.child.refreshData(true);
    }

    /**
     * 搜索数据
     */
    search() {
        this.srcRequestArgs.body.dayTime=moment(this._date).format("YYYY-MM-DD");
        this.child.refreshData(true);
    }

    // /**
    //  * 页面点击生成统计事件
    //  */
    // statistic() {
    //     this.statisticFromServer();
    // }

    /**
     * 数据表格下载功能按钮
     */
    loadButton() {
        this.DownLoadDataFile();
    }

    ngOnInit() {
    }

}
