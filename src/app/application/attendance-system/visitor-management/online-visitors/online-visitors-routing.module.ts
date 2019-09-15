import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OnlineVisitorsComponent} from "./component/online-visitors.component";

const routes: Routes = [
    {
        path: '',
        component: OnlineVisitorsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class OnlineVisitorsRoutingModule { }
