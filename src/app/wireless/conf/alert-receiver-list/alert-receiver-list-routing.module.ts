import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AlertReceiverListComponent} from "./component/alert-receiver-list.component";


const routes: Routes = [
    {
        path: '',
        component: AlertReceiverListComponent,
        data: { title: 'Dashboard' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertReceiverListRoutingModule {}
