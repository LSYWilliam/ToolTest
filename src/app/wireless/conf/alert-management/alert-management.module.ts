import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {AlertManagementComponent} from "./component/alert-management.component";
import { AlertManagementRoutingModule } from "./alert-management-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";

import {SharedModule} from "../../../shared/shared.module";
import {AlertManagementService} from "./service/alert-management.service";
import { AlertReceiverTableComponent } from './component/alert-receiver-table/alert-receiver-table.component';
import { TwoExchangeTableComponent } from './component/two-exchange-table/two-exchange-table.component';


@NgModule({
    imports: [
        CommonModule,
        AlertManagementRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule
    ],
    providers: [AlertManagementService,TwoExchangeTableComponent],
    declarations: [ AlertManagementComponent, AlertReceiverTableComponent, TwoExchangeTableComponent]
})

export class AlertManagementModule { }
