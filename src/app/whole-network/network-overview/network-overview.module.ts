import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NetworkOverviewComponent } from './component/network-overview.component';
import { NetworkOverviewRoutingModule } from './network-overview-routing.module';
import { PluginsModule } from '../../plugins/plugins.module';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
    imports: [
        CommonModule,
        NetworkOverviewRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule
    ],
    providers: [],
    declarations: [ NetworkOverviewComponent ]
})

export class NetworkOverviewModule { }
