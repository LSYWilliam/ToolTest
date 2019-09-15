import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageMySnifferComponent} from "./component/manage-my-sniffer.component";



const routes: Routes = [
    {
        path: '',
        component: ManageMySnifferComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ManageMySnifferRoutingModule {}
