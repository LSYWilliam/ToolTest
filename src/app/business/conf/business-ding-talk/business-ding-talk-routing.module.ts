import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BusinessDingTalkComponent} from "./component/business-ding-talk.component";
import {CommonUtilService} from "../../../shared/service/common-util.service";
import {DingInfoResolverService} from "../../../shared/service/dingInfo-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: BusinessDingTalkComponent,
        resolve: { businessInfo: DingInfoResolverService}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CommonUtilService,DingInfoResolverService
    ]
})
export class BusinessDingTalkRoutingModule { }
