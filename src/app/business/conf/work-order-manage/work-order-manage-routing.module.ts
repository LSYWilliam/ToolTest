import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkOrderManageComponent} from "./component/work-order-manage.component";

const routes: Routes = [
    {
        path: '',
        component: WorkOrderManageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class WorkOrderManageRoutingModule {}
