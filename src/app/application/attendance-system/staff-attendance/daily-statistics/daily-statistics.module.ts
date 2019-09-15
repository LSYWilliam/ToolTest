import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyStatisticsRoutingModule} from "./daily-statistics-routing.module";
import {DailyStatisticsComponent} from "./component/daily-statistics.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        DailyStatisticsRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule
    ],
    declarations: [
        DailyStatisticsComponent
    ]
})
export class DailyStatisticsModule {
}
