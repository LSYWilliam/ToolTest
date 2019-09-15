import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApResourceMonitorComponent} from "./component/ap-resource-monitor.component";

const routes: Routes = [
    {
        path: '',
        component: ApResourceMonitorComponent
        // resolve: { threeLinkList: ThreeLinkageResolveService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ApResourceMonitorRoutingModule { }
