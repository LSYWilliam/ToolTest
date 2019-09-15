import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NetworkVisitorComponent} from "./component/network-visitor.component";
import {AccessTypeResolveService} from "../../../../shared/service/access-type-resolve.service";

const routes: Routes = [
    {
        path: '',
        component: NetworkVisitorComponent,
        resolve: { accessTypeList: AccessTypeResolveService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AccessTypeResolveService
    ]
})
export class NetworkVisitorRoutingModule { }
