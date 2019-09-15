import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {VisitorRegistrationComponent} from "./component/visitor-registration.component";
import {CommonUtilService} from "../../../../shared/service/common-util.service";

const routes: Routes = [
    {
        path: '',
        component: VisitorRegistrationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService
    ]
})
export class VisitorRegistrationRoutingModule { }
