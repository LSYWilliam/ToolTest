import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkOrderInfoComponent} from "./component/work-order-info.component";


const routes: Routes = [
    {
        path: '',
        component: WorkOrderInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class WorkOrderInfoRoutingModule {}
