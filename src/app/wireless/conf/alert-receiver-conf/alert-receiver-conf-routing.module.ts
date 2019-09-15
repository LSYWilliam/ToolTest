import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AlertReceiverConfComponent} from "./component/alert-receiver-conf.component";


const routes: Routes = [
    {
        path: '',
        component: AlertReceiverConfComponent,
        data: { title: 'Dashboard' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertReceiverConfRoutingModule {}
