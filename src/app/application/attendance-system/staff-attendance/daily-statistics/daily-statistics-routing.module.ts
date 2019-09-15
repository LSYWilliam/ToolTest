import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DailyStatisticsComponent} from "./component/daily-statistics.component";

const routes: Routes = [
    {
        path: '',
        component: DailyStatisticsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class DailyStatisticsRoutingModule { }
