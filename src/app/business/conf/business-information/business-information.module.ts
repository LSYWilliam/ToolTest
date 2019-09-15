import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {BusinessInformationComponent} from "./component/business-information.component";
import { BusinessInformationRoutingModule } from "./business-information-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {ShowUserComponent} from "./component/show-user/show-user.component";
import {BusinessInformationService} from "./service/business-information.service";

@NgModule({
    imports: [
        CommonModule,
        BusinessInformationRoutingModule,
        NgZorroAntdModule,
        PluginsModule
    ],
    providers: [BusinessInformationService],
    declarations: [ BusinessInformationComponent, ShowUserComponent]
})

export class BusinessInformationModule { }
